import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import FullscreenButton from "@/components/FullscreenButton";
import StatusCard from "@/components/StatusCard";
import CourseNotes from "@/components/CourseNotes";
import HandoutSection from "@/components/HandoutSection";
import { getLesson, type Lesson } from "@/lib/lessons";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as Easing },
  }),
};

const LessonPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("return");
  const backLink = returnUrl || "https://skill-up-abn.netlify.app/dashboard";

  const [lesson, setLesson] = useState<Lesson | undefined | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getLesson(id).then((l) => {
      setLesson(l);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Lesson not found</h1>
            <p className="text-muted-foreground">This lesson may have been removed or the link is invalid.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson.published) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Lesson unavailable</h1>
            <p className="text-muted-foreground">This lesson hasn't been published yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, instructor, description, videoLink, handoutLink } = lesson;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-[900px] mx-auto px-4 py-6 sm:py-10 flex flex-col gap-6">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <a
            href={backLink}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            <span>Back to SkillUp</span>
          </a>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">{title}</h1>
          {instructor && (
            <p className="text-muted-foreground text-sm mt-1">
              Instructor: <span className="text-foreground font-medium">{instructor}</span>
            </p>
          )}
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
          <VideoPlayer videoLink={videoLink} />
        </motion.div>

        {videoLink && (
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="hidden sm:flex justify-center">
            <FullscreenButton videoLink={videoLink} />
          </motion.div>
        )}

        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <StatusCard />
        </motion.div>

        {description && (
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
            <CourseNotes description={description} />
          </motion.div>
        )}

        {handoutLink && (
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
            <HandoutSection handoutLink={handoutLink} />
          </motion.div>
        )}
      </main>

      {videoLink && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t border-border sm:hidden z-40">
          <FullscreenButton videoLink={videoLink} />
        </div>
      )}
    </div>
  );
};

export default LessonPlayer;
