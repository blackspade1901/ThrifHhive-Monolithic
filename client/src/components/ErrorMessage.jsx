export function ErrorMessage({ message }) {
  return (
    <p className="state-message error" role="alert">
      Something didn't work: {message}
    </p>
  );
}
