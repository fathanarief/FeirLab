import { useNavigate } from "react-router";
import Button from "./Button";

export default function NavbarCMS({ email, role }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-base-300 bg-base-100 px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <p className="mb-1 text-xs text-base-content/60">FeirLab / CMS</p>
        <h2 className="font-semibold">Manajemen Toko</h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden text-right sm:block">
          <strong className="block text-sm">{email || "Pengguna CMS"}</strong>
          <span className="text-xs capitalize text-base-content/60">
            {role || "User"}
          </span>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Keluar
        </Button>
      </div>
    </header>
  );
}
