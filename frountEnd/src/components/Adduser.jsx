import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Adduser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        category_id: '',
        contactNumber: '',
        address: '',
        salary: '',
        image: ''
    });

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category' )
            .then(result => {
                if (result.data.status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name' , user.name);
        formData.append('email' , user.email);
        formData.append('password' , user.password);
        formData.append('category_id' , user.category_id);
        formData.append('contactNumber' , user.contactNumber);
        formData.append('address' , user.address);
        formData.append('salary' , user.salary);
        formData.append('image' , user.image);
        axios.post('http://localhost:3000/auth/adduser', formData)
            .then(result => {
                console.log('User added successfully');
                // Clear the form after successful submission if needed
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    category_id: '',
                    contactNumber: '',
                    address: '',
                    salary: '',
                    image: ''
                });
            })
            .catch(err => {
                console.error('Error adding user:', err);
            });
    }
    

    return (
        <div className='d-flex justify-content-center align-items-center mt-2 '>
            <div className='p-5 rounded w-70 border loginForm' style={{ backgroundColor: 'rgb(103, 231, 135)' }}>
                <h2><center>Add User</center></h2>
                <form className='row g-2' onSubmit={handleSubmit}>
                    <div className='col-13'>
                        <label htmlFor="insertName" className='form-label'>
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder='Enter user Name'
                            id="insertName"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                    <div className='col-13'>
                        <label htmlFor="insertEmail" className='form-label'>
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder='Enter user Email'
                            id="insertEmail"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>
                    <div className='col-13'>
                        <label htmlFor="insertPassword" className='form-label'>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            placeholder='Enter Your Password'
                            id="insertPassword"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <div className='col-13'>
                        <label htmlFor="category" className='form-label'>
                            User category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className='form-select'
                            value={user.category_id}
                            onChange={(e) => setUser({ ...user, category_id: e.target.value })}>
                            <option value="">Select category</option>
                            {category.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-13'>
                        <label htmlFor="insertContact" className='form-label'>
                            Contact Number
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder='Enter User contact Number'
                            id="insertContact"
                            value={user.contactNumber}
                            onChange={(e) => setUser({ ...user, contactNumber: e.target.value })} />
                    </div>
                    <div className='col-13'>
                        <label htmlFor="insertAddress" className='form-label'>
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder='Enter Your Address'
                            id="insertAddress"
                            autoComplete='off'
                            value={user.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })} />
                    </div>
                    <div className='col-13'>
                        <label htmlFor="insertSalary" className='form-label'>
                            User Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder='Enter user salary'
                            id="insertSalary"
                            value={user.salary}
                            onChange={(e) => setUser({ ...user, salary: e.target.value })} />
                    </div>
                    <div className='col-13'>
                        <label htmlFor="inputGroupFile02" className='form-label'>
                            Select Image
                        </label>
                        <input
                            type="file"
                            className="form-control rounded-0"
                            id="inputGroupFile02"
                            name="image"
                            onChange={(e) => setUser({ ...user, image: e.target.files[0] })} />
                    </div>
                    <div className='col-13'>
                        <button type="submit" className='btn btn-success w-120'>Add User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Adduser;
