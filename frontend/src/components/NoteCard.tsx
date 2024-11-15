import { INote } from "@interfaces/INote";

export function NoteCard({ id, title, body, tags }: INote) {
  return (
    <div
      className="border px-6 pb-[20px] rounded-lg flex flex-col gap-[20px]"
      id={JSON.stringify(id)}
    >
      <h2 className="text-2xl font-semibold pt-[30px]">{title}</h2>
      <hr />
      {tags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-[10px] text-sm">
            {tags.map((tag, index) => (
              <span
                className="text-xs bg-red-200 px-[20px] py-[5px] rounded-lg"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
          <hr />
        </>
      )}

      <p
        dangerouslySetInnerHTML={{ __html: body }}
        className="line-clamp-3 text-sm text-slate-700"
      ></p>
      <button className="w-fit text-sm font-bold mt-auto">
        view full note
      </button>
    </div>
  );
}
