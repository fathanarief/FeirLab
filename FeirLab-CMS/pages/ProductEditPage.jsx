import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Button from "../components/Button";
import ProductForm from "../components/ProductForm";
import showAlert from "../components/AlertMessage";

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryRes = await axios.get(`${baseUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setCategories(categoryRes.data.data || []);

        const productRes = await axios.get(`${baseUrl}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        const product = productRes.data.data;

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          imgUrl: product.imgUrl || "",
          categoryId: product.categoryId ?? "",
        });
      } catch (error) {
        showAlert(
          error.response?.data?.message || "Data produk gagal dimuat.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
    };

    try {
      const { data } = await axios.put(`${baseUrl}/products/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showAlert(data.message || "Produk berhasil diperbarui.", "success");
      navigate("/products", { replace: true });
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Produk gagal diperbarui.",
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
        Memuat data produk...
      </div>
    );
  }

  return (
    <section className="max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Edit Produk</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Perbarui informasi produk yang dipilih.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Kembali
        </Button>
      </div>

      <ProductForm
        form={form}
        categories={categories}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/products")}
        loading={saving}
        submitText="Simpan Perubahan"
      />
    </section>
  );
}
