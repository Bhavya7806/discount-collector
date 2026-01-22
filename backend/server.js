const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { admin, db } = require('./firebaseAdmin');

// Initialize Configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- MIDDLEWARE ---
// Allow requests from your React Frontend (running on port 3000)
app.use(cors({ 
  origin: ['http://localhost:3000', 'https://discount-collector.onrender.com'] 
}));
app.use(express.json()); // Parse incoming JSON payloads

// --- ROUTES ---

// 1. HEALTH CHECK
// Endpoint: GET http://localhost:8080/
app.get('/', (req, res) => {
  res.send('Discount Collector API is Running 🚀');
});

// 2. GET ALL DEALS
// Endpoint: GET http://localhost:8080/api/deals
// Used by: BrowseDeals.js
app.get('/api/deals', async (req, res) => {
  try {
    const dealsRef = db.collection('deals');
    const snapshot = await dealsRef.get();

    if (snapshot.empty) {
      return res.status(200).json([]); // Return empty array if no deals
    }

    const deals = [];
    snapshot.forEach(doc => {
      // Combine the Document ID with the actual data
      deals.push({ id: doc.id, ...doc.data() });
    });

    res.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. GET SINGLE DEAL BY ID
// Endpoint: GET http://localhost:8080/api/deals/:id
// Used by: SingleDeal.js
app.get('/api/deals/:id', async (req, res) => {
  try {
    const docId = req.params.id;
    const docRef = db.collection('deals').doc(docId); // Correct Firestore syntax
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Deal not found' });
    }

    // Return the deal data
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. GET USER PROFILE (For AI Recommendations)
// Endpoint: GET http://localhost:8080/api/users/:uid
// Used by: BrowseDeals.js (to show "Recommended for You")
app.get('/api/users/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    // Try to find user in 'students' collection first
    let doc = await db.collection('students').doc(uid).get();
    
    // If not found, try 'companies' collection
    if (!doc.exists) {
      doc = await db.collection('companies').doc(uid).get();
    }

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(doc.data());
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/users/:uid/save', async (req, res) => {
  try {
    const { dealId } = req.body;
    const uid = req.params.uid;

    if (!dealId) return res.status(400).json({ error: "Deal ID is required" });

    // Reference the user document (try students first)
    // Note: In a real production app, you'd know the collection from the auth token
    const studentRef = db.collection('students').doc(uid);
    const companyRef = db.collection('companies').doc(uid);

    // We use admin.firestore.FieldValue.arrayUnion to add unique items only
    const updateData = {
      savedDeals: admin.firestore.FieldValue.arrayUnion(dealId)
    };

    // Try updating student
    try {
        await studentRef.update(updateData);
    } catch (e) {
        // If student update fails, try company
        await companyRef.update(updateData);
    }

    res.json({ success: true, message: "Deal saved successfully" });

  } catch (error) {
    console.error("Error saving deal:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`\n⚡ Server running on http://localhost:${PORT}`);
  console.log(`   Health Check:    http://localhost:${PORT}/`);
  console.log(`   All Deals:       http://localhost:${PORT}/api/deals`);
  console.log(`   Single Deal:     http://localhost:${PORT}/api/deals/YOUR_DEAL_ID`);
  console.log(`   User Profile:    http://localhost:${PORT}/api/users/YOUR_USER_ID\n`);
});