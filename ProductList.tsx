import { Product } from '@/lib/supabase'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onStockChange: (productId: string, currentStock: number, change: number) => void
}

export default function ProductList({ products, onEdit, onDelete, onStockChange }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No products found. Add your first product!</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quick Adjust
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {product.sku}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                {product.current_stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStockChange(product.id, product.current_stock, -1)}
                    disabled={product.current_stock <= 0}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-bold"
                    title="Remove 1 from stock"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onStockChange(product.id, product.current_stock, 1)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 font-bold"
                    title="Add 1 to stock"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {product.min_stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.current_stock <= product.min_stock ? (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
