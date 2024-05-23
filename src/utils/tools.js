import {
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  where,
  query,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db, collection_name } from "./firebase";

export const findAll = async () => {
  const doc_refs = await getDocs(collection(db, collection_name));
  return getSnapshotData(doc_refs);
};

export const srvTimestamp = serverTimestamp();

export const findOne = async (id) => {
  const d = await getDoc(doc(db, collection_name, id));
  return d.data();
};

export const create = (args) => addDoc(collection(db, collection_name), args);

export const update = (args) => {
  const { id, ...params } = args;
  return setDoc(doc(db, collection_name, id), params);
};

export const del = (id) => deleteDoc(doc(db, collection_name, id));

// searchBy('color','==','red')
// searchBy('price','>',100)
export const searchBy = async (field, type, target, count = null) => {
  const q = count
    ? query(getRef(), where(field, type, target), limit(count))
    : query(getRef(), where(field, type, target));
  const doc_refs = await getDocs(q);
  return getSnapshotData(doc_refs);
};

// orderBy('price', 'asc')
// orderBy('price', 'desc')
export const orderBy = async (field, count = null) => {
  const q = count
    ? query(getRef(), orderBy(field), limit(count))
    : query(getRef(), orderBy(field));
  const doc_refs = await getDocs(q);
  return getSnapshotData(doc_refs);
};

const getRef = () => {
  return collection(db, collection_name);
};

const getSnapshotData = (snapshot) => {
  const data = [];

  snapshot.forEach((item) => {
    data.push({
      id: item.id,
      ...item.data(),
    });
  });

  return data;
};
