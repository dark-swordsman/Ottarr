import Head from "next/head";

import Sidebar from "./Sidebar/Sidebar";

export default function Layout({ children, title }) {
  return (
    <div className="h-screen h-screen overflow-hidden">
      <Head>
        <title className="select-none">ANAL - {title}</title>
      </Head>
      <div className="w-100 bg-primary-800 h-16">
        <h1 className="text-3xl font-bold text-white ml-12 pt-3">ANAL</h1>
      </div>
      <div className="flex h-full">
        <Sidebar />
        <div style={{ overflow: "overlay" }} className="bg-zinc-900 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
