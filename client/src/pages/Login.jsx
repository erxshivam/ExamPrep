import React, { useState } from "react";
import axios from "axios";
import loginImage from "../assets/images/login1.png";
import { Link } from "react-router";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // Normal Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/examinee/login",
        data
      );

      if (res.data.message === "Login Successfully") {

        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);

        window.location.href = "/userdash/";

      } else {

        alert("Invalid credentials");

      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  // Google Login
  const googleLogin = async () => {

    try {

      // Always ask Gmail selection
      provider.setCustomParameters({
        prompt: "select_account"
      });

      // Firebase popup
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Send to backend
      const res = await axios.post(
        "http://localhost:5000/api/examinee/google-login",
        {
          name: user.displayName,
          email: user.email
        }
      );

      // Save data
      localStorage.setItem("userRole", "user");

      localStorage.setItem(
        "userEmail",
        res.data.user.email
      );

      localStorage.setItem(
        "userName",
        res.data.user.name
      );

      // REAL MongoDB ID
      localStorage.setItem(
        "userId",
        res.data.user._id
      );

      localStorage.setItem(
        "googleUser",
        "true"
      );

      // Redirect
      window.location.href = "/userdash/";

    } catch (error) {

      console.log(error);

      alert("Google Login Failed");

    }

  };

  const styles = {

    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
      fontFamily: "Segoe UI, sans-serif"
    },

    card: {
      width: "900px",
      height: "520px",
      display: "flex",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      backgroundColor: "#fff"
    },

    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    },

    subheading: {
      color: "#d4a3ffff",
      fontSize: "30px"
    },

    welcomeText: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#9582bcff"
    },

    subText: {
      fontSize: "15px",
      opacity: 0.9,
      textAlign: "center"
    },

    rightPanel: {
      flex: 1,
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    },

    formBox: {
      width: "100%",
      maxWidth: "300px"
    },

    heading: {
      fontSize: "40px",
      fontWeight: "600",
      borderBottom: "4px solid",
      color: "#4a0b65ff",
      display: "inline-block"
    },

    label: {
      fontSize: "15px",
      fontWeight: "500"
    },

    input: {
      width: "100%",
      padding: "10px 8px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      marginBottom: "10px",
      outline: "none"
    },

    submitBtn: {
      width: "100%",
      padding: "11px",
      border: "none",
      borderRadius: "6px",
      background: "linear-gradient(to right, #3a0451ff, #7827c0ff)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "10px",
      marginTop: "5px"
    },

    googleBtn: {
      width: "100%",
      padding: "11px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      background: "#fff",
      color: "#000",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px"
    },

    checkbox: {
      marginTop: "8px",
      fontSize: "13px"
    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        {/* Left */}
        <div style={styles.leftPanel}>

          <img
            src={loginImage}
            alt="Login"
            style={{
              width: "340px"
            }}
          />

          <div style={styles.subheading}>
            Welcome to Examprep!
          </div>

          <div style={styles.welcomeText}>
            Your Journey Starts Here
          </div>

          <div style={styles.subText}>
            Login to view your exams,
            results and profile.
          </div>

        </div>

        {/* Right */}
        <div style={styles.rightPanel}>

          <form
            onSubmit={handleSubmit}
            style={styles.formBox}
          >

            <div style={{ textAlign: "center" }}>

              <div style={styles.heading}>
                User Login
              </div>

            </div>

            <br />

            <label style={styles.label}>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleChange}
              value={data.email}
              style={styles.input}
            />

            <label style={styles.label}>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
              onChange={handleChange}
              value={data.password}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.submitBtn}
            >
              Login
            </button>

            <button
              type="button"
              onClick={googleLogin}
              style={styles.googleBtn}
            >

              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
                style={{
                  width: "20px",
                  height: "20px"
                }}
              />

              Continue with Google

            </button>
            <div
  style={{
    textAlign: "center",
    marginTop: "15px"
  }}
>

  <span
    style={{
      color: "#666",
      fontSize: "14px"
    }}
  >
    Are you an admin?
  </span>

  <Link
    to="/adlogin"
    style={{
      marginLeft: "8px",
      color: "#7e22ce",
      fontWeight: "600",
      textDecoration: "none"
    }}
  >
    Admin Login
  </Link>

</div>

            <div style={styles.checkbox}>

              <input type="checkbox" />

              <label>
                {" "}
                Don't have an account?{" "}
                <Link to="/register">
                  Register here
                </Link>
              </label>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default Login;