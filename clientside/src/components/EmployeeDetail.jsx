import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const {id} = useParams();

  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/employee/detail/" + id
      );
      setEmployee(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleLogout = async () => {
    try {
      let response = await axios.get("http://localhost:8000/employee/logout");
      if (response.data.status) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Employee Management System</h4>
      </div>

      <div>
        <img
          src={`http://localhost:8000/Images/${employee.image}`}
          alt="employee"
          className="emp_det_img"
        />
        <div className="d-flex align-items-center me-2">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {employee.salary}</h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
