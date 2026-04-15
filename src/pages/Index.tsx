import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import StatusCard from "@/components/StatusCard";
import CourseNotes from "@/components/CourseNotes";
import HandoutSection from "@/components/HandoutSection";

const lessonData = {
  title: "Free After Effects Course",
  instructor: "Abenezar",
  description:
    "This course teaches motion graphics fundamentals using Adobe After Effects. You'll learn keyframing, easing, shape layers, text animation, and exporting techniques. Perfect for beginners looking to add motion design to their skill set.",
  videoLink: "https://drive.google.com/file/d/FILE_ID/preview",
  handoutLink: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as Easing },
  }),
};

const Index = () => {
  const { title, instructor, description, videoLink, handoutLink } = lessonData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-[900px] mx-auto px-4 py-6 sm:py-10 flex flex-col gap-6">
        {/* Title */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Instructor: <span className="text-foreground font-medium">{instructor}</span>
          </p>
        </motion.div>

        {/* Video */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <VideoPlayer videoLink={videoLink} />
        </motion.div>

        {/* Status */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
          <StatusCard />
        </motion.div>

        {/* Notes */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <CourseNotes description={description} />
        </motion.div>

        {/* Handout */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <HandoutSection handoutLink={handoutLink} />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
