import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./CartContext";
import { products as initialProducts } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: string) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(
    initialProducts.map(p => ({ ...p, featured: false }))
  );

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, featured: !p.featured } : p
      )
    );
  };

  const getFeaturedProducts = () => {
    return products.filter(p => p.featured);
  };

  const getProductsByCategory = (category: string) => {
    if (category === "all") return products;
    return products.filter(p => p.category === category);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        getFeaturedProducts,
        getProductsByCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};
