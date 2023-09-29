import {
  getFirestore,
  collection,
  doc,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

import { app } from "./firebase.js";

const db = getFirestore(app);

export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  for (const obj of objectsToAdd) {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  }

  await batch.commit();
  console.log("done");
}

export async function getCategoriesAndDocuments() {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc.set(title.toLowerCase(), items);
    return acc;
  }, new Map());

  return categoryMap;
}
