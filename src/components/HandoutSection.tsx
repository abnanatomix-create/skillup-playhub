import { useState } from "react";
import { Loader2 } from "lucide-react";

interface HandoutSectionProps {
  handoutLink: string;
}

const HandoutSection = ({ handoutLink }: HandoutSectionProps) => {
  const [loading, setLoading] = useState(true);

  if (!handoutLink) return null;

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Handout</h2>
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-secondary">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <Loader2 className="animate-spin text-primary" size={28} />
          </div>
        )}
        <iframe
          src={handoutLink}
          className="w-full h-full"
          onLoad={() => setLoading(false)}
          title="Handout"
        />
      </div>
    </div>
  );
};

export default HandoutSection;
