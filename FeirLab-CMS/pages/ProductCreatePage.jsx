import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Button from "../components/Button";
import ProductForm from "../components/ProductForm";
import showAlert from "../components/AlertMessage";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  imgUrl: "",
  categoryId: "",
};

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(`${baseUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        const categoryList = data.data || [];
        setCategories(categoryList);

        if (categoryList.length > 0) {
          setForm({ ...emptyForm, categoryId: categoryList[0].id });
        }
      } catch (error) {
        showAlert(
          error.response?.data?.message || "Kategori gagal dimuat.",
          "error"
        );
      }
    }

    fetchCategories();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
    };

    try {
      const { data } = await axios.post(`${baseUrl}/products`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showAlert(data.message || "Produk berhasil ditambahkan.", "success");
      navigate("/products", { replace: true });
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Produk gagal ditambahkan.",
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
          <h1 className="text-2xl font-bold">Tambah Produk</h1>
          <p className="mt-1 text-sm text-base-content/60">
            Isi informasi produk yang ingin ditambahkan.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/products")}>
          Kembali
        </Button>
      </div>

      {categories.length === 0 && (
        <div className="alert border border-base-300 bg-base-200 text-base-content">
          <span>Belum ada kategori. Tambahkan kategori terlebih dahulu.</span>
        </div>
      )}

      <ProductForm
        form={form}
        categories={categories}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/products")}
        loading={loading}
        submitText="Tambah Produk"
      />
    </section>
  );
}
