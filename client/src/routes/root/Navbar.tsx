import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

import UserInfo from "../../components/UserInfo";
import FriendRequestsAndFriends from "../../components/friend-requests/FriendRequestsAndFriends";
import { Link, useParams } from "react-router-dom";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="sticky top-0 w-full bg-white shadow-md dark:bg-dark-400">
      <div className="max-w-sm mx-auto py-4 flex justify-between items-center md:max-w-lg lg:max-w-5xl xl:max-w-7xl px-3">
        <Link to={"/"} className="text-blue-400 font-bold text-xl">
          Wasla
        </Link>
        <button
          className="dark:text-gray-200 hidden lg:block"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
        </button>
        <button onClick={toggleNav} className="lg:hidden">
          <FaBars size={25} color="#60A5FA" />
        </button>
      </div>
      <Drawer
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

export default Navbar;

function Drawer({
  isNavOpen,
  toggleNav,
  toggleDarkMode,
  isDarkMode,
}: {
  isNavOpen: boolean;
  toggleNav(): void;
  toggleDarkMode(): void;
  isDarkMode: boolean;
}) {
  const params = useParams();

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 w-full h-full lg:hidden  ${
        isNavOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute w-full h-full top-0 z-30 bg-[#00000053] transition-opacity duration-300 ${
          isNavOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleNav}
      />
      <div
        id="drawer-example"
        className={`absolute top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-300 bg-white w-80 dark:bg-dark-400 ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-center items-center my-3">
          <button className="dark:text-gray-200" onClick={toggleDarkMode}>
            {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
          </button>
        </div>
        <UserInfo userId={params.userId} />
        {!params.userId && <FriendRequestsAndFriends />}
      </div>
    </div>
  );
}
