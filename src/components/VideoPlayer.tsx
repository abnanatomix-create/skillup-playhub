import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { extractVideoSrc } from "@/lib/video-utils";

interface VideoPlayerProps {
  videoLink: string;
}

const VideoPlayer = ({ videoLink }: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true);
  const src = extractVideoSrc(videoLink);

  if (!src) {
    return (
      <div className="w-full aspect-video rounded-xl bg-card border border-border flex items-center justify-center gap-3">
        <AlertCircle className="text-destructive" size={24} />
        <span className="text-muted-foreground">No video available for this lesson.</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-card border border-border glow-accent">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      )}
      <iframe
        src={src}
        className="w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={() => setLoading(false)}
        title="Lesson Video"
      />
    </div>
  );
};

export default VideoPlayer;
