'use client'

import { useState } from 'react'
import { importProductsFromFile, downloadSampleTemplate } from '@/lib/import'

interface ImportProductsProps {
  onImportComplete: () => void
  onClose: () => void
}

export default function ImportProducts({ onImportComplete, onClose }: ImportProductsProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: number; errors: string[] } | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  async function handleImport() {
    if (!file) return

    setLoading(true)
    setResult(null)

    try {
      const result = await importProductsFromFile(file)
      setResult(result)
      
      if (result.success > 0) {
        setTimeout(() => {
          onImportComplete()
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Import error:', error)
      setResult({ success: 0, errors: ['Failed to import file. Please check the format.'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Import Products from Excel/CSV</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">📋 File Requirements:</h4>
        <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
          <li>Excel (.xlsx, .xls) or CSV (.csv) file</li>
          <li>Must have columns: <strong>Product Name</strong>, <strong>SKU</strong>, <strong>Category</strong>, <strong>Current Stock</strong>, <strong>Minimum Stock</strong></li>
          <li>First row should be column headers</li>
        </ul>
        <button
          onClick={downloadSampleTemplate}
          className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          📥 Download Sample Template
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select File</label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        {file && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: {file.name}
          </p>
        )}
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${result.success > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          {result.success > 0 && (
            <p className="text-green-800 font-semibold">
              ✅ Successfully imported {result.success} product(s)!
            </p>
          )}
          {result.errors.length > 0 && (
            <div className="mt-2">
              <p className="text-red-800 font-semibold mb-1">⚠️ Warnings/Errors:</p>
              <ul className="text-sm text-red-700 space-y-1 ml-4 list-disc">
                {result.errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <button
          onClick={handleImport}
          disabled={!file || loading}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Importing...' : 'Import Products'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
