import Button from "./Button";

export default function ProductForm({
  form,
  categories,
  onChange,
  onSubmit,
  onCancel,
  loading,
  submitText,
}) {
  return (
    <form
      className="card border border-base-300 bg-base-100 shadow-sm"
      onSubmit={onSubmit}
    >
      <div className="card-body p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="block w-full">
            <span className="mb-2 block text-sm font-medium">Nama Produk</span>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={onChange}
              required
            />
          </label>

          <label className="block w-full">
            <span className="mb-2 block text-sm font-medium">Kategori</span>
            <select
              name="categoryId"
              className="select select-bordered w-full"
              value={form.categoryId}
              onChange={onChange}
              required
            >
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block w-full">
            <span className="mb-2 block text-sm font-medium">Harga (Rupiah)</span>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              min="100000"
              step="1"
              value={form.price}
              onChange={onChange}
              required
            />
          </label>

          <label className="block w-full">
            <span className="mb-2 block text-sm font-medium">Stok</span>
            <input
              type="number"
              name="stock"
              className="input input-bordered w-full"
              min="0"
              step="1"
              value={form.stock}
              onChange={onChange}
              required
            />
          </label>

          <label className="block w-full md:col-span-2">
            <span className="mb-2 block text-sm font-medium">Deskripsi Produk</span>
            <textarea
              name="description"
              className="textarea textarea-bordered min-h-32 w-full"
              rows="5"
              value={form.description}
              onChange={onChange}
              required
            />
          </label>

          <label className="block w-full md:col-span-2">
            <span className="mb-2 block text-sm font-medium">URL Gambar Produk</span>
            <input
              type="text"
              name="imgUrl"
              className="input input-bordered w-full"
              value={form.imgUrl}
              onChange={onChange}
              placeholder="https://..."
            />
          </label>
        </div>

        {form.imgUrl && (
          <div className="mt-5 space-y-2">
            <span className="text-sm font-medium">Pratinjau gambar</span>
            <img
              src={form.imgUrl}
              alt="Pratinjau produk"
              className="size-32 rounded-lg border border-base-300 object-cover"
            />
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse justify-end gap-2 border-t border-base-300 pt-5 sm:flex-row">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading || categories.length === 0}
            className="w-full sm:w-auto"
          >
            {loading ? "Menyimpan..." : submitText}
          </Button>
        </div>
      </div>
    </form>
  );
}
