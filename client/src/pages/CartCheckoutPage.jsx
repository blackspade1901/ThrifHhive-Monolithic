import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { CartRow } from "../components/CartRow.jsx";
import { ordersApi } from "../api/orders.js";
import { PAYMENT_METHODS } from "../constants.js";
import "./CartCheckoutPage.css";

const initialForm = {
  buyerName: "",
  buyerEmail: "",
  shippingAddress: "",
  paymentMethod: "card"
};

export function CartCheckoutPage() {
  const { items, removeItem, total, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const order = await ordersApi.checkout({
        ...form,
        itemIds: items.map((item) => item._id)
      });
      setConfirmedOrder(order);
      clearCart();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmedOrder) {
    return (
      <div className="app-shell">
        <div className="order-confirmation">
          <h1 className="page-heading">Order confirmed 🎉</h1>
          <p>
            Thanks, {confirmedOrder.buyerName}! Your order totaling{" "}
            <strong>${confirmedOrder.totalAmount}</strong> has been placed.
          </p>
          <ul className="order-confirmation-list">
            {confirmedOrder.items.map((line) => (
              <li key={line.item}>
                {line.title} — ${line.priceAtPurchase}
              </li>
            ))}
          </ul>
          <Link to="/" className="btn btn-primary">
            Keep browsing
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="app-shell">
        <h1 className="page-heading">Your cart</h1>
        <p className="state-message">
          Your cart is empty. <Link to="/">Go find something worth saving.</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <h1 className="page-heading">Your cart</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <CartRow key={item._id} item={item} onRemove={removeItem} />
          ))}
        </div>

        <div className="checkout-panel">
          <div className="checkout-total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                required
                value={form.buyerName}
                onChange={(e) => updateField("buyerName", e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                required
                value={form.buyerEmail}
                onChange={(e) => updateField("buyerEmail", e.target.value)}
              />
            </label>
            <label>
              Shipping address
              <textarea
                required
                rows={3}
                value={form.shippingAddress}
                onChange={(e) => updateField("shippingAddress", e.target.value)}
              />
            </label>
            <label>
              Payment method
              <select
                value={form.paymentMethod}
                onChange={(e) => updateField("paymentMethod", e.target.value)}
              >
                {PAYMENT_METHODS.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </label>

            {submitError && <p className="state-message error">{submitError}</p>}

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Placing order…" : "Place order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
