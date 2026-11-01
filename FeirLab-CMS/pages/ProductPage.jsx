import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Button from "../components/Button";
import showAlert from "../components/AlertMessage";
import formatCurrency from "../helpers/currency";

export default function ProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProducts(data.data || []);
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Data produk gagal dimuat.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const visibleProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase().trim())
  );

  async function handleDelete(product) {
    const confirmed = window.confirm(`Hapus produk "${product.name}"?`);
    if (!confirmed) return;

    try {
      const { data } = await axios.delete(
        `${baseUrl}/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      setProducts(products.filter((item) => item.id !== product.id));
      showAlert(data.message || "Produk berhasil dihapus.", "success");
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Produk gagal dihapus.",
        "error"
      );
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Daftar Produk</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Kelola seluruh produk yang tersedia di FeirLab.
          </p>
        </div>
        <Button onClick={() => navigate("/products/new")}>Tambah Produk</Button>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-base-300 p-4 sm:flex-row sm:items-end sm:justify-between">
          <label className="block w-full max-w-sm">
            <span className="mb-2 block text-sm font-medium">Cari produk</span>
            <input
              type="search"
              className="input input-bordered w-full"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Masukkan nama produk"
            />
          </label>
          <span className="badge badge-neutral badge-outline py-3">
            {visibleProducts.length} dari {products.length} produk
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-base-content/60">
            <span className="loading loading-spinner loading-md" />
            Memuat produk...
          </div>
        ) : visibleProducts.length === 0 ? (
          <p className="p-12 text-center text-sm text-base-content/60">
            Produk tidak ditemukan.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <div className="flex min-w-60 items-center gap-3">
                        {product.imgUrl ? (
                          <img
                            src={product.imgUrl}
                            alt={product.name}
                            className="size-14 shrink-0 rounded-lg border border-base-300 object-cover"
                          />
                        ) : (
                          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-base-300 bg-base-200 text-center text-xs text-base-content/50">
                            No image
                          </div>
                        )}
                        <div className="min-w-0">
                          <strong className="block max-w-56 truncate">
                            {product.name}
                          </strong>
                          <p className="mt-1 max-w-56 truncate text-xs text-base-content/60">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{product.Category?.name || "Tanpa kategori"}</td>
                    <td className="whitespace-nowrap">
                      {formatCurrency(product.price)}
                    </td>
                    <td>{product.stock ?? 0}</td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="btn-sm"
                          onClick={() => navigate(`/products/${product.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="btn-sm"
                          onClick={() => navigate(`/products/${product.id}/upload`)}
                        >
                          Upload
                        </Button>
                        <Button
                          variant="outline"
                          className="btn-sm"
                          onClick={() => handleDelete(product)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
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
