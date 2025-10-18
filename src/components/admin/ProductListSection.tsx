

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "./ProductCard"; 
import { Product } from "@/contexts/CartContext";
import { useState } from "react";


interface ProductManager {
  getProductsByCategory: (category: string) => Product[];
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
}

interface ProductListSectionProps {
    manager: ProductManager;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onToggleFeatured: (id: string) => void;
}

export function ProductListSection({ manager, onEdit, onDelete, onToggleFeatured }: ProductListSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const productCategories = [
      { value: "all", label: "Todos" },
      { value: "burgers", label: "Hambúrgueres" },
      { value: "drinks", label: "Bebidas" },
      { value: "sides", label: "Acompanhamentos" },
      { value: "combos", label: "Combos" },
    ];

    const filteredProducts = manager.getProductsByCategory(selectedCategory);

    return (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
                {productCategories.map(cat => (
                  <TabsTrigger key={cat.value} value={cat.value}>
                    {cat.label}
                  </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleFeatured={onToggleFeatured}
                        />
                    ))}
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            Nenhum produto encontrado nesta categoria.
                        </p>
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}