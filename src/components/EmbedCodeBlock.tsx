import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EmbedCodeBlockProps {
  lessonId: string;
}

const EmbedCodeBlock = ({ lessonId }: EmbedCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const baseUrl = window.location.origin;
  const embedCode = `<iframe\n    src="${baseUrl}/preview/${lessonId}"\n    width="100%"\n    height="600px"\n    style="border:none; border-radius:12px;"\n    allowfullscreen\n></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Embed code copied!" });
  };

  return (
    <div className="mt-3 rounded-lg border border-border bg-secondary/50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/80">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Code size={12} /> Embed Code
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 gap-1.5 text-xs"
          onClick={handleCopy}
        >
          {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="px-3 py-2.5 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre">
        {embedCode}
      </pre>
    </div>
  );
};

export default EmbedCodeBlock;
