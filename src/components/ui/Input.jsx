export default function Input({ register, name, placeholder, type = "text", errors }) {
  return (
    <>
      <input
        {...register(name, { required: true })}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      {errors?.[name] && <p className="text-red-500 text-sm mt-1">Bu maydon to'ldirilishi shart</p>}
    </>
  );
}