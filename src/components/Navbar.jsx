import { NavLink, useLocation } from "react-router-dom";
import {
  HouseIcon,
  VideoIcon,
  UserIcon,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Crelens", icon: <HouseIcon size={20} /> },
    { to: "/vlog", label: "Vlog", icon: <VideoIcon size={20} /> },
    { to: "/about", label: "About", icon: <UserIcon size={20} /> },
  ];

  return (
    <nav
      className="py-6 font-display font-light 
                 flex justify-center md:justify-end pr-0 md:pr-6"
    >
      <div className="bg-whisper/75 rounded-full px-1 py-1 flex items-center space-x-1 shadow-md">
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;

          return (
            <NavLink
              to={to}
              end={to === "/"}
              key={label}
              className={({ isActive: navIsActive }) =>
                `group flex items-center rounded-full px-3 py-2 transition-all duration-200
                 text-alabaster font-light
                 ${navIsActive ? "bg-night" : "hover:bg-steel"}`
              }
            >
              {/* Icon is always shown */}
              <div>{icon}</div>

              {/* Show label if active or hovered */}
              <span
                className={`
                  ml-2 transition-all duration-200 whitespace-nowrap
                  ${
                    isActive
                      ? "inline-block" // Show if current route
                      : "hidden group-hover:inline-block" // Show on hover
                  }
                `}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
