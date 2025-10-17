import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Hambúrgueres", path: "/menu/burgers" },
  { name: "Bebidas", path: "/menu/drinks" },
  { name: "Acompanhamentos", path: "/menu/sides" },
  { name: "Combos", path: "/menu/combos" },
];

const CategoryNav = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card">
      <div className="container">
        <div className="flex gap-6 overflow-x-auto py-4">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all duration-300",
                location.pathname === category.path
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
