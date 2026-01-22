import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# 1. INITIALIZE FIREBASE (Singleton check to avoid errors if run multiple times)
if not firebase_admin._apps:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()
print("🧠 AI Engine Initialized")

def fetch_data():
    """Fetches all deals from Firestore and converts to DataFrame"""
    docs = db.collection('deals').stream()
    items = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        # Combine important text fields for analysis
        # We join Title, Category, and Description to create a "soup" of words
        details_text = " ".join(data.get('details', []))
        data['content_soup'] = f"{data['title']} {data['category']} {details_text}"
        items.append(data)
    
    return pd.DataFrame(items)

def generate_recommendations():
    print("... Loading Data from Firestore")
    df = fetch_data()
    
    if df.empty:
        print("⚠️ No deals found via AI. Run scraper.py first!")
        return

    print(f"... Analyzing {len(df)} deals")

    # 2. CREATE TF-IDF MATRIX (The Math Part)
    # This converts text into numbers. It highlights unique/important words.
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['content_soup'])

    # 3. COMPUTE SIMILARITY SCORE
    # This creates a grid showing how similar every deal is to every other deal
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Helper map to find index by title
    indices = pd.Series(df.index, index=df['title']).drop_duplicates()

    def get_recommendations(title, cosine_sim=cosine_sim):
        if title not in indices:
            return []
        
        idx = indices[title]
        
        # Get pairwise similarity scores
        sim_scores = list(enumerate(cosine_sim[idx]))
        
        # Sort by similarity (highest first)
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        # Get scores of the 3 most similar deals (ignoring itself at index 0)
        sim_scores = sim_scores[1:4]
        
        deal_indices = [i[0] for i in sim_scores]
        
        # Return the actual deal IDs and Titles
        return df.iloc[deal_indices][['id', 'title', 'category']].to_dict('records')

    # 4. SIMULATE USER BEHAVIOR & UPDATE DATABASE
    # In a real app, we would loop through db.collection('students')
    # For this demo, we assume a user Liked "Sony WH-1000XM5 Noise Canceling Headphones"
    
    target_deal = "Sony WH-1000XM5 Noise Canceling Headphones"
    print(f"\n🧪 Simulation: User saved '{target_deal}'")
    
    recommendations = get_recommendations(target_deal)
    
    print("\n✨ AI Recommendations Generated:")
    for rec in recommendations:
        print(f"   👉 {rec['title']} ({rec['category']})")

    # 5. WRITE TO FIRESTORE (Mock User Update)
    # We will save these recommendations to a mock user ID so we can display them later
    mock_user_id = "ai_demo_user"
    db.collection('students').document(mock_user_id).set({
        'username': 'AI Demo User',
        'recommended_deals': recommendations
    }, merge=True)
    
    print(f"\n✅ Recommendations saved to user: {mock_user_id}")

if __name__ == "__main__":
    generate_recommendations()