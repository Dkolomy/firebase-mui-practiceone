import {
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, collection_name } from "./firebase";

export const findAll = async () => {
  const doc_refs = await getDocs(collection(db, collection_name));

  const res = [];

  doc_refs.forEach((todo) => {
    res.push({
      id: todo.id,
      ...todo.data(),
    });
  });

  return res;
};
