import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import NavbarCMS from "../components/NavbarCMS";

export default function BaseLayout() {
  const role = localStorage.getItem("user_role") || "";
  const email = localStorage.getItem("user_email") || "";

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[230px_minmax(0,1fr)]">
      <Sidebar isAdminUser={role.toLowerCase() === "admin"} />

      <div className="min-w-0">
        <NavbarCMS email={email} role={role} />
        <main className="mx-auto w-full max-w-screen-2xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
