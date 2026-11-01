import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

const pageSize = 8;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const { data } = await axios.get(`${baseUrl}/pub/products`, {
          params: {
            search: search.trim() || undefined,
            filter: category || undefined,
            sort,
            page,
            size: pageSize,
          },
        });

        setProducts(data.data || []);
        setTotalData(data.totalData || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        setError(
          error.response?.data?.message || "Produk gagal dimuat dari server."
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [search, category, sort, page]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(`${baseUrl}/pub/categories`);
        setCategories(data.data || []);
      } catch (error) {
        setCategoryError(
          error.response?.data?.message || "Kategori gagal dimuat dari server."
        );
      }
    }

    fetchCategories();
  }, []);

  function resetFilters() {
    setSearch("");
    setCategory("");
    setSort("-createdAt");
    setPage(1);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 lg:py-12">

      <section id="collection" className="scroll-mt-24">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold">Isekai Inventory</h2>
            <p className="mt-1 text-sm text-base-content/70">
              Ciptakan sanctuary impian dengan koleksi desk setup & audio berstandar isekai.
            </p>
          </div>
          <span className="text-sm text-base-content/70">
            {totalData} produk
          </span>
        </div>

        <div className="mb-6 grid items-end gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_auto]">
          <label className="fieldset w-full">
            <legend className="fieldset-legend">Cari Gear atau Loot...</legend>
            <input
              type="search"
              className="input w-full"
              value={search}
              placeholder="Cari loot, desk mat, atau IEM..."
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </label>

          <label className="fieldset w-full">
            <legend className="fieldset-legend">Kategori</legend>
            <select
              className="select w-full"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              <option value="">Semua kategori</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="fieldset w-full">
            <legend className="fieldset-legend">Urutkan</legend>
            <select
              className="select w-full"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option value="-createdAt">Terbaru</option>
              <option value="createdAt">Terlama</option>
              <option value="price">Harga terendah</option>
              <option value="-price">Harga tertinggi</option>
              <option value="name">Nama A-Z</option>
              <option value="-name">Nama Z-A</option>
            </select>
          </label>

          <button
            type="button"
            className="btn btn-outline btn-neutral w-full xl:w-auto"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        {categoryError && (
          <div role="alert" className="alert mb-4 border-base-300 bg-base-200 text-base-content">
            {categoryError}
          </div>
        )}
        {error && (
          <div role="alert" className="alert mb-4 border-base-300 bg-base-200 text-base-content">
            {error}
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-10">
            <span className="loading loading-spinner loading-md" />
            <span className="text-sm text-base-content/70">Memuat produk...</span>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="alert border-base-300 bg-base-200 text-base-content">
            Produk tidak ditemukan.
          </div>
        )}

        {!loading && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={
                    categories.find((item) => item.id === product.categoryId)
                      ?.name
                  }
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </>
        )}
      </section>
    </div>
  );
}
