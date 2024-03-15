import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Category = () => {
    const[category ,setCategory]=useState([])

    useEffect(()=>{
         axios.get('http://localhost:3000/auth/category')
         .then(result =>{
          if(result.data.status){
            setCategory(result.data.Result)
          }else{
            alert(result.data.Error)
          }
         }).catch(err => console.log(err))
    },[])
  return (
    <div>
      <div className='px-6 mt-3'>
        <div className='d-flex justify-content-center'>
          <h2>User Category </h2>
        </div>
        <Link to="/dashboard/Addcategory" className='btn btn-success'>Add your category</Link>
        <div className='mt-2'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Category Name</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    category.map(c =>(
                     <tr>
                        <td>{c.name}</td>
                     </tr>
                    ))
                  }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Category;