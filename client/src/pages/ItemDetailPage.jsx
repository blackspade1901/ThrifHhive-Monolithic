import { useParams, useNavigate } from "react-router-dom";
import { useItem } from "../hooks/useItem.js";
import { useCart } from "../hooks/useCart.js";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";
import { ErrorMessage } from "../components/ErrorMessage.jsx";
import "./ItemDetailPage.css";

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, isLoading, error } = useItem(id);
  const { items: cartItems, addItem } = useCart();

  if (isLoading) return <div className="app-shell"><LoadingSpinner label="Loading item…" /></div>;
  if (error) return <div className="app-shell"><ErrorMessage message={error} /></div>;
  if (!item) return null;

  const isInCart = cartItems.some((cartItem) => cartItem._id === item._id);

  function handleAddToCart() {
    addItem(item);
  }

  function handleBuyNow() {
    addItem(item);
    navigate("/cart");
  }

  return (
    <div className="app-shell">
      <div className="item-detail">
        <img src={item.imageUrl} alt={item.title} className="item-detail-image" />
        <div className="item-detail-info">
          <p className="item-detail-category">
            {item.category} · {item.condition}
          </p>
          <h1 className="item-detail-title">{item.title}</h1>
          <p className="item-detail-price">${item.price}</p>
          <p className="item-detail-description">{item.description}</p>
          <p className="item-detail-lister">Listed by {item.listedBy}</p>

          {item.isSold ? (
            <p className="item-detail-sold-notice">This item has already been sold.</p>
          ) : (
            <div className="item-detail-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? "In cart" : "Add to cart"}
              </button>
              <button type="button" className="btn btn-primary" onClick={handleBuyNow}>
                Buy now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
