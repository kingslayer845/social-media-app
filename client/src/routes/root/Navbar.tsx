import { useState } from "react";
import { FaBars } from "react-icons/fa";
import UserInfo from "../../components/UserInfo";
import FriendRequestsAndFriends from "../../components/friend-requests/FriendRequestsAndFriends";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
const params = useParams()
console.log(params);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="sticky top-0 w-full bg-white shadow-md">
      <div className="max-w-sm mx-auto py-4 flex justify-between items-center md:max-w-lg lg:max-w-5xl xl:max-w-7xl">
        <h2 className="text-blue-400 font-bold text-xl">Wasla</h2>
        <button onClick={toggleNav} className="lg:hidden">
          <FaBars size={25} color="#60A5FA" />
        </button>
      </div>
      <Drawer isNavOpen={isNavOpen} toggleNav={toggleNav} />
    </div>
  );
};

export default Navbar;

function Drawer({
  isNavOpen,
  toggleNav,
}: {
  isNavOpen: boolean;
  toggleNav(): void;
}) {
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 w-full h-full lg:hidden ${
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
        className={`absolute top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-300 bg-white w-80 ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <UserInfo />
        <FriendRequestsAndFriends />
      </div>
    </div>
  );
}
