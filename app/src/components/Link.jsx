import NextLink from "next/link";

export default function Link({ href, extraClasses, children }) {
  return (
    <NextLink href={href}>
      <a className={`text-blue-500 hover:text-blue-600 ${extraClasses ?? ""}`} >{children}</a>
    </NextLink>
  );
}