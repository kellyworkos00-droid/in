import * as XLSX from 'xlsx'
import { Product, Movement } from './supabase'

export function exportToExcel(products: Product[], movements: Movement[]) {
  // Create workbook
  const wb = XLSX.utils.book_new()

  // Products sheet
  const productsData = products.map(p => ({
    'Product Name': p.name,
    'SKU': p.sku,
    'Category': p.category,
    'Current Stock': p.current_stock,
    'Minimum Stock': p.min_stock,
    'Created Date': new Date(p.created_at).toLocaleDateString()
  }))
  const ws1 = XLSX.utils.json_to_sheet(productsData)
  XLSX.utils.book_append_sheet(wb, ws1, 'Products')

  // Movements sheet
  const movementsData = movements.map(m => ({
    'Product': m.products?.name || 'N/A',
    'SKU': m.products?.sku || 'N/A',
    'Type': m.type.toUpperCase(),
    'Quantity': m.quantity,
    'Reason': m.reason,
    'Date': new Date(m.date).toLocaleDateString(),
    'Created At': new Date(m.created_at).toLocaleDateString()
  }))
  const ws2 = XLSX.utils.json_to_sheet(movementsData)
  XLSX.utils.book_append_sheet(wb, ws2, 'Movements')

  // Generate file
  const fileName = `inventory_report_${new Date().toISOString().split('T')[0]}.xlsx`
  XLSX.writeFile(wb, fileName)
}

export function exportToCSV(data: any[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(ws)
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}
