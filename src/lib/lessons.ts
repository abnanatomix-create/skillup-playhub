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

const STORAGE_KEY = "skillup_lessons";

function getAll(): Lesson[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(lessons: Lesson[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
}

export function getLessons(): Lesson[] {
  return getAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPublishedLessons(): Lesson[] {
  return getLessons().filter((l) => l.published);
}

export function getLesson(id: string): Lesson | undefined {
  return getAll().find((l) => l.id === id);
}

export function createLesson(data: Omit<Lesson, "id" | "createdAt" | "updatedAt" | "published">): Lesson {
  const now = new Date().toISOString();
  const lesson: Lesson = {
    ...data,
    id: crypto.randomUUID(),
    published: false,
    createdAt: now,
    updatedAt: now,
  };
  const all = getAll();
  all.push(lesson);
  saveAll(all);
  return lesson;
}

export function updateLesson(id: string, data: Partial<Omit<Lesson, "id" | "createdAt">>): Lesson | null {
  const all = getAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
  saveAll(all);
  return all[idx];
}

export function deleteLesson(id: string): boolean {
  const all = getAll();
  const filtered = all.filter((l) => l.id !== id);
  if (filtered.length === all.length) return false;
  saveAll(filtered);
  return true;
}

export function togglePublish(id: string): Lesson | null {
  const lesson = getLesson(id);
  if (!lesson) return null;
  return updateLesson(id, { published: !lesson.published });
}
