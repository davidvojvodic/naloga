import { Loader2 } from "lucide-react";

// Definicija komponente za nalaganje
export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-6 items-center justify-center">
      {/* Animiran logotip */}
      <div className="w-20 h-20 relative">
        <Loader2 className="animate-spin h-full w-full" />
      </div>
      {/* Besedilo za nalaganje */}
      <p className="text-lg text-muted-foreground animate-bounce">
        Nalaganje...
      </p>
    </div>
  );
};
