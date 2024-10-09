import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log("Firebase API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface InputData {
  name: string;
  id: string;
  smallExam: number;
  bigExam: number;
  personalWeight: number;
  percentageEqualParts: number;
  percentageRole: number;
  finalPercentage?: number;
}

// Function to save data to Firebase Realtime Database
export const saveDataToFirebase = async (data: InputData) => {
  try {
    const docRef = ref(database, `appData/${data.id}`);
    await set(docRef, data);
    console.log(`Successfully saved entry with id: ${data.id} to Firebase`);
  } catch (error) {
    console.error("Error saving document: ", error);
  }
};

// Function to load data from Firebase Realtime Database
export const loadDataFromFirebase = async (): Promise<InputData[] | null> => {
  try {
    const snapshot = await get(ref(database, "appData"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Failed to load data:", error);
    return null;
  }
};

// Function to delete data from Firebase Realtime Database
export const deleteDataFromFirebase = async (id: string) => {
  try {
    const docRef = ref(database, `appData/${id}`);
    await remove(docRef);
    console.log(`Successfully deleted entry with id: ${id} from Firebase`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const updateDataInFirebase = async (data: InputData[]) => {
  try {
    const updates = data.reduce((acc: { [key: string]: InputData }, entry) => {
      acc[`appData/${entry.id}`] = entry;
      return acc;
    }, {});

    console.log("Firebase.tsx : Updating data in Firebase:", updates);
    await update(ref(database), updates);
    console.log("Firebase.tsx : Successfully updated entries in Firebase");

    // Verify the update by reading the data back
    const snapshot = await get(ref(database, "appData"));
    if (snapshot.exists()) {
      const updatedData = snapshot.val();
      console.log("Firebase.tsx : Data in Firebase after update:", updatedData);
    } else {
      console.log("Firebase.tsx : No data available after update");
    }
  } catch (error) {
    console.error("Firebase.tsx : Error updating document: ", error);
  }
};

export { database };
