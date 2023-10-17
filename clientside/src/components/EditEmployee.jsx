import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const {id} = useParams();
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      let response = await axios.get("http://localhost:8000/auth/category");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeeById = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/auth/employee/" + id
      );
      const {name, email, address, salary, category_id} = response.data.data[0];
      setEmployee({...employee, name, email, address, salary, category_id});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchEmployeeById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee.category_id);
    try {
      let response = await axios.put(
        "http://localhost:8000/auth/edit_employee/" + id,
        employee
      );

      if (response.data.status) {
        navigate("/dashboard/employee");
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75 mt-5">
      <div className="p-3 rounded w-50 border">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              value={employee.name}
              className="form-control rounded-0"
              onChange={(e) => setEmployee({...employee, name: e.target.value})}
            />
          </div>

          <div className="col-12">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={employee.email}
              onChange={(e) =>
                setEmployee({...employee, email: e.target.value})
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="">Salary</label>
            <input
              type="text"
              name="salary"
              placeholder="Enter Salary"
              value={employee.salary}
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({...employee, salary: e.target.value})
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="">Address</label>
            <input
              type="text"
              name="address"
              placeholder="1234 Main St"
              value={employee.address}
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({...employee, address: e.target.value})
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="">Category</label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({...employee, category_id: e.target.value})
              }>
              {category?.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary w-100 rounded mb-2" type="submit">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
