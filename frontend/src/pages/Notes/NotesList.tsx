import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { NoteCard } from "../../components/NoteCard";

interface INote {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

export function NotesList() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const { register } = useForm({
    defaultValues: { body: "" },
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

  // Search handler with debounce
  const handleSearch = debounce((searchTerm: string) => {
    const lowerCasedTerm = searchTerm.toLowerCase();

    if (!lowerCasedTerm) {
      setFilteredNotes(notes); // Reset if search term is empty
      return;
    }

    const results = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerCasedTerm) ||
        note.body.toLowerCase().includes(lowerCasedTerm) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowerCasedTerm))
    );

    setFilteredNotes(results);
  }, 300); // Debounce for 300ms

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Search Notes</h1>
      <input
        className="py-[10px] px-[20px] border rounded-lg my-[30px] focus:outline-none w-full"
        placeholder="Search for a note"
        maxLength={60}
        {...register("body")}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <>
            <NoteCard
              id={note.id}
              title={note.title}
              body={note.body}
              tags={note.tags}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
