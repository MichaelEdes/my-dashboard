import React, { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

import { NewNote } from "../Notes/NewNote";
import NotesList from "../../pages/Notes/NotesList";
import logo from "../../assets/logo.svg";
import LibraryBooksOutlined from "@mui/icons-material/LibraryBooksOutlined";

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
  const [currentTheme, setCurrentTheme] = useState<string>("sunset-glow");
  const location = useLocation();

  const pageLinks = [
    {
      path: "/",
      element: <NotesList />,
      title: "Notes",
      icon: <LibraryBooksOutlined />
    },
    {
      path: "/new",
      element: <NewNote />,
      title: "New Note",
      icon: <LibraryBooksOutlined /> // Replace with another icon if needed
    }
  ];

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="p-2 sidebar w-[240px] flex flex-col bg-white z-10">
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
                  className={` rounded-2xl p-3 w-full text-sm flex flex-row gap-[10px] items-center ${
                    location.pathname === link.path
                      ? " text-black font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {link.icon}
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Theme Switcher */}
        <div className="p-4 border-t opacity-0">
          <p className="mb-2">Switch Theme:</p>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              className={`theme-button block w-full text-left p-2 rounded mb-2 ${
                currentTheme === key ? "active-theme" : ""
              }`}
              onClick={() => handleThemeChange(key)}
              aria-label={`Switch to ${theme} theme`}
            >
              {theme}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-scroll dark:bg-[--accent]">
        <div className="sticky top-0 w-full h-[60px] z-10 bg-white z-20 p-4">
          gello
        </div>
        <div className="rounded-2xl h-[calc(100vh_-_75px)] mr-4 bg-gray-100 overflow-scroll">
          <Routes>
            {pageLinks.map((link) => (
              <Route key={link.path} path={link.path} element={link.element} />
            ))}
            <Route path="/:id">
              <Route index element={<h1>Show</h1>} />
              <Route path="edit" element={<h1>Edit</h1>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
