import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { INote } from "../../types/interfaces/INote";

export function NoteForm() {
  const [formTags, setFormTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const { register, handleSubmit, resetField, reset, setValue } =
    useForm<INote>({
      defaultValues: { title: "", body: "", tags: [] },
    });
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const onBodyChange = (content: string) => {
    setBody(content);
    setValue("body", content);
  };

  const onSubmit = async (data: INote) => {
    const updatedData = {
      title: data.title,
      body: body,
      tags: formTags,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
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
      } else {
        const errorData = await response.json();
        console.error("Backend Error Response:", errorData);
        alert(`Failed to save the note: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred while saving the note.");
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <>
      <h1>Form</h1>
      <form
        className="p-10 border rounded-2xl mx-10 flex flex-col gap-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className="text-5xl my-[30px] focus:outline-none w-full"
            placeholder="Title..."
            maxLength={40}
            {...register("title", {
              required: true,
              maxLength: 40,
            })}
          />
        </div>
        <hr className="-mt-[10px] -mb-[0px]" />
        <div className="flex flex-col gap-[20px]">
          <input
            className="focus:outline-none w-full disabled:opacity-70  p-4 border rounded-lg"
            placeholder={
              formTags.length < 5 ? "Enter Tags" : "Max tags reached"
            }
            {...register("tags", { maxLength: 20, pattern: /^[A-Za-z]+$/i })}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleAddTag}
            disabled={formTags.length >= 5}
          />
        </div>
        {formTags.length > 0 && (
          <>
            <div className="flex flex-row gap-[10px] max-w-full flex-wrap -mt-[10px] -mb-[5px]">
              {formTags.map((tag, index) => (
                <span
                  className="bg-red-200 pl-[20px] rounded-lg w-fit flex flex-row gap-[10px] "
                  key={index}
                >
                  <p className="py-[5px]">{tag}</p>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center flex-grow w-[30px]"
                    onClick={() =>
                      setFormTags(formTags.filter((t) => t !== tag))
                    }
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </span>
              ))}
            </div>
          </>
        )}
        <div className="border rounded-lg">
          <div className=" rounded-lg -m-1 relative">
            <Suspense fallback={<div>Loading editor...</div>}>
              <ReactQuill
                theme="snow"
                value={body}
                onChange={onBodyChange}
                placeholder="Enter note details"
                className="h-full shadow-none"
              />
              <input
                type="hidden"
                {...register("body", { required: true })}
                value={body}
              />
            </Suspense>
          </div>
        </div>
        <button
          className="bg-slate-900 hover:bg-slate-700 text-white py-[5px] w-fit px-[40px] rounded-lg flex flex-row gap-[10px] items-center ml-auto"
          type="submit"
        >
          <p>Save Note</p>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </form>
    </>
  );
}

export default NoteForm;
