import { useEffect, useState } from 'react';
import { getAllTeachers } from '../firebase/firestore';
import AdminUserForm from '../components/AdminUserForm';
import { createUser } from '../firebase/auth';
import { createTeacher } from '../firebase/firestore';

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getAllTeachers().then(setTeachers);
  }, []);

  const handleCreate = async (data) => {
    try {
      const newUser = await createUser(data.email, data.password);
      await createTeacher(newUser.user, { name: data.name, journals: [], classes: [], classTimes: [] });
      setTeachers(await getAllTeachers());
    } catch (error) {
      console.error('Yangi ustoz yaratishda xato:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      <AdminUserForm onSubmit={handleCreate} />
      <h2 className="text-2xl mt-8 mb-4">Barcha Ustozlar</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{teacher.name} ({teacher.email})</div>
            <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Kabinetni Ko'rish</button> {/* Add modal or route for view */}
          </li>
        ))}
      </ul>
    </div>
  );
}   