import * as XLSX from 'xlsx'
import { supabase } from './supabase'

export interface ImportedProduct {
  name: string
  sku: string
  category: string
  current_stock: number
  min_stock: number
}

export async function importProductsFromFile(file: File): Promise<{ success: number; errors: string[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const fileData = e.target?.result
        const workbook = XLSX.read(fileData, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        const products: ImportedProduct[] = []
        const errors: string[] = []

        jsonData.forEach((row: any, index: number) => {
          try {
            // Support different column name variations
            const name = row['Product Name'] || row['name'] || row['Name'] || row['PRODUCT NAME']
            const sku = row['SKU'] || row['sku'] || row['Sku'] || row['Code']
            const category = row['Category'] || row['category'] || row['CATEGORY']
            const current_stock = parseInt(row['Current Stock'] || row['Stock'] || row['current_stock'] || row['Quantity'] || '0')
            const min_stock = parseInt(row['Minimum Stock'] || row['Min Stock'] || row['min_stock'] || row['Min'] || '0')

            if (!name || !sku) {
              errors.push(`Row ${index + 2}: Missing required fields (Product Name or SKU)`)
              return
            }

            products.push({
              name: String(name).trim(),
              sku: String(sku).trim(),
              category: String(category || 'Uncategorized').trim(),
              current_stock: isNaN(current_stock) ? 0 : current_stock,
              min_stock: isNaN(min_stock) ? 0 : min_stock,
            })
          } catch (err) {
            errors.push(`Row ${index + 2}: Error parsing data - ${err}`)
          }
        })

        if (products.length === 0) {
          resolve({ success: 0, errors: ['No valid products found in file'] })
          return
        }

        // Insert products into Supabase
        const { data, error } = await supabase
          .from('products')
          .insert(products)
          .select()

        if (error) {
          if (error.message.includes('duplicate')) {
            errors.push('Some products have duplicate SKUs and were skipped')
          } else {
            errors.push(`Database error: ${error.message}`)
          }
        }

        resolve({
          success: data?.length || 0,
          errors
        })
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsBinaryString(file)
  })
}

export function downloadSampleTemplate() {
  const sampleData = [
    {
      'Product Name': 'Example Product 1',
      'SKU': 'PROD-001',
      'Category': 'Electronics',
      'Current Stock': 10,
      'Minimum Stock': 5
    },
    {
      'Product Name': 'Example Product 2',
      'SKU': 'PROD-002',
      'Category': 'Furniture',
      'Current Stock': 20,
      'Minimum Stock': 10
    }
  ]

  const ws = XLSX.utils.json_to_sheet(sampleData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Products')
  XLSX.writeFile(wb, 'product_import_template.xlsx')
}
