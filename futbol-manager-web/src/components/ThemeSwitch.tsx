import { Moon, Sun } from "@gravity-ui/icons";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./atoms/Button";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      onPress={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
};
