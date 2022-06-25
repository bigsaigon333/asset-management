import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  remove,
} from "firebase/database";
import { Asset, PostedAsset } from "./type";
import { toDate, toJSON } from "./utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)!;
    const token = credential.accessToken;

    return result.user;
  } catch (err) {
    const error = err as any;
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const postAsset = async (asset: Asset): Promise<void> => {
  await set(
    push(ref(db, `assets/${auth.currentUser!.uid}`)),
    toJSON({ ...asset, createdAt: new Date(Date.now()) })
  );
};

export const readAssets = async (): Promise<PostedAsset[] | null> => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `assets/${auth.currentUser!.uid}`));

    if (!snapshot.exists()) {
      return null;
    }

    return toDate(
      Object.entries(snapshot.val()).map(([key, value]) => ({
        ...(value as Record<string, unknown>),
        key,
      }))
    ) as PostedAsset[];
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const deleteAsset = async (key: string): Promise<void> => {
  return remove(ref(db, `assets/${auth.currentUser!.uid}/${key}`));
};
