import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/user')
            .then(result => {
                if (result.data.status) {
                    setUsers(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:3000/auth/user/${userId}`)
            .then(result => {
                if (result.data.status) {
                   
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='px-6 mt-3'>
            <div className='d-flex justify-content-center'>
                <h2>User List</h2>
            </div>
            <Link to="/dashboard/Adduser" className='btn btn-success'>Add user</Link>
            <div className='mt-2'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
