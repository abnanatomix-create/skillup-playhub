import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export interface Lesson {
  id: string;
  title: string;
  instructor: string;
  description: string;
  videoLink: string;
  handoutLink: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const COLLECTION = "lessons";

export async function getLessons(): Promise<Lesson[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
}

export async function getPublishedLessons(): Promise<Lesson[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lesson));
}

export async function getLesson(id: string): Promise<Lesson | undefined> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return undefined;
  return { id: snap.id, ...snap.data() } as Lesson;
}

export async function createLesson(
  data: Omit<Lesson, "id" | "createdAt" | "updatedAt" | "published">
): Promise<Lesson> {
  const now = new Date().toISOString();
  const payload = { ...data, published: false, createdAt: now, updatedAt: now };
  const ref = await addDoc(collection(db, COLLECTION), payload);
  return { id: ref.id, ...payload };
}

export async function updateLesson(
  id: string,
  data: Partial<Omit<Lesson, "id" | "createdAt">>
): Promise<Lesson | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const updated = { ...data, updatedAt: new Date().toISOString() };
  await updateDoc(ref, updated);
  return { id, ...snap.data(), ...updated } as Lesson;
}

export async function deleteLesson(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
    return true;
  } catch {
    return false;
  }
}

export async function togglePublish(id: string): Promise<Lesson | null> {
  const lesson = await getLesson(id);
  if (!lesson) return null;
  return updateLesson(id, { published: !lesson.published });
}
