'use client'

import { useEffect, useState } from 'react'
import { supabase, Product, Movement } from '@/lib/supabase'
import MovementForm from '@/components/MovementForm'
import MovementList from '@/components/MovementList'

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchMovements()
    fetchProducts()
  }, [])

  async function fetchMovements() {
    try {
      const { data, error } = await supabase
        .from('movements')
        .select('*, products(*)')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMovements(data || [])
    } catch (error) {
      console.error('Error fetching movements:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  function handleFormClose() {
    setShowForm(false)
    fetchMovements()
    fetchProducts() // Refresh to get updated stock
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Inventory Movements</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Record Movement
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <MovementForm
              products={products}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}

      <MovementList movements={movements} />
    </div>
  )
}
