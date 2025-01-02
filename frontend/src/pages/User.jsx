import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';

function User() {
  const BASE_URL_USER = "http://localhost:8081/api/users";

  const [getAllUsers, setAllUsers] = useState([]);
  const [getCurrentPage, setCurrentPage] = useState("1");
  const [getPageItems, setPageItems] = useState([]);
  const [getErrorMessage, setErrorMessage] = useState();
  const [getSelectedUser, setSelectedUser] = useState({
    identityNo: '',
    name: '',
    surName: '',
    gender: '',
    role: ''
  });
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    loadData();
  }, [getCurrentPage]);

  const loadData = async () => {
    const getData = await axios.get(`${BASE_URL_USER}?page=${getCurrentPage - 1}`);
    setAllUsers(getData.data.content);

    // Page işlemleri
    let items = [];
    for (let index = 1; index <= getData.data.totalPages; index++) {
      items.push(
        <li
          key={index}
          onClick={() => setCurrentPage(index)}
          className={`page-item ${getCurrentPage === index ? "active" : ""}`}
        >
          <a className="page-link" href="#">
            {index}
          </a>
        </li>
      );
    }
    setPageItems(items);
  };

  const saveUser = async (e) => {
    e.preventDefault();  
    const response = await axios.post(BASE_URL_USER, getSelectedUser, {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    });
    const result = response.data; // Auto parse
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
    } else {
      loadData(); // Refresh user list
      clearForm(); // Clear form data
      setErrorMessage(null);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${BASE_URL_USER}/${getSelectedUser.id}`);
      console.log("Delete Response:", response);
      loadData();
      clearForm();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
    setShow(false); // Modalı kapat
  };

  // Event funcs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Clear funcs
  const clearForm = () => {
    setSelectedUser({
      identityNo: '',
      name: '',
      surName: '',
      gender: '',
      role: ''
    });
  };

  const isClear = () => {
    return (
      getSelectedUser.identityNo === '' ||
      getSelectedUser.name === '' ||
      getSelectedUser.surName === '' ||
      getSelectedUser.gender === '' ||
      getSelectedUser.role === ''
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <table className="table table-striped mt-4 table-bordered">
            <thead>
              <tr>
                <th scope="col">Identity No</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Gender</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {getAllUsers.map((data, index) => (
                <tr key={index} onClick={() => { setSelectedUser(data); }}>
                  <th scope="row">{data.identityNo}</th>
                  <th>{data.name}</th>
                  <th>{data.surName}</th>
                  <th>{data.gender}</th>
                  <th>{data.role}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {getPageItems}
            </ul>
          </nav>
        </div>
        <div className="col-sm-4 mt-4">
          {getErrorMessage && (
            <div className="alert alert-danger" role="alert">
              {getErrorMessage}
            </div>
          )}
          <form onSubmit={saveUser}>
            <div className="mb-3">
              <Input
                text="Identity No :"
                name="identityNo"
                type="text"
                placeholder="Enter the Identity No"
                maxLength={11}
                minLength={11}
                value={getSelectedUser.identityNo}
                onChange={handleInputChange}
              />
              <Input
                text="Name :"
                name="name"
                type="text"
                placeholder="Enter the Name"
                maxLength={30}
                minLength={3}
                value={getSelectedUser.name}
                onChange={handleInputChange}
              />
              <Input
                text="Surname :"
                name="surName"
                type="text"
                placeholder="Enter the Surname"
                maxLength={30}
                minLength={3}
                value={getSelectedUser.surName}
                onChange={handleInputChange}
              />
              <Select
                text="Gender :"
                name="gender"
                value={getSelectedUser.gender}
                onChange={handleInputChange}
                option1="MALE"
                option2="FEMALE"
              />
              <Select
                text="Role :"
                name="role"
                value={getSelectedUser.role}
                onChange={handleInputChange}
                option1="STUDENT"
                option2="TEACHER"
              />
            </div>
            <button className="btn btn-primary py-1 px-4" disabled={isClear()} type="submit">
              {getSelectedUser.id ? "Update" : "Create"}
            </button>
            {!isClear() && (
              <>
                <button className="btn btn-danger ms-2 py-1 px-4" type="button" onClick={handleShow}>
                  Delete
                </button>
                <button className="btn btn-success ms-2 py-1 px-4" type="button" onClick={clearForm}>
                  Clear
                </button>
              </>
            )}
          </form>

          {show && (
            <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Deletion</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={handleClose}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this user?</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={handleClose}>
                      Cancel
                    </button>
                    <button className="btn btn-danger" onClick={deleteUser}>
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
