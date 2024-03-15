import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate =useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/users")
      .then((response) => {
        if (response.data.status) {
          setUsers(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/deleteuser/' +id)
    .then(result=> {
        if(result.data.status){
            window.location.reload()
        }else {
            alert(result.data.Error)
        }
    })
  };

  return (
    <div className="px-6 mt-3">
      <div className="d-flex justify-content-center">
        <h2>User List</h2>
      </div>
      <Link to="/dashboard/Adduser" className="btn btn-success">
        Add user
      </Link>
      <div className="mt-2">
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Image</th>
              <th>Email Address</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/images/${user.image}`}
                    className="imageemployee"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.salary}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/dashboard/edituser/${user.id}`}
                      className="btn btn-info me-2 btn-"
                    >
                      Edit 
                    </Link>
                    <button
                      className="btn btn-warning btn-"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
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
