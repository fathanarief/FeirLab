import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="navbar sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-5 px-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          FeirLab
        </Link>
        <p className="text-sm text-base-content/70">
          Desk Setup and Audio Gear
        </p>
      </div>
    </header>
  );
}
