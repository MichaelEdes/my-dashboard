import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { NoteCard } from "../../components/NoteCard";

interface INote {
  id: number;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
}

export function NotesList() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const { register } = useForm({
    defaultValues: { body: "" }
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data);

        localStorage.setItem("notes", JSON.stringify(data));
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
      <h1 className="text-2xl font-bold mb-4">Search Notes</h1>
      <input
        className="py-2 px-4 border rounded-lg mb-6 focus:outline-none w-full"
        placeholder="Search for a note"
        maxLength={60}
        {...register("body")}
        onChange={(e) => handleSearch(e.target.value)}
      />

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
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
