import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface SettingsData {
  musicUrl: string;
}

const SETTINGS_DOC = doc(db, "settings", "general");
const DEFAULT_MUSIC_URL = "https://s2.cloudmu.id/listen/prambors/radio.aac";

export async function getSettingsFromFirestore(): Promise<SettingsData> {
  try {
    const snap = await getDoc(SETTINGS_DOC);
    if (snap.exists()) {
      const data = snap.data();
      return {
        musicUrl: data.musicUrl || DEFAULT_MUSIC_URL,
      };
    }
    // Seed default settings on first load
    const defaultSettings = { musicUrl: DEFAULT_MUSIC_URL };
    await setDoc(SETTINGS_DOC, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error("Error fetching settings from Firestore:", error);
    return { musicUrl: DEFAULT_MUSIC_URL };
  }
}

export async function saveSettingsToFirestore(settings: SettingsData): Promise<void> {
  await setDoc(SETTINGS_DOC, settings);
}
