import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">O'quv Markazi</h1>
        <p className="text-xl text-gray-600">Jurnallar avtomatlashtirish tizimi</p>
      </div>

      <div className="space-y-6 w-full max-w-md">
        <Link to="/teacher/login" className="block">
          <Button variant="primary" className="w-full text-lg py-4 shadow-lg">
            Ustoz Kabinetiga kirish
          </Button>
        </Link>

        <Link to="/admin/login" className="block">
          <Button variant="admin" className="w-full text-lg py-4 shadow-lg">
            Admin Panelga kirish
          </Button>
        </Link>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © 2025 O'quv Markazi. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}