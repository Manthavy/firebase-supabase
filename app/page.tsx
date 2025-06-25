'use client';

import { db } from "@/lib/firebase";

import {
        collection,
        addDoc,
        getDocs,
        updateDoc,
        deleteDoc,
        doc,
      } from 'firebase/firestore';

import { useEffect, useState } from 'react';
  type User = {
  id: string;
  name: string;
  age: number;
  gender: string;

};

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [userId, setUserId] = useState('');
    const [updateAge, setUpdateAge] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const usersRef = collection(db, 'users1');
    const addUser = async () => {
      await addDoc(usersRef, { name: 'Lam', age: 31, gender: 'man' });
    fetchUsers();
  };

  const fetchUsers = async () => {
    const snapshot = await getDocs(usersRef);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,...doc.data(),
    })) as User[];
    setUsers(data);
  };

  const handleUpdate = async () => {
    const userDoc = doc(db, 'users1', userId);
    await updateDoc(userDoc, { age: Number(updateAge), name: String(updateName) });
    fetchUsers();
  };

  const handleDelete = async () => {
    const userDoc = doc(db, 'users1', deleteId);
    await deleteDoc(userDoc);
    fetchUsers();
  };

  const handleDeleteUser = async (id: string) => {
    const userDoc = doc(db, 'users1', id);
    await deleteDoc(userDoc);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <main className="p-6 space-y-6 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold">Firestore CRUD Example 
      <a href="/uploadImageFirebase"> <button
        className="bg-purple-500 text-white px-4 py-2 rounded">
          uploadImageFirebase
      </button></a> <a href="/supabase"> <button
        className="bg-purple-500 text-white px-4 py-2 rounded">
          supabase
      </button></a>
      </h1>
    <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2 rounded"> Add User (John Doe)</button>
    <div>
      <h2 className="font-semibold mt-6">📋 Current Users:</h2>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user.id}>
            {user.name} - Age: {user.age} -Gender: {user.gender} (ID: {user.id})
            <button
        onClick={()=>handleDeleteUser(user.id)}
        className="bg-red-500 text-white px-4 py-2 rounded">
          🗑️ Delete User
      </button>
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-2">
      <h2 className="font-semibold mt-6">✏️ Update Age</h2>
      <input
        type="text"
        placeholder="User ID"
        className="border p-2 w-full"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Age"
        className="border p-2 w-full"
        value={updateAge}
        onChange={e => setUpdateAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Name"
        className="border p-2 w-full"
        value={updateName}
        onChange={e => setUpdateName(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        🔄 Update User Age
      </button>
    </div>

    <div className="space-y-2">
      <h2 className="font-semibold mt-6">❌ Delete User</h2>
      <input
        type="text"
        placeholder="User ID"
        className="border p-2 w-full"
        value={deleteId}
        onChange={e => setDeleteId(e.target.value)}
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded">
          🗑️ Delete User
      </button>
      {/* <img src="https://firebasestorage.googleapis.com/v0/b/fullstack-project-c82b3.firebasestorage.app/o/cat.jpg?alt=media&token=59ab78dd-8e29-4d3c-b292-239d85968141" alt="cat" /> */}
    </div>
  </main>

);}