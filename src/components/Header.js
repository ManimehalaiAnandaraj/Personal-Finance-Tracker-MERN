import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export default function Header(){
const { user, logout } = useContext(AuthContext);
return (
<header className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 shadow">
<h3 className="text-xl font-semibold">💰 Finance Tracker</h3>
<div>
{user && <span className="mr-4">Hi, {user.name}</span>}
{user && <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">Logout</button>}
</div>
</header>
);
}