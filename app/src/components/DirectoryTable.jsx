import ArrowButton from "./ArrowButton";

export default function DirectoryTable({ state, methods }) {
  const { directories, pageDirectories, pageData } = state;
  const { handleCurrentDirectory, handlePage } = methods;

  function renderDirectories() {
    return pageDirectories.map(({ name, directory }, i) => {
      return (
        <tr key={i} onClick={() => handleCurrentDirectory(i + ((pageData.currentPage - 1) * 4))} className="hover:bg-slate-700 cursor-pointer whitespace-nowrap">
          <td className="px-4 pb-1 border-r">
            {name}
          </td>
          <td className="px-4 pb-1 text-truncate">
            {directory}
          </td>
        </tr>
      );
    });
  }
  
  return (
    <div className="mb-6 w-1/3 min-w-[24rem]">
      <table className="w-full text-white border divide-y select-none">
        <thead className="bg-slate-700">
          <tr>
            <th className="pb-1 uppercase tracking-wider">name</th>
            <th className="pb-1 uppercase tracking-wider">directory</th>
          </tr>
        </thead>
        <tbody className="bg-slate-600 divide-y">
          {renderDirectories()}
          {4 * (pageData.currentPage - 1) + 4 - directories.length > 0 && <tr className="h-[3.76rem]"><td></td><td></td></tr>}
        </tbody>
      </table>
      <div className="bg-slate-700 px-6 py-1 w-full border-x border-b flex justify-between">
        <div className="text-white">Page: {pageData.currentPage}</div>
        <div className="text-white">{4 * (pageData.currentPage - 1)}-{Math.min(4 * (pageData.currentPage - 1) + 4, directories.length)} of {directories.length}</div>
        <div className="flex">
          <ArrowButton onClick={() => handlePage(false)} hoverBackgroundColor="bg-slate-600" arrowColor="white" />
          <ArrowButton onClick={() => handlePage(true)} hoverBackgroundColor="bg-slate-600" arrowColor="white" right />
        </div>
      </div>
    </div>
  );
}