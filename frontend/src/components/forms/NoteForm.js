import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
export function NoteForm() {
    const [formTags, setFormTags] = useState([]);
    const [tag, setTag] = useState("");
    const { register, handleSubmit, resetField, reset, setValue } = useForm({
        defaultValues: { title: "", body: "", tags: [] }
    });
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const onBodyChange = (content) => {
        setBody(content);
        setValue("body", content);
    };
    const onSubmit = async (data) => {
        const updatedData = {
            title: data.title,
            body: body,
            tags: formTags
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                const createdNote = await response.json();
                // Update the cache in localStorage
                const cachedNotes = localStorage.getItem("notes");
                const notes = cachedNotes ? JSON.parse(cachedNotes) : [];
                const updatedNotes = [...notes, createdNote];
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
                navigate("/notes"); // Navigate back to the NotesList page
                reset();
                setFormTags([]);
                setBody("");
            }
            else {
                const errorData = await response.json();
                console.error("Backend Error Response:", errorData);
                alert(`Failed to save the note: ${errorData.error}`);
            }
        }
        catch (error) {
            console.error("Network Error:", error);
            alert("An error occurred while saving the note.");
        }
    };
    const handleAddTag = (e) => {
        const isEnterOrComma = e.key === "Enter" || e.key === "," || e.key === " ";
        if (isEnterOrComma && formTags.length < 5) {
            e.preventDefault();
            const newTag = tag.trim();
            if (newTag && !formTags.includes(newTag)) {
                setFormTags([...formTags, newTag]);
                resetField("tags");
            }
            setTag("");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Form" }), _jsxs("form", { className: "p-10 border rounded-2xl mx-10 flex flex-col gap-[30px]", onSubmit: handleSubmit(onSubmit), children: [_jsx("div", { children: _jsx("input", { className: "text-5xl my-[30px] focus:outline-none w-full", placeholder: "Title...", maxLength: 40, ...register("title", {
                                required: true,
                                maxLength: 40
                            }) }) }), _jsx("hr", { className: "-mt-[10px] -mb-[0px]" }), _jsx("div", { className: "flex flex-col gap-[20px]", children: _jsx("input", { className: "focus:outline-none w-full disabled:opacity-70  p-4 border rounded-lg", placeholder: formTags.length < 5 ? "Enter Tags" : "Max tags reached", ...register("tags", { maxLength: 20, pattern: /^[A-Za-z]+$/i }), onChange: (e) => setTag(e.target.value), onKeyDown: handleAddTag, disabled: formTags.length >= 5 }) }), formTags.length > 0 && (_jsx(_Fragment, { children: _jsx("div", { className: "flex flex-row gap-[10px] max-w-full flex-wrap -mt-[10px] -mb-[5px]", children: formTags.map((tag, index) => (_jsxs("span", { className: "bg-red-200 pl-[20px] rounded-lg w-fit flex flex-row gap-[10px] ", children: [_jsx("p", { className: "py-[5px]", children: tag }), _jsx("button", { type: "button", className: "inline-flex items-center justify-center flex-grow w-[30px]", onClick: () => setFormTags(formTags.filter((t) => t !== tag)), children: _jsx("i", { className: "fa-solid fa-xmark" }) })] }, index))) }) })), _jsx("div", { className: "border rounded-lg", children: _jsx("div", { className: " rounded-lg -m-1 relative", children: _jsxs(Suspense, { fallback: _jsx("div", { children: "Loading editor..." }), children: [_jsx(ReactQuill, { theme: "snow", value: body, onChange: onBodyChange, placeholder: "Enter note details", className: "h-full shadow-none" }), _jsx("input", { type: "hidden", ...register("body", { required: true }), value: body })] }) }) }), _jsxs("button", { className: "bg-slate-900 hover:bg-slate-700 text-white py-[5px] w-fit px-[40px] rounded-lg flex flex-row gap-[10px] items-center ml-auto", type: "submit", children: [_jsx("p", { children: "Save Note" }), _jsx("i", { className: "fa-solid fa-floppy-disk" })] })] })] }));
}
export default NoteForm;
