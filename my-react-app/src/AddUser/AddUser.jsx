import React, { useState } from "react";
import "./AddUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const AddUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };



  //POST API calling
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", user);
      if (response.status === 200 || response.status === 201) {
        // console.log("User Created successfully");
        toast.success(response.data.message, {position:"top-right"})
        navigate("/");
      } else {
        console.log("User creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        Back <i className="fa-solid fa-backward"></i>
      </Link>

      <h3>Add New User</h3>
      <form className="adduserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
