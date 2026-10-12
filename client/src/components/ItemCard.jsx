import { Link } from "react-router-dom";
import "./ItemCard.css";

export function ItemCard({ item }) {
  return (
    <Link to={`/items/${item._id}`} className="item-card">
      <div className="item-card-image-wrap">
        <img src={item.imageUrl} alt={item.title} loading="lazy" />
        <span className={`price-tag ${item.isSold ? "price-tag-sold" : ""}`}>
          <span className="price-tag-hole" aria-hidden="true" />
          {item.isSold ? "Sold" : `$${item.price}`}
        </span>
      </div>
      <div className="item-card-body">
        <h3 className="item-card-title">{item.title}</h3>
        <p className="item-card-meta">
          {item.category} · {item.condition}
        </p>
      </div>
    </Link>
  );
}
