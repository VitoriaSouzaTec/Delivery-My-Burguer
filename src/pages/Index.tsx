import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CategoryNav from "@/components/CategoryNav";
import { useProducts } from "@/contexts/ProductsContext";
import heroBurger from "@/assets/hero-burger.jpg";

const Index = () => {
  const { getFeaturedProducts, products } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const mostOrdered = featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Burger <span className="text-primary">Premium</span>
                <br />
                Sabor Incomparável
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Hambúrgueres artesanais preparados com ingredientes selecionados. 
                Experimente a combinação perfeita de sabor e qualidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/menu">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ver Menu Completo
                  </Link>
                </Button>
                
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img
                src={heroBurger}
                alt="Premium Burger"
                className="w-full max-w-lg mx-auto animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categoria*/}
      <CategoryNav />

      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mais <span className="text-primary">Pedidos</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira os favoritos dos nossos clientes
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostOrdered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <Link to="/menu">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
