import { Button } from "flowbite-react";

interface SidebarProps {
  setTheme: (theme: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setTheme }) => {
  // List of available themes
  const themes = [
    { name: "Ocean Breeze", id: "oceanBreeze" },
    { name: "Sunset Glow", id: "sunsetGlow" },
    { name: "Midnight", id: "midnight" },
    { name: "Minimal Light", id: "minimalLight" },
    { name: "Forest Mist", id: "forestMist" }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Theme Selector</h2>
      <ul className="space-y-4">
        {themes.map((theme) => (
          <li key={theme.id}>
            <Button
              onClick={() => setTheme(theme.id)}
              className="w-full"
              gradientDuoTone="cyanToBlue"
            >
              {theme.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
