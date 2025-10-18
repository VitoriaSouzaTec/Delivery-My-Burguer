// src/pages/Admin.tsx

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/contexts/ProductsContext";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/contexts/CartContext";

// Importa os subcomponentes
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import { ProductListSection } from "@/components/admin/ProductListSection";

// Tipagem auxiliar
type ProductFormData = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const productManager = useProducts();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- Handlers de Ação ---

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel admin.",
    });
    navigate("/admin/login");
  };
  
  const handleOpenNewProduct = () => {
    setEditingProduct(null); // Limpa o produto em edição
    setIsDialogOpen(true);
  }

  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      productManager.deleteProduct(id);
      toast({
        title: "Produto excluído!",
        description: "O produto foi removido do catálogo.",
      });
    }
  }, [productManager, toast]);

  const handleToggleFeatured = useCallback((id: string) => {
    productManager.toggleFeatured(id);
    toast({
      title: "Atualizado!",
      description: "Status de 'Mais Vendidos' alterado.",
    });
  }, [productManager, toast]);

  const handleFormSubmit = (data: ProductFormData, isEditing: boolean, productId?: string) => {
    const productData = {
        ...data,
        price: parseFloat(data.price),
        // Mantém 'featured' se for edição, ou define como 'false' se for novo.
        featured: isEditing ? (editingProduct?.featured || false) : false, 
    };

    if (isEditing && productId) {
      productManager.updateProduct(productId, productData);
      toast({
        title: "Produto atualizado!",
        description: "O produto foi atualizado com sucesso.",
      });
    } else {
      // Não forneça 'id' aqui: addProduct espera um objeto sem a propriedade 'id' (Omit<Product, "id">)
      productManager.addProduct({
        ...productData,
      });
      toast({
        title: "Produto criado!",
        description: "O produto foi adicionado ao catálogo.",
      });
    }

    setIsDialogOpen(false); // Fecha o modal após a submissão
    setEditingProduct(null); // Limpa o estado
  };


  // --- Renderização Principal ---
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Painel Admin</h1>
            <p className="text-muted-foreground">Gerencie seus produtos</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
            
            {/* Botão simples, abre o modal via estado controlado (isOpen) */}
            <Button onClick={handleOpenNewProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Componente que encapsula o formulário e o modal. 
            Não precisa de DialogTrigger aqui, apenas passa o estado. */}
        <ProductFormDialog
          productToEdit={editingProduct}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleFormSubmit}
        />
        
        {/* Componente que encapsula a listagem e abas */}
        <ProductListSection 
          manager={productManager}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleFeatured={handleToggleFeatured}
        />
      </div>
    </div>
  );
};

export default Admin;