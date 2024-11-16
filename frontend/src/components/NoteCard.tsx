import { INote } from "../types/interfaces/INote";
import { format } from "date-fns";

export function NoteCard({ id, title, body, tags, created_at }: INote) {
  const formattedDate = (date: string | undefined | null) => {
    if (!date) return "Invalid date";
    const parsedDate = new Date(date);
    return format(parsedDate, "MMMM dd yyyy");
  };

  return (
    <div
      className="border px-4 pb-[20px] h-fit max-w-full overflow-hidden rounded-lg flex flex-col gap-[20px] bg-red-300 break-inside-avoid"
      id={JSON.stringify(id)}
    >
      <div>
        <div className="text-xs w-full text-start pt-4 text-black opacity-40">
          {formattedDate(created_at)}
        </div>
      </div>
      <h2 className="text-lg font-semibold pt-[20] w-full">{title}</h2>
      {/* {tags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-[10px] text-sm">
            {tags.map((tag, index) => (
              <span
                className="text-xs bg-white bg-opacity-30 px-[10px] py-[5px] rounded-lg"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
          <hr className="-mx-[25px]" />
        </>
      )} */}

      <p
        dangerouslySetInnerHTML={{ __html: body }}
        className="text-xs text-slate-700 text-ellipsis overflow-hidden"
      ></p>
    </div>
  );
}
