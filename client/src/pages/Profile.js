import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout/Layout";
import { updateUser } from "../redux/features/auth/authSlice";
import { UPDATE_USER } from "../utils/constant";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      name: user ? user.name : "",
      email: user ? user.email : "",
      lastName: user ? user.lastName : "",
      location: user ? user.location : ""
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Local state to manage form input
  /*     const [formData, setFormData] = useState({
            name: user ? user.name : '',
            email: user ? user.email : '',
            lastName: user ? user.lastName : '',
            location: user ? user.location : '',
        });
     */
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch action to update user profile in Redux store
    dispatch(updateUser(formData));
    const PARAMS = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      location: formData.location
    };
    const token = localStorage.getItem("token");
    const response = await axios.put(UPDATE_USER, PARAMS, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response) {
      toast.success("data updated Successfully!");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <form className="card p-2" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              <strong>Location</strong>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={handleChange}
              name="location"
              className="form-control"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
