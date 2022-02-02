export default function FileTable({ files, currentDirectory }) {
  function renderBody() {
    if (files) {
      return files.map(({ file, isDirectory }, i) => {
        return (
          <tr key={i}>
            <td className={`px-4 whitespace-nowrap tracking-wider ${isDirectory ? "text-blue-300 hover:text-blue-400 cursor-pointer" : ""}`}>
              {isDirectory ? `> ${file}/` : file}
            </td>
          </tr>
        );
      });
    } else {
      return null;
    }
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300 text-white">
        <thead className="bg-zinc-600">
          <tr>
            <th className="px-6 py-3 tracking-wider">{currentDirectory.directory ?? "Please Select a Directory..."}</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-500">
          {renderBody()}
        </tbody>
      </table>
    </div>
  );
}