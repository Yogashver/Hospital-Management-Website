import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import "../styles/homepage.css";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <div  class = "lay" >
      <h1 className="bool">Home Page</h1>
      <Row class = "row-style" justify="center"  align="middle">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
