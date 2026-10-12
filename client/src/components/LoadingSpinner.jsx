export function LoadingSpinner({ label = "Loading…" }) {
  return <p className="state-message" role="status">{label}</p>;
}
