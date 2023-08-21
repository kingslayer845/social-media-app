import { useState } from "react";

export default function Navbar() {
    const [toggleNav, setToggleNav] = useState<boolean>(false)
  return (
    <nav className="sticky top-0 w-full bg-white shadow-md">
      <div className="max-w-sm mx-auto py-4">
        <h2 className="text-blue-400 font-bold text-xl">Social App</h2>
      </div>
    </nav>
  );
}
