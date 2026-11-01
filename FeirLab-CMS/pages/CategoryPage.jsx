import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import showAlert from "../components/AlertMessage";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(`${baseUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setCategories(data.data || []);
      } catch (error) {
        showAlert(
          error.response?.data?.message || "Kategori gagal dimuat.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Daftar Kategori</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Daftar kategori produk yang tersimpan di FeirLab.
          </p>
        </div>
        <span className="badge badge-neutral badge-outline py-3">
          {categories.length} kategori
        </span>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-base-content/60">
            <span className="loading loading-spinner loading-md" />
            Memuat kategori...
          </div>
        ) : categories.length === 0 ? (
          <p className="p-12 text-center text-sm text-base-content/60">
            Belum ada kategori.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Kategori</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td className="font-medium">{category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
