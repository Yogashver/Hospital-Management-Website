import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
        
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="form-container  ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login Form</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        
        
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <Link to="/register" className="mi">
        <span className="ml-2">Not a user?</span>
              <span className="ml-3"> Register here</span>
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
  );
};

export default Login;
