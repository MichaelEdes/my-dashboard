import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { NoteCard } from "@components/NoteCard";
export function NotesList() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
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
            }
            catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    }, []);
    // Search handler with debounce
    const handleSearch = debounce((searchTerm) => {
        const lowerCasedTerm = searchTerm.toLowerCase();
        if (!lowerCasedTerm) {
            setFilteredNotes(notes); // Reset if search term is empty
            return;
        }
        const results = notes.filter((note) => note.title.toLowerCase().includes(lowerCasedTerm) ||
            note.body.toLowerCase().includes(lowerCasedTerm) ||
            note.tags.some((tag) => tag.toLowerCase().includes(lowerCasedTerm)));
        setFilteredNotes(results);
    }, 300); // Debounce for 300ms
    return (_jsxs("div", { className: "p-5", children: [_jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Search Notes" }), _jsx("input", { className: "py-[10px] px-[20px] border rounded-lg my-[30px] focus:outline-none w-full", placeholder: "Search for a note", maxLength: 60, ...register("body"), onChange: (e) => handleSearch(e.target.value) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredNotes.map((note) => (_jsx(_Fragment, { children: _jsx(NoteCard, { id: note.id, title: note.title, body: note.body, tags: note.tags }) }))) })] }));
}
export default NotesList;
