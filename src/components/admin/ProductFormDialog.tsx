// src/components/admin/ProductFormDialog.tsx

import { useState, useEffect } from "react";
// Certifique-se de que os imports de UI estejam corretos
import { Product } from "@/contexts/CartContext"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    // Importamos o DialogTrigger
    DialogTrigger 
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";

// --- Tipagem ---

interface ProductFormData {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
}

const initialFormData: ProductFormData = {
    name: "",
    description: "",
    price: "",
    category: "burgers",
    image: "",
};

interface ProductFormDialogProps {
    productToEdit: Product | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ProductFormData, isEditing: boolean, productId?: string) => void;
}

// --- Componente ---

export function ProductFormDialog({ productToEdit, isOpen, onOpenChange, onSubmit }: ProductFormDialogProps) {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Sincroniza o estado interno do formulário quando o produto a ser editado muda
    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                description: productToEdit.description,
                price: productToEdit.price.toString(),
                category: productToEdit.category,
                image: productToEdit.image,
            });
            setImagePreview(productToEdit.image);
        } else {
            setFormData(initialFormData);
            setImagePreview("");
        }
    }, [productToEdit]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData({ ...formData, image: result });
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (url: string) => {
        setFormData({ ...formData, image: url });
        setImagePreview(url);
    };

    const clearImage = () => {
        setFormData({ ...formData, image: "" });
        setImagePreview("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData, !!productToEdit, productToEdit?.id);
        
    };

    const dialogTitle = productToEdit ? "Editar Produto" : "Novo Produto";
    const submitText = productToEdit ? "Atualizar" : "Criar";

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {/* ✅ CORREÇÃO: DialogTrigger oculto para fornecer o contexto necessário */}
            <DialogTrigger asChild>
                <div className="hidden" />
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>Preencha os dados do produto</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Nome */}
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    
                    {/* Descrição */}
                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    
                    {/* Preço e Categoria */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">Preço (R$)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="category">Categoria</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="burgers">Hambúrgueres</SelectItem>
                                    <SelectItem value="drinks">Bebidas</SelectItem>
                                    <SelectItem value="sides">Acompanhamentos</SelectItem>
                                    <SelectItem value="combos">Combos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    {/* Seção de Imagem */}
                    <div className="space-y-4">
                        <Label>Imagem do Produto</Label>
                        
                        {imagePreview && (
                            <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={clearImage}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="image-file" className="cursor-pointer">
                                    <div className="flex items-center justify-center gap-2 h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors">
                                        <Upload className="h-4 w-4" />
                                        Upload Imagem
                                    </div>
                                </Label>
                                <Input
                                    id="image-file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    id="image-url"
                                    value={formData.image.startsWith("data:") ? "" : formData.image}
                                    onChange={(e) => handleImageUrlChange(e.target.value)}
                                    placeholder="ou Cole URL da imagem"
                                />
                            </div>
                        </div>
                        
                        {!formData.image && (
                            <p className="text-sm text-muted-foreground">
                                Faça upload de uma imagem ou cole a URL
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            {submitText}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}