import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface FeedbackData {
  id?: string;
  feedback: string;
  name: string;
  isAnonymous: boolean;
  isPublishable: boolean;
  createdAt?: string | Date; // We'll convert Firestore Timestamp to string for client component
}

const FEEDBACK_COLLECTION = collection(db, "feedback");

export async function saveFeedbackToFirestore(data: Omit<FeedbackData, "id" | "createdAt">): Promise<void> {
  try {
    await addDoc(FEEDBACK_COLLECTION, {
      ...data,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error saving feedback to Firestore:", error);
    // Don't throw, we want the Telegram part to still run even if Firestore fails for some reason
  }
}

export async function getFeedbackFromFirestore(): Promise<FeedbackData[]> {
  try {
    const q = query(FEEDBACK_COLLECTION, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        feedback: data.feedback,
        name: data.name,
        isAnonymous: data.isAnonymous,
        isPublishable: data.isPublishable,
        // Convert Timestamp to ISO string so it can be passed from Server Component to Client Component safely
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as FeedbackData;
    });
  } catch (error) {
    console.error("Error fetching feedback from Firestore:", error);
    return [];
  }
}

export async function deleteFeedbackFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "feedback", id));
  } catch (error) {
    console.error(`Error deleting feedback ${id} from Firestore:`, error);
    throw error;
  }
}
