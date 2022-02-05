import classNames from "classnames";
import FileRow from "./FileRow";

export default function DirectoryRow({ directory, originalDirectory, newFile, depth }) {
  return (
    <table className="w-full">
      <tbody
        className={classNames("w-full", {
          "bg-zinc-500": depth % 2,
          "bg-zinc-600": !(depth % 2),
        })}
      >
        {directory.map((subFile, i) => {
          return <FileRow key={i} file={subFile} originalDirectory={`${originalDirectory}/${newFile.file}`} index={i} depth={depth + 1} />;
        })}
      </tbody>
    </table>
  );
}
