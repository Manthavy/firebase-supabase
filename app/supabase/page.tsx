'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type User = {
  id: number;
  name: string;
  age: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const image1="https://etsdfbahyovgrjaigrkn.supabase.co/storage/v1/object/public/images//michael-sum-LEpfefQf4rU-unsplash.jpg";

  // ✅ Fetch users
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users:', error.message);
    } else if (data) {
      setUsers(data as User[]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Save or Update user
  const handleSave = async () => {
    if (!name || age === '') return;

    if (selectedId) {
      const { error } = await supabase
        .from('users')
        .update({ name, age })
        .eq('id', selectedId);
      if (error) console.error('Update error:', error.message);
    } else {
      const { error } = await supabase.from('users').insert([{ name, age }]);
      if (error) console.error('Insert error:', error.message);
    }

    setName('');
    setAge('');
    setSelectedId(null);
    fetchUsers();
  };

  // ✅ Delete user
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) console.error('Delete error:', error.message);
    fetchUsers();
  };

  // ✅ Edit user
  const handleEdit = (user: User) => {
    setName(user.name);
    setAge(user.age);
    setSelectedId(user.id);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧑‍💻 Supabase CRUD <a href="/"> <button
        className="bg-purple-500 text-white px-4 py-2 rounded">
          Firebase
      </button></a> <a href="/uploadImageSupabase"> <button
        className="bg-gray-500 text-white px-4 py-2 rounded">
          UpImageSupabase
      </button></a>
         </h1>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={e =>
            setAge(e.target.value === '' ? '' : Number(e.target.value))
          }
          className="border p-2"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {selectedId ? 'Update' : 'Add'}
        </button>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.age}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=''>
          <img className='w-100'  src={image1} alt="des" />
      </div>
      
    </div>
  );
}
