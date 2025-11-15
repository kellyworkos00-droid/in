import { Movement } from '@/lib/supabase'

interface MovementListProps {
  movements: Movement[]
}

export default function MovementList({ movements }: MovementListProps) {
  if (movements.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No movements recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {movements.map((movement) => (
            <tr key={movement.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {new Date(movement.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {movement.products?.name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {movement.products?.sku || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {movement.type === 'in' ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    IN
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    OUT
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                {movement.type === 'in' ? '+' : '-'}{movement.quantity}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {movement.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
