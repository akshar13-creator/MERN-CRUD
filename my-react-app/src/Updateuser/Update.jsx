import React, { useEffect, useState } from "react";
import "./Update.css";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Update = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const {id} = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };


  //Get api for gatting data with that id
  useEffect (()=>{
    axios.get(`http://localhost:8000/api/user/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
        
    })
  },[id])


  //Updating the User
  //PUT API calling
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
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

      <h3>Update User</h3>
      <form className="adduserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            value={user.name}
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
            value={user.email}
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
            value={user.address}
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
