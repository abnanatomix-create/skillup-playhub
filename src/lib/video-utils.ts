/**
 * Extract the video URL from a Google Drive embed code or raw URL.
 * Accepts either a full <iframe ...> embed code or a plain URL.
 */
export function extractVideoSrc(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  
  // If it looks like an iframe embed code, extract src
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  if (match) return match[1];
  
  // Otherwise treat as a direct URL
  if (trimmed.startsWith("http")) return trimmed;
  
  return "";
}

