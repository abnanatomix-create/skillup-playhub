import { ExternalLink } from "lucide-react";

interface FullscreenButtonProps {
  videoLink: string;
}

const FullscreenButton = ({ videoLink }: FullscreenButtonProps) => {
  if (!videoLink) return null;

  return (
    <a
      href={videoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-base gradient-bg gradient-bg-hover text-primary-foreground transition-all duration-300 text-center glow-accent hover:glow-accent-strong"
    >
      <span>📱</span>
      <span>Open Fullscreen Player</span>
      <ExternalLink size={18} />
    </a>
  );
};

export default FullscreenButton;
