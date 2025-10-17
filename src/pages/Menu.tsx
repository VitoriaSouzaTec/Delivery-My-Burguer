import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductsContext";

const categoryTitles: Record<string, string> = {
  burgers: "Hambúrgueres",
  drinks: "Bebidas",
  sides: "Acompanhamentos",
  combos: "Combos",
};

const Menu = () => {
  const { category = "burgers" } = useParams();
  const { getProductsByCategory } = useProducts();
  const categoryProducts = getProductsByCategory(category);

  const validCategories = ["burgers", "drinks", "sides", "combos"];
  if (!validCategories.includes(category)) {
    return <Navigate to="/menu/burgers" replace />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <CategoryNav />
      
      <section className="py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {categoryTitles[category]}
          </h1>
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum produto disponível nesta categoria no momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
