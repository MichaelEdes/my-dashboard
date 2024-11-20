import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { NoteCard } from "../../components/NoteCard";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { INote } from "../../types/interfaces/INote";

export function NotesList() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const { register } = useForm({
    defaultValues: { body: "" }
  });
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
        const data = await response.json();

        const notesWithIdAsNumber = data.map((note: INote) => ({
          ...note,
          id: Number(note.id)
        }));

        setNotes(notesWithIdAsNumber);
        setFilteredNotes(notesWithIdAsNumber);

        localStorage.setItem("notes", JSON.stringify(notesWithIdAsNumber));
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleSearch = debounce((searchTerm: string) => {
    const lowerCasedTerm = searchTerm.toLowerCase();

    if (!lowerCasedTerm) {
      setFilteredNotes(notes);
      return;
    }

    const results = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerCasedTerm) ||
        note.body.toLowerCase().includes(lowerCasedTerm) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowerCasedTerm))
    );

    setFilteredNotes(results);
  }, 300);

  return (
    <div className="p-4">
      <div className="bg-[--accent] rounded-full flex flex-row justify-between items-center  p-2 z-20 mb-[25px] sticky top-[20px] backdrop-blur-xl	bg-opacity-40">
        <h1 className="text-lg  shrink-0 text-black font-semibold bg-white p-2 px-[20px] rounded-full">
          Notes
        </h1>
        <div className="flex flex-row items-center gap-[10px]">
          <input
            className="py-2 px-4 border text-sm rounded-full focus:outline-none w-[300px]"
            placeholder="Search for a note"
            maxLength={60}
            {...register("body")}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Link to="/new-note">
            <button className="bg-white hover:bg-[--background] hover:text-[--text] p-2 rounded-full">
              <AddIcon />
            </button>
          </Link>
        </div>
      </div>

      {/* Masonry-like Layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="mb-4 break-inside-avoid">
            <NoteCard
              id={note.id}
              title={note.title}
              body={note.body}
              tags={note.tags}
              created_at={note.created_at}
              last_updated={note.last_updated}
              isDropdownOpen={openDropdownId === note.id}
              toggleDropdown={() => toggleDropdown(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
