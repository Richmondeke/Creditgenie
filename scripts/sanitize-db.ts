import { db } from "../src/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

async function clearCollection(collectionName: string) {
    console.log(`🧹 Clearing collection: ${collectionName}...`);
    const coll = collection(db, collectionName);
    const snapshot = await getDocs(coll);
    
    const deleteOps = snapshot.docs.map(d => deleteDoc(doc(db, collectionName, d.id)));
    await Promise.all(deleteOps);
    
    console.log(`✅ Cleared ${snapshot.size} documents from ${collectionName}.`);
}

async function sanitize() {
    try {
        await clearCollection("applications");
        await clearCollection("activity");
        await clearCollection("users");
        console.log("\n✨ Database Sanitization Complete. All mock data removed.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Sanitization failed:", error);
        process.exit(1);
    }
}

sanitize();
