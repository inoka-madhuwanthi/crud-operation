import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addcategory = () => {
    const [category,setCategory]=useState()
    const navigate=useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/addcategory', { category })
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/category');
                } else {
                    alert(result.data.error);
                }
            })
            .catch(err => console.log(err));
    }
    
    
  return (
    <div className='d-flex justify-content-center align-items-center h-90 '>
      <div className='p-5 rounded w-25 border loginForm' style={{backgroundColor:'rgb(103, 231, 135'}}>
        <h2><center>Add User Category</center></h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='category'><strong>Category:</strong></label>
                <input type="text" name='category'  placeholder='Enter user category'
                onChange={(e)=> setCategory(e.target.value) } className='form-control rounded-0'/>
            </div>
            <br></br>

            
        
            <button class name='btn btn-success w-100 rounded-0 mb-2' style={{backgroundColor:'green'}}>Add</button>

            <br></br>
            <br></br>

            
        </form>
      </div>
    </div>
  )
}

export default Addcategory
