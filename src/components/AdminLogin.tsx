import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { loginAdmin, formatAccessCode } from "@/lib/admin-auth";

interface AdminLoginProps {
  onSuccess: () => void;
}

const AdminLogin = ({ onSuccess }: AdminLoginProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatAccessCode(raw);
    setCode(formatted);
    setError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await loginAdmin(code);
      if (success) {
        onSuccess();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card className="border-border/50">
          <CardContent className="pt-8 pb-8 px-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-4">
                <Lock className="text-primary-foreground" size={24} />
              </div>
              <h1 className="font-display text-xl font-bold text-foreground">Admin Access</h1>
              <p className="text-sm text-muted-foreground mt-1">Enter your access code to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}} transition={{ duration: 0.4 }}>
                <Input
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="XXXXX-XX-XXXX-XXX"
                  className={`text-center font-mono tracking-widest text-base h-12 ${error ? "border-destructive" : ""}`}
                  maxLength={17}
                  autoFocus
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-destructive text-sm justify-center"
                >
                  <AlertCircle size={14} />
                  <span>Invalid access code</span>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg gradient-bg-hover text-primary-foreground font-semibold h-11"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Enter Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
