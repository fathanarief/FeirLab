import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import baseUrl from "../api/baseUrl";
import formatCurrency from "../helpers/currency";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError("");

        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${baseUrl}/pub/products/${id}`),
          axios.get(`${baseUrl}/pub/categories`),
        ]);

        const productData = productRes.data.data;
        const categoryData = categoryRes.data.data || [];

        setProduct(productData);
        setCategory(
          categoryData.find((item) => item.id === productData.categoryId)?.name ||
            "Tanpa kategori"
        );
      } catch (error) {
        setError(
          error.response?.data?.message || "Detail produk gagal dimuat."
        );
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-96 max-w-6xl items-center justify-center gap-3 px-4 py-10">
        <span className="loading loading-spinner loading-md" />
        <span className="text-sm text-base-content/70">
          Memuat detail produk...
        </span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div role="alert" className="alert border-base-300 bg-base-200 text-base-content">
          {error || "Produk tidak ditemukan."}
        </div>
        <Link to="/" className="btn btn-neutral mt-5">
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 lg:py-12">
      <Link to="/" className="link link-hover inline-flex items-center text-sm">
        Kembali ke katalog
      </Link>

      <section className="mt-5 grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="min-h-80 overflow-hidden rounded-box border border-base-300 bg-base-200">
          {product.imgUrl ? (
            <img
              src={product.imgUrl}
              alt={product.name}
              className="h-full min-h-80 w-full object-cover"
            />
          ) : (
            <div className="grid min-h-80 place-items-center text-sm text-base-content/60">
              Tidak ada gambar
            </div>
          )}
        </div>

        <div className="flex flex-col items-start">
          <span className="badge badge-outline">{category}</span>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-5 text-2xl font-bold">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-4 whitespace-pre-line leading-8 text-base-content/75">
            {product.description}
          </p>
          <span className="badge badge-ghost mt-6">
            Stok tersedia: {product.stock ?? 0}
          </span>
          <Link to="/" className="btn btn-neutral mt-8">
            Kembali berbelanja
          </Link>
        </div>
      </section>
    </div>
  );
}
