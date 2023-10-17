import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        let response = await axios.get("http://localhost:8000/auth/category");
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("image", employee.image);
    formData.append("category_id", employee.category_id);
    try {
      let response = await axios.post(
        "http://localhost:8000/auth/add_employee",
        formData
      );
      navigate("/dashboard/employee");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75 mt-5">
      <div className="p-3 rounded w-50 border">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
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
              onChange={(e) =>
                setEmployee({...employee, email: e.target.value})
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({...employee, password: e.target.value})
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="">Salary</label>
            <input
              type="text"
              name="salary"
              placeholder="Enter Salary"
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

          <div className="mb-3">
            <label htmlFor="">Select Image</label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({...employee, image: e.target.files[0]})
              }
            />
          </div>

          <button className="btn btn-primary w-100 rounded mb-2" type="submit">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
