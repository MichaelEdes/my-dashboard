import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  body: string;
  tags: string[];
}

export function NoteForm() {
  const [formTags, setFormTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const { register, handleSubmit, resetField, reset } = useForm<IFormInput>({
    defaultValues: { title: "", body: "", tags: [] }
  });

  const onSubmit = (data: IFormInput) => {
    const updatedData = {
      ...data,
      tags: formTags
    };
    console.log(updatedData);

    reset();
    setFormTags([]);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    const newTag = tag.trim();
    if ((e.key !== "Enter" && e.key !== ",") || newTag.length === 0) {
      return;
    }
    if (!formTags.includes(newTag)) {
      setFormTags([...formTags, newTag]);
      resetField("tags");
    }
    setTag("");
  };

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title", { required: true, maxLength: 20 })} />
        <label>Content</label>
        <input {...register("body", { required: true })} />
        <label>Tag Input</label>
        <input
          {...register("tags", { maxLength: 20 })}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleAddTag}
        />
        <input type="submit" />
      </form>
      {formTags.map((tag, index) => (
        <span className="bg-blue-400 py-2 px-[20px] rounded-xl" key={index}>
          {tag}
          <span
            className="pl-[20px] bg-red-400 text-xs rounded-xl cursor-pointer"
            onClick={() => setFormTags(formTags.filter((t) => t !== tag))}
          >
            delete
          </span>
        </span>
      ))}
    </>
  );
}

export default NoteForm;
