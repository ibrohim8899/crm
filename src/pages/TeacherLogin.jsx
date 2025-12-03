import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../firebase/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function TeacherLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/teacher/dashboard');
    } catch (err) {
      setError('Email yoki parol noto‘g‘ri. Qaytadan urinib ko‘ring.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        {/* Kartochka */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Logo yoki sarlavha */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg className="w-9 h-9 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.4 0-4.6-.78-6.16-2.08L12 14z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Ustoz Kabineti</h2>
            <p className="text-gray-600 mt-2">Jurnallarni boshqarish uchun tizimga kiring</p>
          </div>

          {/* Forma */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email manzil</label>
              <Input
                register={register}
                name="email"
                placeholder="masalan: ustoz@example.com"
                errors={errors}
              />
              {errors.email?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Email kiritish majburiy</p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="text-red-500 text-sm mt-1">Email formati noto‘g‘ri</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parol</label>
              <Input
                register={register}
                name="password"
                type="password"
                placeholder="Kamida 6 ta belgi"
                errors={errors}
              />
              {errors.password?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Parol kiritish majburiy</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500 text-sm mt-1">Parol kamida 6 belgi bo‘lishi kerak</p>
              )}
            </div>

            {/* Umumiy xato */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Kirish tugmasi */}
            <Button type="submit" variant="primary" className="w-full text-lg py-3.5 font-semibold">
              Kirish
            </Button>
          </form>

          {/* Orqaga tugmasi */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-blue-600 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition"
            >
              ← Bosh sahifaga qaytish
            </button>
          </div>
        </div>

        {/* Qo'shimcha ma'lumot */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Muammo bo'lsa admin bilan bog'laning: <span className="text-blue-600">+998 99 123 45 67</span>
        </p>
      </div>
    </div>
  );
}