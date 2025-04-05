"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure correct theme detection after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the current theme properly
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Cycle through themes: light → dark → system → light
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-purple-600 h-8 w-8 lg:h-9 lg:w-9 hidden lg:flex  "
    >
      {currentTheme === "light" && <Sun className="h-5 w-5" />}
      {currentTheme === "dark" && <Moon className="h-5 w-5" />}
      {currentTheme === "system" && <Monitor className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
