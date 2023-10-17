import axios from "axios";
import React, {useEffect, useState} from "react";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);
  const AdminRecords = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/auth/admin_records"
      );
      if (response.data.status) {
        setAdmins(response.data.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const adminCount = async () => {
    try {
      let response = await axios.get("http://localhost:8000/auth/admin_count");
      setAdminTotal(response.data.data[0].admin);
    } catch (error) {
      console.log(error);
    }
  };
  const employeeCount = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/auth/employee_count"
      );
      setEmployeeTotal(response.data.data[0].employee);
    } catch (error) {
      console.log(error);
    }
  };
  const salaryCount = async () => {
    try {
      let response = await axios.get("http://localhost:8000/auth/salary_count");
      setSalaryTotal(response.data.data[0].salary);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {};
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 pt-4">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((e) => (
              <tr>
                <td>{e.email}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">Edit</button>
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

export default Home;
