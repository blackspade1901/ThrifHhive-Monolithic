import "./CartRow.css";

export function CartRow({ item, onRemove }) {
  return (
    <div className="cart-row">
      <img src={item.imageUrl} alt={item.title} className="cart-row-image" />
      <div className="cart-row-info">
        <p className="cart-row-title">{item.title}</p>
        <p className="cart-row-meta">
          {item.category} · {item.condition}
        </p>
      </div>
      <p className="cart-row-price">${item.price}</p>
      <button
        type="button"
        className="btn btn-danger-outline"
        onClick={() => onRemove(item._id)}
        aria-label={`Remove ${item.title} from cart`}
      >
        Remove
      </button>
    </div>
  );
}
