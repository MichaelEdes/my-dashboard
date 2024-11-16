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

  const distributeNotes = (notes: INote[], numColumns: number) => {
    const columns: INote[][] = Array.from({ length: numColumns }, () => []);
    notes.forEach((note, index) => {
      columns[index % numColumns].push(note);
    });
    return columns;
  };

  const numColumns = 4;
  const columns = distributeNotes(filteredNotes, numColumns);

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

      <div className="flex gap-4">
        {columns.map((colNotes, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col gap-4 w-full max-w-[25%]"
          >
            {colNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                body={note.body}
                tags={note.tags}
                created_at={note.created_at}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
