export default function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    admin: "bg-purple-600 hover:bg-purple-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}