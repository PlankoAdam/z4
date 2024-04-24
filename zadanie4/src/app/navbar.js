import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="m-5">
      <ul className="flex gap-x-5">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/traffic">Traffic</Link>
        </li>
      </ul>
    </nav>
  );
}
