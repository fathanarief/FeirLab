import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Button from "../components/Button";
import showAlert from "../components/AlertMessage";

export default function UploadImagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${baseUrl}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setProduct(data.data);
        setPreview(data.data.imgUrl || "");
      } catch (error) {
        showAlert(
          error.response?.data?.message || "Produk gagal dimuat.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleFileChange(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      showAlert("File harus berupa gambar.", "error");
      setFile(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      showAlert("Ukuran gambar maksimal 5 MB.", "error");
      setFile(null);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      showAlert("Pilih gambar terlebih dahulu.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("imgUrl", file);
    setSaving(true);

    try {
      const { data } = await axios.patch(
        `${baseUrl}/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      showAlert(data.message || "Gambar berhasil diperbarui.", "success");
      navigate("/products", { replace: true });
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Gambar gagal diunggah.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-8 text-base-content/60">
        <span className="loading loading-spinner loading-md" />
        Memuat produk...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100 p-8 text-center text-sm text-base-content/60">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <section className="max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Upload Image Produk</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Ganti gambar untuk produk yang dipilih.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Kembali
        </Button>
      </div>

      <section className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body p-5 sm:p-6">
          <div className="border-b border-base-300 pb-4">
            <strong>{product.name}</strong>
            <p className="mt-1 text-sm text-base-content/60">
              ID Produk: {product.id}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 py-5 sm:grid-cols-2">
            <div className="space-y-3">
              <h2 className="font-semibold">Gambar Saat Ini</h2>
              {product.imgUrl ? (
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="aspect-square w-full max-w-xs rounded-lg border border-base-300 bg-base-200 object-contain"
                />
              ) : (
                <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-lg border border-base-300 bg-base-200 text-sm text-base-content/50">
                  Belum ada gambar
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="font-semibold">Pratinjau Gambar</h2>
              {preview ? (
                <img
                  src={preview}
                  alt="Pratinjau gambar baru"
                  className="aspect-square w-full max-w-xs rounded-lg border border-base-300 bg-base-200 object-contain"
                />
              ) : (
                <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-lg border border-base-300 bg-base-200 text-sm text-base-content/50">
                  Pilih file gambar
                </div>
              )}
            </div>
          </div>

          <form className="space-y-4 border-t border-base-300 pt-5" onSubmit={handleSubmit}>
            <label className="block w-full">
              <span className="mb-2 block text-sm font-medium">
                Pilih File Gambar
              </span>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </label>
            {file && (
              <p className="text-sm text-base-content/60">
                File dipilih: {file.name}
              </p>
            )}

            <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => navigate("/products")}
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={!file || saving}
                className="w-full sm:w-auto"
              >
                {saving ? "Mengunggah..." : "Simpan Gambar"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
