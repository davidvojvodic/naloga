import { LaptopIcon, Moon, MoonIcon, Sun, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      {/* Sprožilec za spustni meni */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Preklopi temo</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Vsebina spustnega menija */}
      <DropdownMenuContent align="end">
        {/* Možnost za izbiro svetle teme */}
        <DropdownMenuItem className="gap-2" onClick={() => setTheme("light")}>
          <SunIcon className="w-5 h-5" />
          Svetla
        </DropdownMenuItem>
        {/* Možnost za izbiro temne teme */}
        <DropdownMenuItem className="gap-2" onClick={() => setTheme("dark")}>
          <MoonIcon className="w-5 h-5" />
          Temna
        </DropdownMenuItem>
        {/* Možnost za izbiro sistemske teme */}
        <DropdownMenuItem className="gap-2" onClick={() => setTheme("system")}>
          <LaptopIcon className="w-5 h-5" />
          Sistem
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
