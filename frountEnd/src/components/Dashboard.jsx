// Dashboard.jsx
// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className=" colum col-auto col-md-4 col-xl-3 px-sm-4 px-0 " style={{ backgroundColor: 'black' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-5 pt-4 text-white min-vh-100">
            <Link to="/dashboard" className="d-flex align-items-center pb-5 mb-md-3 mt-md-4 me-md-auto text-white text-decoration-none">
              <span className="fs-2 fw-bolder d-none d-sm-inline" style={{ fontFamily:'sans-serif', color:'purple' }}>Admin Area</span>
            </Link>

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="w-150">
                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-150">
                <Link to="/dashboard/users" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-people ms-2"></i>
                  User Management
                </Link>
              </li>
              <li className="w-150">
                <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">User categories</span>
                </Link>
              </li>
              <li className="w-150">
                <Link to="/dashboard/addEvents" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Add User Events</span>
                </Link>
              </li>
              <li className="w-150">
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-2 m-4">
          <div className=" p-4 d-flex justify-content-center shadow " style={{backgroundColor:'lightblue'}}>
            <h4>User Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
