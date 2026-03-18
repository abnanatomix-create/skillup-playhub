interface CourseNotesProps {
  description: string;
}

const CourseNotes = ({ description }: CourseNotesProps) => {
  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">Course Notes</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default CourseNotes;
