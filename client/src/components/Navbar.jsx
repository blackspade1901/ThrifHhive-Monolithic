import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import "./Navbar.css";

export function Navbar() {
  const { items } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-wordmark">
          ThriftHive
        </Link>
        <nav className="navbar-links">
          <Link to="/">Browse</Link>
          <Link to="/cart" className="navbar-cart">
            Cart
            {items.length > 0 && <span className="navbar-cart-count">{items.length}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
