import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useDarkMode from "../../hooks/useDarkMode";

export default function Root() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <main>
      <div className="dark:bg-dark-600">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Outlet />
      </div>
    </main>
  );
}
