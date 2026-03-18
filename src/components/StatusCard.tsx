import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const StatusCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl bg-card border border-border p-5 flex items-center gap-3"
    >
      <CheckCircle className="text-primary shrink-0" size={22} />
      <p className="text-sm text-muted-foreground">
        <span className="gradient-text font-semibold">Completion request sent</span> — awaiting project assignment
      </p>
    </motion.div>
  );
};

export default StatusCard;
