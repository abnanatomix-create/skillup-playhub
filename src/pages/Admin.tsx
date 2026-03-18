import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LessonForm from "@/components/LessonForm";
import Navbar from "@/components/Navbar";
import { getLessons, createLesson, updateLesson, deleteLesson, togglePublish, type Lesson } from "@/lib/lessons";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [lessons, setLessons] = useState<Lesson[]>(getLessons);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const refresh = useCallback(() => setLessons(getLessons()), []);

  const handleCreate = (data: Omit<Lesson, "id" | "createdAt" | "updatedAt" | "published">) => {
    createLesson(data);
    refresh();
    setShowForm(false);
    toast({ title: "Lesson created" });
  };

  const handleUpdate = (data: Omit<Lesson, "id" | "createdAt" | "updatedAt" | "published">) => {
    if (!editingLesson) return;
    updateLesson(editingLesson.id, data);
    refresh();
    setEditingLesson(null);
    toast({ title: "Lesson updated" });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteLesson(deleteTarget);
    refresh();
    setDeleteTarget(null);
    toast({ title: "Lesson deleted", variant: "destructive" });
  };

  const handleTogglePublish = (id: string) => {
    const updated = togglePublish(id);
    refresh();
    toast({ title: updated?.published ? "Lesson published" : "Lesson unpublished" });
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/lesson/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Link copied!" });
  };

  const isFormOpen = showForm || editingLesson !== null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-[900px] mx-auto px-4 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          {!isFormOpen && (
            <Button onClick={() => setShowForm(true)} className="gradient-bg gradient-bg-hover text-primary-foreground font-semibold gap-2">
              <Plus size={18} /> Add Lesson
            </Button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isFormOpen && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    {editingLesson ? "Edit Lesson" : "New Lesson"}
                  </h2>
                  <LessonForm
                    lesson={editingLesson}
                    onSubmit={editingLesson ? handleUpdate : handleCreate}
                    onCancel={() => { setShowForm(false); setEditingLesson(null); }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {lessons.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No lessons yet</p>
            <p className="text-sm mt-1">Click "Add Lesson" to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {lessons.map((lesson) => (
              <motion.div key={lesson.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Thumbnail */}
                      <div className="w-full sm:w-40 aspect-video rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        {lesson.videoLink ? (
                          <iframe src={lesson.videoLink} className="w-full h-full pointer-events-none" title={lesson.title} tabIndex={-1} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No video</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-display font-semibold text-foreground truncate">{lesson.title}</h3>
                          <Badge variant={lesson.published ? "default" : "secondary"} className={lesson.published ? "gradient-bg text-primary-foreground text-xs" : "text-xs"}>
                            {lesson.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        {lesson.instructor && <p className="text-sm text-muted-foreground mb-1">Instructor: {lesson.instructor}</p>}
                        {lesson.description && <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>}
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 flex-shrink-0">
                        <Button size="icon" variant="ghost" onClick={() => handleTogglePublish(lesson.id)} title={lesson.published ? "Unpublish" : "Publish"}>
                          {lesson.published ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setEditingLesson(lesson)} title="Edit">
                          <Pencil size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => copyLink(lesson.id)} title="Copy lesson link">
                          {copiedId === lesson.id ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                        </Button>
                        <Button size="icon" variant="ghost" asChild title="Preview">
                          <a href={`/lesson/${lesson.id}`} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /></a>
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setDeleteTarget(lesson.id)} title="Delete">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete lesson?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
