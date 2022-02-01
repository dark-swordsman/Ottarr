import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuItem({ name, link }) {
  const router = useRouter();
  
  return (
    <Link href={link}>
      <div className="w-full">
        <div className={`py-2 duration-75 pl-10 select-none text-white ${router.pathname === link ? "bg-primary-925 cursor-default" : "hover:text-sky-400 cursor-pointer"}`}>
          {name}
        </div>
      </div>
    </Link>
  );
}