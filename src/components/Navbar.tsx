import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-display text-xl font-bold gradient-text tracking-tight">
          SkillUp
        </span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg bg-card text-foreground hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            ← Back to Course
          </a>
          <button className="text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
            Ask Admin
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="px-4 py-3 flex flex-col gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                ← Back to Course
              </a>
              <button className="text-sm px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground text-left transition-colors">
                Ask Admin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
