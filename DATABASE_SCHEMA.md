# Database Schema

This document contains the SQL schema for the inventory tracking system.

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the following SQL commands to create the tables

## Products Table

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster searches
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
```

## Movements Table

```sql
CREATE TABLE movements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('in', 'out')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  reason TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_movements_product_id ON movements(product_id);
CREATE INDEX idx_movements_date ON movements(date);
CREATE INDEX idx_movements_type ON movements(type);
```

## Enable Row Level Security (Optional)

If you want to add basic security (recommended even for single company):

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE movements ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (adjust based on your needs)
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on movements" ON movements FOR ALL USING (true);
```

## Sample Data (Optional)

```sql
-- Insert sample products
INSERT INTO products (name, sku, category, current_stock, min_stock) VALUES
  ('Laptop HP ProBook', 'LAP-001', 'Electronics', 15, 5),
  ('Office Chair', 'FUR-001', 'Furniture', 8, 3),
  ('A4 Paper Ream', 'STA-001', 'Stationery', 50, 20),
  ('USB Flash Drive 32GB', 'ELE-001', 'Electronics', 30, 10);

-- Insert sample movements
INSERT INTO movements (product_id, type, quantity, reason, date)
SELECT id, 'in', 10, 'Initial stock', CURRENT_DATE
FROM products
WHERE sku = 'LAP-001';
```
