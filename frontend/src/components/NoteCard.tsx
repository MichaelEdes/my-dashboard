import { INote } from "../types/interfaces/INote";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NoteCardProps extends INote {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

export function NoteCard({
  id,
  title,
  body,
  tags,
  created_at,
  last_updated,
  isDropdownOpen,
  toggleDropdown
}: NoteCardProps) {
  const formatLastUpdated = (date: string | undefined | null) => {
    if (!date) return "Invalid date";
    const parsedDate = new Date(date);


    if (differenceInDays(new Date(), parsedDate) < 7) {
      return `${formatDistanceToNow(parsedDate, { addSuffix: true })}`;
    }

    return format(parsedDate, "MMMM dd yyyy");
  };

  return (
    <div
      className="border p-4 pb-[20px] h-fit max-w-full rounded-xl flex flex-col gap-[20px] bg-white break-inside-avoid relative"
      id={JSON.stringify(id)}
    >
      <div className="flex flex-row justify-between items-center -mt-1 -mr-2">
        <div className="text-xs w-full text-start text-[--secondary] opacity-100">
          {id}
          <br></br>
          <br></br>

          <span>last updated: {formatLastUpdated(last_updated)}</span>
          <br></br>
        </div>
        <div className="relative text-xs rounded-full z-10">
          <MoreVertIcon
            className="cursor-pointer bg-black text-white rounded-full p-1"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <ul className="mt-1 right-0 bg-white rounded-xl flex flex-col p-2 absolute w-[120px] shadow">
              <Link to={`/edit-note/${id}`}>
                <li className="p-2 rounded-lg flex flex-row gap-[10px] text-xs items-center cursor-pointer hover:bg-gray-50">
                  <EditNoteIcon />
                  Edit
                </li>
              </Link>
              <li className="p-2 rounded-lg flex flex-row text-[--error] gap-[10px] text-xs items-center cursor-pointer hover:bg-gray-50">
                <DeleteIcon />
                Delete
              </li>
            </ul>
          )}
        </div>
      </div>
      <h2 className="text-lg font-semibold pt-[20] w-full">{title}</h2>
      {tags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-[10px] text-sm">
            {tags.map((tag, index) => (
              <span
                className="text-xs bg-[--background] text-[--text] font-semibold bg-opacity-30 px-[10px] py-[5px] rounded-lg"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}

      <p
        dangerouslySetInnerHTML={{ __html: body }}
        className="text-xs text-slate-700 text-ellipsis overflow-hidden"
      ></p>
    </div>
  );
}
