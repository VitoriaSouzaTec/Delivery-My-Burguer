import { Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Settings} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Hamburger } from 'lucide-react';


const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <div className="text-xl font-bold text-primary-foreground">
              <Hamburger/>
            </div>
          </div>
          <span className="text-xl font-bold">My Burger</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/menu" className="text-sm font-medium transition-colors hover:text-primary">
            Menu
          </Link>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="whastapp"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contato
          </a>
          
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link to="/admin" aria-label="Admin">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          {/* <Button variant="ghost" size="icon" asChild>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="contato"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button> */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
