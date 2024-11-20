import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

import { NewNote } from "../Notes/NewNote";
import NotesList from "../../pages/Notes/NotesList";
import logo from "../../assets/logo.svg";
import LibraryBooksOutlined from "@mui/icons-material/LibraryBooksOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const themes = {
  "ocean-breeze": "Ocean Breeze",
  "sunset-glow": "Sunset Glow",
  "forest-whisper": "Forest Whisper",
  "midnight-elegance": "Midnight Elegance",
  "desert-dunes": "Desert Dunes",
  "arctic-chill": "Arctic Chill",
  "vintage-rose": "Vintage Rose",
  "cyber-wave": "Cyber Wave",
  "earthy-tones": "Earthy Tones",
  "royal-regalia": "Royal Regalia"
};

function App() {
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState<string>("");

  // Retrieve theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "sunset-glow";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Update theme and save it to localStorage
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const pageLinks = [
    {
      path: "/",
      element: <NotesList />,
      title: "Notes",
      icon: <LibraryBooksOutlined />
    }
  ];

  const pageLinks2 = [
    {
      path: "/settings",
      element: <NotesList />,
      title: "Settings",
      icon: <SettingsIcon />
    },
    {
      path: "/logout",
      element: <NewNote />,
      title: "Logout",
      icon: <LogoutIcon />
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="p-2 sidebar w-[240px] flex flex-col bg-opacity-20 z-10">
        <Link
          to="/"
          className="p-4 text-2xl font-bold text-black flex items-center gap-[10px]"
        >
          <img
            src={logo}
            alt="Dashboard Logo"
            className="w-[40px] overflow-hidden h-[40px]"
          />
          Kandu
        </Link>
        <nav className="flex-1 mt-[40px]">
          <div className="p-2 mb-1 uppercase text-xs text-gray-500">
            General
          </div>
          <ul>
            {pageLinks.map((link) => (
              <li key={link.path} className="px-2 relative">
                <Link
                  to={link.path}
                  className={`rounded-2xl p-3 w-full text-sm flex flex-row gap-[10px] items-center ${
                    location.pathname === link.path
                      ? "text-black font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {link.icon}
                  {link.title}
                  {location.pathname === link.path && (
                    <span className="absolute h-[80%] top-[5%] -right-2 rounded-tl rounded-bl w-[5px] bg-[--accent]"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Theme Switcher */}
        <div className="p-4 border-t opacity-1">
          <p className="mb-2">Switch Theme:</p>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              className={`text-xs theme-button block w-full text-left p-2 rounded mb-2 ${
                currentTheme === key ? "bg-[--accent] text-white" : ""
              }`}
              onClick={() => handleThemeChange(key)}
              aria-label={`Switch to ${theme} theme`}
            >
              {theme}
            </button>
          ))}
        </div>
        <div className="border-t">
          <ul className="text-xs">
            {pageLinks2.map((link) => (
              <li key={link.path} className="px-2 relative">
                <Link
                  to={link.path}
                  className={`rounded-2xl p-3 w-full text-sm flex flex-row gap-[10px] items-center ${
                    location.pathname === link.path
                      ? "text-black font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {link.icon}
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-scroll dark:bg-[--accent]">
        <div className="sticky top-0 w-full h-[60px] z-10 bg-white z-20 p-4">
          gello
        </div>
        <div className="rounded-2xl h-[calc(100vh_-_75px)] mr-4 bg-gray-50 overflow-scroll">
          <Routes>
            {pageLinks.map((link) => (
              <Route key={link.path} path={link.path} element={link.element} />
            ))}
            <Route path="/:id">
              <Route index element={<h1>Show</h1>} />
              <Route path="edit" element={<h1>Edit</h1>} />
            </Route>
            <Route path="/new-note" element={<NewNote />}></Route>
            <Route path="/edit-note/:id" element={<NewNote />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
