import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edituser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        category_id: '',
        contactNumber: '',
        address: '',
        salary: '',
    });
    const [category, setCategory] = useState([]);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    // Fetch categories when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.status) {
                    setCategory(result.data.Result);
                } else {
                    console.log("Error fetching categories:", result.data.Error);
                }
            })
            .catch(err => console.log("Error fetching categories:", err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/user/'+ id)
            .then(result => {
                const userData = result.data.Result[0];
                setUser({
                    ...user,
                    name: userData.name,
                    email: userData.email,
                    contactNumber: userData.contactNumber,
                    address: userData.address,
                    salary: userData.salary,
                    category_id: userData.category_id
                });
            })
            .catch(err => console.log("Error fetching user details:", err));
    }, [id]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edituser/' + id, user)
            .then(result => {
                if(result.data.status) {
                    setNotification("User details updated successfully");
                    setTimeout(() => {
                        navigate('/dashboard/users');
                    }, 3000); // Navigate after 3 seconds
                } else {
                    setNotification(result.data.Error);
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-2 '>
            <div className='p-5 rounded w-70 border loginForm' style={{ backgroundColor: 'rgb(103, 231, 135)' }}>
                <h2><center>Edit User Details</center></h2>
                {notification && <div className="alert alert-success">{notification}</div>}
                <form className='row g-2' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="insertName" className='form-label'>
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder='Enter user Name'
                            id="insertName"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="insertEmail" className='form-label'>
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder='Enter user Email'
                            id="insertEmail"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange} />
                    </div>
                    
                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'>
                            User category
                        </label>
                        <select
                            name="category_id"
                            id="category"
                            className='form-select'
                            value={user.category_id}
                            onChange={handleInputChange}>
                            <option value=""> Select category</option>
                            {category.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor="insertContact" className='form-label'>
                            Contact Number
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder='Enter User contact Number'
                            id="insertContact"
                            name="contactNumber"
                            value={user.contactNumber}
                            onChange={handleInputChange} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="insertAddress" className='form-label'>
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder='Enter Your Address'
                            id="insertAddress"
                            autoComplete='off'
                            name="address"
                            value={user.address}
                            onChange={handleInputChange} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="insertSalary" className='form-label'>
                            User Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder='Enter user salary'
                            id="insertSalary"
                            name="salary"
                            value={user.salary}
                            onChange={handleInputChange} />
                    </div>
                    
                    <div className='col-12'>
                        <button type="submit" className='btn btn-success w-120'>Update User Details</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edituser;
