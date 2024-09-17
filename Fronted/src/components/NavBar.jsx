import NavItem from "./NavItem";

export default function NavBar({ links }) {
  return (
    <nav className="bg-slate-800 flex justify-between items-center px-2.5 min-w-full">
      <div>Logo</div>
      {links.map((link, index) => (
        <NavItem key={index} link={link} />
      ))}
    </nav>
  );
}
