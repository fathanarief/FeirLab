import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Button from "../components/Button";
import showAlert from "../components/AlertMessage";

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));

    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role")?.toLowerCase();

    if (token && ["admin", "staff"].includes(role)) {
      navigate("/products", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      const token = data.access_token;
      const user = token ? decodeToken(token) : null;
      const role = String(user?.role || "").toLowerCase();

      if (!token || !["admin", "staff"].includes(role)) {
        throw new Error("Akun ini tidak memiliki akses ke CMS.");
      }

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_role", user.role);
      localStorage.setItem("user_email", user.email || email);

      showAlert("Login berhasil.", "success");
      navigate("/products", { replace: true });
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("user_email");

      showAlert(
        error.response?.data?.message || error.message || "Login gagal.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-base-200 p-4 sm:p-6">
      <section className="card w-full max-w-md border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-6 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-xl border border-neutral bg-neutral text-2xl font-bold text-neutral-content">
              F
            </div>
            <div>
              <h1 className="text-2xl font-bold">FeirLab CMS</h1>
              <p className="mt-1 text-sm text-base-content/60">
                Masuk untuk mengelola produk toko.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukkan email"
                autoComplete="username"
                required
              />
            </label>

            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
              />
            </label>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-xs text-base-content/60">
            FeirLab — Gear Up Your Isekai
          </p>
        </div>
      </section>
    </main>
  );
}
