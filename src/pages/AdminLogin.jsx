import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../firebase/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/admin/dashboard');
    } catch {
      setError('Email yoki parol xato');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-gray-600 mt-2">Barcha o'qituvchilarni boshqarish</p>
        </div>

        <form on ui={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              register={register}
              name="email"
              placeholder="Email (masalan: admin@example.com)"
              errors={errors}
            />
          </div>

          <div>
            <Input
              register={register}
              name="password"
              type="password"
              placeholder="Parol"
              errors={errors}
            />
          </div>

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}

          <Button type="submit" variant="admin" className="w-full text-lg">
            Admin sifatida kirish
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/')} className="text-purple-600 hover:underline text-sm">
            ← Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
}