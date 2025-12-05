import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { subscribeToTeacher, updateTeacherJournal } from '../firebase/firestore';
import JournalTable from '../components/JournalTable';
import ClassList from '../components/ClassList';
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function TeacherDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ name: '', journals: [], classes: [], classTimes: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) subscribeToTeacher(user.uid, setData);
  }, [user]);

  const handleJournalUpdate = (newJournals) => updateTeacherJournal(user.uid, newJournals);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ustoz Kabineti: {data.name}</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Chiqish</button>
      </div>
      <JournalTable journals={data.journals} onUpdate={handleJournalUpdate} />
      <ClassList classes={data.classes} classTimes={data.classTimes} />
    </div>
  );
}