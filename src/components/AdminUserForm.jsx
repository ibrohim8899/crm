import { useForm } from 'react-hook-form';

export default function AdminUserForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Yangi Ustoz Qo'shish</h3>
      <input {...register('name', { required: true })} placeholder="Ism" className="border p-3 mb-4 w-full rounded" />
      {errors.name && <p className="text-red-500 text-sm">Ism majburiy</p>}
      <input {...register('email', { required: true })} placeholder="Email" className="border p-3 mb-4 w-full rounded" />
      {errors.email && <p className="text-red-500 text-sm">Email majburiy</p>}
      <input {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Parol" className="border p-3 mb-4 w-full rounded" />
      {errors.password && <p className="text-red-500 text-sm">Parol kamida 6 belgi</p>}
      <button type="submit" className="bg-green-600 text-white p-3 rounded w-full hover:bg-green-700">Yaratish</button>
    </form>
  );
}