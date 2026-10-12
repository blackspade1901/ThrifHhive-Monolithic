import { useState } from "react";
import { useItems } from "../hooks/useItems.js";
import { ItemCard } from "../components/ItemCard.jsx";
import { LoadingSpinner } from "../components/LoadingSpinner.jsx";
import { ErrorMessage } from "../components/ErrorMessage.jsx";
import { ITEM_CATEGORIES, SORT_OPTIONS } from "../constants.js";
import "./BrowsePage.css";

export function BrowsePage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const { items, isLoading, error } = useItems({ category, search, sort });

  return (
    <div className="app-shell">
      <h1 className="page-heading">Finds worth a second life</h1>

      <div className="browse-filters">
        <input
          type="search"
          placeholder="Search items…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search items"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {ITEM_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort items">
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <LoadingSpinner label="Fetching finds…" />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && items.length === 0 && (
        <p className="state-message">No items match those filters yet — try widening your search.</p>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="browse-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
