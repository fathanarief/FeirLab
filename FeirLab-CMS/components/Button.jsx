export default function Button({
  children,
  type = "button",
  variant = "default",
  disabled = false,
  onClick,
  className = "",
}) {
  const variants = {
    default: "btn-neutral",
    outline: "btn-neutral btn-outline",
    ghost: "btn-ghost",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variants[variant] || variants.default} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
