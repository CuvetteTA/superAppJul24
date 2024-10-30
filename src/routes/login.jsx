import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { coverPic } from "../data/data";
import styles from "./login.module.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    shareData: false,
    categories: [], // For storing selected categories from the movies genere page
  });

  // ISSUE HERE !!
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    checkbox: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value, // used to toggel the check box value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Name is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      if (formData.shareData) {
        console.log("Login successful");
        saveUser(formData); // For stroing the user data in the local storage
        navigate("/categories");
      }
    } catch (err) {}
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Common pitfall. JSON.stringify is used to convert the object to string
  };

  // Tiem of mounting or the order in which react uses this use effect is very important and is causing flashes in our applicaiton
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // This is not a good idea to put this line here !!!
    if (user) {
      navigate("/categories");
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Left hand side of the login page  */}
      <div className={styles.imageSection}>
        <img className={styles.coverImage} src={coverPic} />
        <div className={styles.imageOverlay}>
          <h1>Discover new things on Superapp</h1>
        </div>
      </div>

      {/* Right hand side of the login page  */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formTop}>
            <h2 className="appName">Super app</h2>
            <p className={styles.formTitle}>Create your new account</p>
          </div>

          {/* Form Fields  */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              // required  // ISSUE HERE (Add some custom validation in this)!!
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
            {/* This is the Error message for the name field  */}
            <div
              style={{
                color: "red",
                height: "15px",
              }}
            >
              {errors.name}
            </div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="UserName"
              required
              className={styles.input}
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="number"
              id="mobile"
              name="mobile"
              placeholder="Mobile"
              required
              className={styles.input}
              value={formData.mobile}
              onChange={handleChange}
            />
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="shareData"
                checked={formData.shareData}
                onChange={handleChange}
              />
              Share my registration data with Superapp
            </label>

            <button type="submit" className={styles.submitButton}>
              SIGN UP
            </button>
          </form>

          {/* Bottom part of the Form  */}
          <p className={styles.termsText}>
            By clicking on Sign up, you agree to Superapp,{" "}
            <a href="#">Terms and Conditions of Use</a>
          </p>
          <p className={styles.privacyText}>
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head to Superapp{" "}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
