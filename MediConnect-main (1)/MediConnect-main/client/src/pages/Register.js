import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          
          {/* <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button> */}
          
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <Link to="/login" className="mi">
             <span className="ml-2">Already a user?</span>
              <span className="ml-3"> Login here</span>
          </Link>
        </Form>

        <div className="text">
         <h1>YOUR WELL-BEING, </h1>
         <h2>OUR PRIORITY..</h2>
        <p> Experience top-notch healthcare services today. </p>
        <p>From diagnosis to recovery,</p>
        <p>  we're with you every step of the way.</p>
         <p>  Your health, our commitment. </p>
        
        </div>
      </div>
    </>
  );
};

export default Register;
