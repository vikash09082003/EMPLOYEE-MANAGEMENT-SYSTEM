import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        let response = await axios.get("http://localhost:8000/auth/employee");
        setEmployee(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(
        "http://localhost:8000/auth/delete_employee/" + id
      );

      if (response.data.status) {
        window.location.reload();
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:8000/Images/${e.image}`}
                    alt="img"
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
