import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { BarsOutlined, CloseOutlined, HomeOutlined, UsergroupAddOutlined, PhoneOutlined, LinkOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <HomeOutlined /> },
    { name: "Facilities", href: "/facilities", icon: <UsergroupAddOutlined /> },
    { name: "compare", href: "/compare", icon: <LinkOutlined /> },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register"},

  ];

  return (
    <nav className={` w-full transition-all ${scrolling ? "bg-white shadow" : "bg-slate-50"} z-20`}>
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img onClick={() => (window.location.href = "/")} src={""} alt="Logo" className="h-10 cursor-pointer" />
        </div>
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.href} className="flex items-center space-x-2 text-black font-semibold">
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseOutlined className="text-xl" /> : <BarsOutlined className="text-xl" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full top-full left-0">
          <div className="flex flex-col items-start p-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.href} className="flex items-center space-x-2 text-black font-semibold" onClick={() => setIsOpen(false)}>
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
