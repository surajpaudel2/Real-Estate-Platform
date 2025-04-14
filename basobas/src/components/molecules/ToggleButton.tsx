import { useTheme } from "@/providers/ThemeProvider";
import MoonIcon from "../atoms/MoonIcon";
import SunIcon from "../atoms/SunIcon";

const ToggleButton = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  return (
    <div className="absolute right-4 top-4">
      <button
        type="button"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        aria-pressed={theme === "dark"}
        className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus-visible:ring-offset-2"
        onClick={toggleTheme}
      >
        {mounted && theme === "dark" ? (
          <SunIcon className="h-5 w-5 text-amber-400" />
        ) : (
          <MoonIcon className="h-5 w-5 text-rose-300" />
        )}
      </button>
    </div>
  );
};

export default ToggleButton;
