

import { Product } from "@/contexts/CartContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star } from "lucide-react";

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onToggleFeatured: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete, onToggleFeatured }: ProductCardProps) {
    return (
        <Card>
            <CardHeader>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                            {product.name}
                            {product.featured && (
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                            {product.description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                    </p>
                    <span className="text-sm text-muted-foreground capitalize">
                        {product.category}
                    </span>
                </div>
                
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onToggleFeatured(product.id)}
                    >
                        <Star className={`h-4 w-4 mr-2 ${product.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        Destaque
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(product)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}