import { NavLink } from "react-router";

export default function Sidebar({ isAdminUser }) {
  const menus = [
    { label: "Produk", to: "/products" },
    { label: "Kategori", to: "/categories" },
  ];

  if (isAdminUser) {
    menus.push({ label: "Tambah Staff", to: "/add-user" });
  }

  return (
    <aside className="border-b border-base-300 bg-base-100 p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 border-b border-base-300 px-2 pb-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-neutral bg-neutral text-xl font-bold text-neutral-content">
          F
        </div>
        <div>
          <h1 className="text-lg font-bold">FeirLab</h1>
          <p className="text-xs text-base-content/60">Content Management</p>
        </div>
      </div>

      <nav className="mt-4" aria-label="Navigasi CMS">
        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-base-content/50">
          Menu
        </p>
        <ul className="menu w-full flex-row flex-wrap gap-1 p-0 lg:flex-col">
          {menus.map((menu) => (
            <li key={menu.to}>
              <NavLink
                to={menu.to}
                className={({ isActive }) => (isActive ? "menu-active" : "")}
              >
                {menu.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-8 hidden px-3 text-xs text-base-content/50 lg:block">
        FeirLab CMS
      </p>
    </aside>
  );
}
