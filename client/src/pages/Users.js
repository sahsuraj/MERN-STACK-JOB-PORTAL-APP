import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Layout from "../components/Layout/Layout";
import { GET_ALL_USER } from "../utils/constant";
import AllUser from "../components/AllUser";
import ReactPaginate from "react-paginate";
import Spinner from "../components/shared/Spinner";
import { Button, Modal, Form } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState("");
  const selectRef = useRef();
  const [pageCount, setPageCount] = useState(1);
  const [sorts, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const userArray = {
    totalUsers: users.totalUsers,
    pageCount: users.pageCount,
    results: {}
  };
  //redux state
  const { loading } = useSelector((state) => state.alerts);

  const getAllUsers = async () => {
    try {
      dispatch(showLoading());
      //GET API REQUEST
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        token: localStorage.getItem("token")
      };
      const PARAMS = {
        sort: sorts,
        search: search,
        page: currentPage,
        limit: 5
      };

      await axios
        .get(GET_ALL_USER, {
          params: PARAMS,
          headers
        })
        .then((res) => {
          setUsers(res.data);
          setPageCount(res.data.pageCount);
        })
        .catch((err) => {
          console.log(err.message);
        });
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleSort = () => {
    const selectedProperty = selectRef.current.value;
    setSortOrder(selectedProperty);
  };

  //function for search
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageClick = (e) => {
    setcurrentPage(e.selected + 1);
  };

  //callback function from child
  const getRemoveCallBackFrmChild = (data) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    dispatch(showLoading());

    if (isConfirmed) {
      const deletedResults = users.users.filter((prod) => prod._id !== data);
      if (deletedResults) {
        userArray.totalUsers = users.totalUsers - 1;
        userArray.users = deletedResults;
        //set api to remove this selected user form APIS
      }
      setUsers(userArray);
    }
    dispatch(hideLoading());
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts, search, currentPage, pageCount]);

  const getEditCallBackFrmChild = (data) => {
    setShowEditModal(true);
    setFormData(data);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditUser = (userId) => {
    const updatedUser = users.users.map((user) => {
      if (user._id === userId) {
        return { ...user, ...formData };
      }
      return user;
    });

    userArray.users = updatedUser;
    setUsers(userArray);
    setShowEditModal(false);
  };

  const openAddModal = () => {
    setShowAddModal(true);
    // Reset form values when opening modal
    setFormData({});
  };

  const handleAddUser = () => {
    const newArray = {
      _id: "sfd22424324lklkllj24243",
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      location: formData.location
    };
    userArray.totalUsers = users.totalUsers + 1;
    const addUserData = [...users.users, newArray];
    // Push a new array to the copy
    userArray.users = addUserData;
    //create a API for add user record in database
    setUsers(userArray);
    setShowAddModal(false);
  };
  return (
    <Layout>
      <div className="row p-5">
        <div className="col-sm-6 card  jobcard">
          <div className="container text-center">
            <div className="row align-items-start p-3">
              <div className="col-3">
                <Button variant="primary" onClick={() => openAddModal(true)}>
                  Add User
                </Button>
              </div>

              <div className="col-5">
                <label>
                  Sort By:
                  <select
                    ref={selectRef}
                    onChange={handleSort}
                    defaultValue={sorts}
                    className="job-select"
                  >
                    <option value="latest">Sort by Date (Asc)</option>
                    <option value="oldest">Sort by Date (Desc)</option>
                    <option value="a-z">Sort by Name (Asc)</option>
                    <option value="z-a">Sort by Name (Desc)</option>
                  </select>
                </label>
              </div>
              <div className="col-4">
                <label>
                  Search By Name:
                  <input
                    onChange={handleSearch}
                    value={search}
                    className="job-select"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table " height="300">
              <thead>
                <tr>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Location</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              {loading ? (
                <Spinner />
              ) : (
                <AllUser
                  users={users}
                  handleRemoveCallBack={getRemoveCallBackFrmChild}
                  handleEditCallBack={getEditCallBackFrmChild}
                />
              )}
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
                forcePage={currentPage - 1}
              />
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                text="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditlastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditlocation">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                name="location"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleEditUser(formData._id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Users;
