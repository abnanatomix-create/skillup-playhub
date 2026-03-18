import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Lesson } from "@/lib/lessons";

interface LessonFormProps {
  lesson?: Lesson | null;
  onSubmit: (data: { title: string; instructor: string; description: string; videoLink: string; handoutLink: string }) => void;
  onCancel: () => void;
}

const LessonForm = ({ lesson, onSubmit, onCancel }: LessonFormProps) => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [handoutLink, setHandoutLink] = useState("");

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setInstructor(lesson.instructor);
      setDescription(lesson.description);
      setVideoLink(lesson.videoLink);
      setHandoutLink(lesson.handoutLink);
    }
  }, [lesson]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !videoLink.trim()) return;
    onSubmit({ title: title.trim(), instructor: instructor.trim(), description: description.trim(), videoLink: videoLink.trim(), handoutLink: handoutLink.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Lesson Title *</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Free After Effects Course" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instructor">Instructor Name</Label>
        <Input id="instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="e.g. Abenezar" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course description..." rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoLink">Video Link (Google Drive /preview) *</Label>
        <Input id="videoLink" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="https://drive.google.com/file/d/FILE_ID/preview" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="handoutLink">Handout Link (optional)</Label>
        <Input id="handoutLink" value={handoutLink} onChange={(e) => setHandoutLink(e.target.value)} placeholder="PDF or PPT link" />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="gradient-bg gradient-bg-hover text-primary-foreground font-semibold">
          {lesson ? "Update Lesson" : "Add Lesson"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LessonForm;
