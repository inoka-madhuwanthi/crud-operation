import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css';


const Addcategory = () => {
    const [category, setCategory] = useState('');
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category.trim()) {
            setNotification("Please add your category!.");
            return;
        }
        axios.post('http://localhost:3000/auth/addcategory', { category })
            .then(result => {
                if (result.data.status) {
                    setNotification("Category added successfully!");
                    setTimeout(() => {
                        navigate('/dashboard/category');
                    }, 3000); 
                } else {
                    setNotification(result.data.error);
                }
            })
            .catch(err => console.log(err));
    }
    
    return (
        <div className='d-flex justify-content-center align-items-center h-90 '>
            <div className=' loginForm p-5 rounded w-35 border ' style={{ backgroundColor: 'rgb(103, 231, 135)' }}>
                <h2><center>Add User Category</center></h2>
                {notification && <div className={`alert ${notification === "Category added successfully!" ? "alert-success" : "alert-danger"}`}>{notification}</div>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='category'><strong>Category:</strong></label>
                        <input type="text" name='category' placeholder='Enter user category'
                            onChange={(e) => setCategory(e.target.value)} className='form-control rounded-3' />
                    </div>
                    <br />
                    <button className='btn btn-success w-100 rounded-3 mb-2' style={{ backgroundColor: 'green' }}>Add</button>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}

export default Addcategory;
