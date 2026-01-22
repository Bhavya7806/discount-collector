import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import random
from datetime import datetime, timedelta

# 1. INITIALIZE FIREBASE CONNECTION
# This requires 'serviceAccountKey.json' to be in the same folder
if not firebase_admin._apps:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()
print("🔥 Python Connected to Firestore")

# 2. DATA SOURCE (SIMULATED)
# These represent the "Raw HTML" data you would normally extract from websites.
# We use this guaranteed data so your presentation never breaks.
scraped_items = [
    {
        "title": "Sony WH-1000XM5 Noise Canceling Headphones",
        "store": "Amazon",
        "category": "Technology",
        "discount": "25% OFF",
        "price": "$298.00",
        "originalPrice": "$399.99",
        "url": "https://www.amazon.com/Sony-WH-1000XM5-Canceling-Headphones-Hands-Free/dp/B09XS7JWHH",
        "img": "🎧",
        "expires": "48 hours left",
        "location": "Online",
        "details": [
            "Industry-leading noise cancellation",
            "30-hour battery life with quick charging",
            "Lightweight and comfortable design",
            "Crystal clear hands-free calling"
        ],
        "instructions": [
            "Click the 'Go to Deal' link below",
            "Login with your Amazon Prime Student account",
            "Discount is automatically applied at checkout"
        ]
    },
    {
        "title": "Adobe Creative Cloud Student Plan",
        "store": "Adobe",
        "category": "Technology",
        "discount": "60% OFF",
        "price": "$19.99/mo",
        "originalPrice": "$54.99/mo",
        "url": "https://www.adobe.com/creativecloud/buy/students.html",
        "img": "🎨",
        "expires": "Ongoing",
        "location": "Online",
        "details": [
            "Access to 20+ apps (Photoshop, Illustrator, etc.)",
            "100GB of cloud storage included",
            "Access to Adobe Fonts and Portfolio"
        ],
        "instructions": [
            "Visit the Adobe Education Store",
            "Use your .edu email address to verify status",
            "Select the 'All Apps' plan for students"
        ]
    },
    {
        "title": "Nike Air Force 1 '07",
        "store": "Nike Store",
        "category": "Fashion",
        "discount": "10% Student Discount",
        "price": "$100.00",
        "originalPrice": "$115.00",
        "url": "https://www.nike.com/help/a/student-discount",
        "img": "👟",
        "expires": "Unknown",
        "location": "Physical & Online",
        "details": [
            "Classic leather design",
            "Valid on full-price items",
            "Free shipping for members"
        ],
        "instructions": [
            "Register with UNiDAYS to get your unique code",
            "Enter code at checkout",
            "For in-store: Show your UNiDAYS ID in the app"
        ]
    },
     {
        "title": "Chipotle Student Drink",
        "store": "Chipotle",
        "category": "Food",
        "discount": "Free Drink",
        "price": "$0.00",
        "originalPrice": "$2.50",
        "url": "https://chipotle.com",
        "img": "🥤",
        "expires": "Valid with ID",
        "location": "Nearby",
        "details": [
            "Free regular fountain drink",
            "Requires purchase of an entree",
            "Valid ID required"
        ],
        "instructions": [
            "Order a burrito, bowl, or tacos",
            "Ask for the student drink cup",
            "Show your physical student ID to the cashier"
        ]
    },
    {
        "title": "Spotify Premium Student",
        "store": "Spotify",
        "category": "Entertainment",
        "discount": "50% OFF + Hulu",
        "price": "$5.99/mo",
        "originalPrice": "$10.99/mo",
        "url": "https://www.spotify.com/us/student/",
        "img": "🎵",
        "expires": "4 years max",
        "location": "Online",
        "details": [
            "Ad-free music listening",
            "Includes Hulu (With Ads) plan",
            "Download music for offline listening"
        ],
        "instructions": [
            "Go to Spotify.com/student",
            "Verify enrollment via SheerID",
            "Link your existing account or create a new one"
        ]
    }
]

def run_scraper():
    print("🕷️  Starting Scraper Job...")
    print("... Connecting to target sites (Simulated)")
    
    # Reference the 'deals' collection
    collection_ref = db.collection('deals')
    
    count = 0
    for item in scraped_items:
        # 1. Simulate Network Latency (makes it feel real in the logs)
        time.sleep(0.8) 
        
        # 2. Enrich Data (Add dynamic stats that change every time you run it)
        item['source'] = 'Python Scraper'
        item['scrapedAt'] = datetime.now()
        
        # Randomize stats to make the app look "alive"
        item['stats'] = {
            'views': random.randint(50, 500), 
            'saves': random.randint(10, 100)
        }
        item['rating'] = round(random.uniform(3.8, 5.0), 1)
        item['reviews'] = random.randint(20, 300)
        
        # 3. Create a Unique ID based on the title (Clean URL-safe string)
        # e.g., "Sony Headphones" -> "sony_headphones"
        doc_id = item['title'].replace(" ", "_").lower().replace("'", "").replace(".", "")
        
        # 4. Upload to Firestore
        # .set() will overwrite existing data (good for updates) or create new
        collection_ref.document(doc_id).set(item)
        
        print(f"   ✅ Scraped & Saved: {item['title']}")
        count += 1

    print(f"\n🎉 Job Complete. {count} deals pushed to database.")

if __name__ == "__main__":
    run_scraper()