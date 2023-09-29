import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { app } from "./firebase.js";

const db = getFirestore(app);

export async function createUserFromAuth({ uid, displayName, email }) {
  const userDocRef = doc(db, "users", uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      throw new Error("Error creating user", { cause: error });
    }
  }

  return userSnap;
}
