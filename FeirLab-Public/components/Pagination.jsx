export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-3"
      aria-label="Navigasi halaman produk"
    >
      <button
        type="button"
        className="btn btn-outline btn-neutral"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Sebelumnya
      </button>

      <span className="text-sm text-base-content/70">
        Halaman {page} dari {totalPages}
      </span>

      <button
        type="button"
        className="btn btn-outline btn-neutral"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Berikutnya
      </button>
    </nav>
  );
}
