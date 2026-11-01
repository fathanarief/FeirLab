import { Link } from "react-router";
import formatCurrency from "../helpers/currency";

export default function ProductCard({ product, category }) {
  return (
    <article className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <Link
        to={`/products/${product.id}`}
        className="block aspect-4/3 overflow-hidden bg-base-200"
      >
        {product.imgUrl ? (
          <img
            src={product.imgUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full min-h-52 place-items-center text-sm text-base-content/60">
            Tidak ada gambar
          </div>
        )}
      </Link>

      <div className="card-body gap-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="badge badge-ghost">
            {category || "Tanpa kategori"}
          </span>
          <span className="text-xs text-base-content/70">
            Stok: {product.stock ?? 0}
          </span>
        </div>

        <h2 className="card-title text-lg">
          <Link to={`/products/${product.id}`} className="link link-hover">
            {product.name}
          </Link>
        </h2>

        <p className="line-clamp-3 text-sm text-base-content/70">
          {product.description}
        </p>

        <strong className="mt-auto text-lg">
          {formatCurrency(product.price)}
        </strong>

        <Link to={`/products/${product.id}`} className="btn btn-neutral mt-1 w-full">
          Lihat detail
        </Link>
      </div>
    </article>
  );
}
