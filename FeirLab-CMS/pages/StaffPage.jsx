import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Button from "../components/Button";
import showAlert from "../components/AlertMessage";

const emptyForm = {
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
};

export default function StaffPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${baseUrl}/add-user`,
        {
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          phoneNumber: form.phoneNumber.trim(),
          address: form.address.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      showAlert(data.message || "Staff berhasil didaftarkan.", "success");
      setForm(emptyForm);
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Staff gagal didaftarkan.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Tambah Staff</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Daftarkan akun staff baru untuk mengakses CMS.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Kembali
        </Button>
      </div>

      <form
        className="card border border-base-300 bg-base-100 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="card-body p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">Username</span>
              <input
                name="username"
                className="input input-bordered w-full"
                value={form.username}
                onChange={handleChange}
                minLength="3"
                required
              />
            </label>

            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={handleChange}
                minLength="5"
                maxLength="20"
                required
              />
            </label>

            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">Nomor Telepon</span>
              <input
                type="tel"
                name="phoneNumber"
                className="input input-bordered w-full"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label className="block w-full md:col-span-2">
              <span className="mb-2 block text-sm font-medium">Alamat</span>
              <textarea
                name="address"
                className="textarea textarea-bordered min-h-28 w-full"
                rows="4"
                value={form.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col-reverse justify-end gap-2 border-t border-base-300 pt-5 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Mendaftarkan..." : "Daftarkan Staff"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
