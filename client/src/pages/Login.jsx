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
        "https://examprep-9ld9.onrender.com/api/examinee/login",
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
      provider.setCustomParameters({
        prompt: "select_account"
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(
        "https://examprep-9ld9.onrender.com/api/examinee/google-login",
        {
          name: user.displayName,
          email: user.email
        }
      );

      localStorage.setItem("userRole", "user");
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("googleUser", "true");

      window.location.href = "/userdash/";
    } catch (error) {
      console.log(error);
      alert("Google Login Failed");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh", // CHANGE: 'height' se 'minHeight' takaki mobile pe scroll ho sake
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)",
      fontFamily: "Segoe UI, sans-serif",
      padding: "20px" // CHANGE: Mobile pe edges se thoda gap rakhne ke liye
    },

    card: {
      width: "100%",       // CHANGE: Fixed 900px ki jagah 100% liya
      maxWidth: "900px",   // CHANGE: Maximum 900px tak bada hoga (desktop ke liye)
      minHeight: "520px",  // CHANGE: 'height' ko 'minHeight' banaya
      display: "flex",
      flexWrap: "wrap",    // CHANGE: Mobile pe panels ko niche shift karne ke liye
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      backgroundColor: "#fff"
    },

    leftPanel: {
      flex: "1 1 300px",   // CHANGE: 300px se chota hone pe yeh wrap ho jayega
      background: "linear-gradient(135deg, #570c78ff, #593a78, #8b44d2ff)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      textAlign: "center"
    },

    subheading: {
      color: "#d4a3ffff",
      fontSize: "30px",
      marginTop: "15px"
    },

    welcomeText: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#9582bcff",
      marginTop: "10px"
    },

    subText: {
      fontSize: "15px",
      opacity: 0.9,
      textAlign: "center",
      marginTop: "10px"
    },

    rightPanel: {
      flex: "1 1 300px",  // CHANGE: Right panel ko bhi same flexibility di hai
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    },

    formBox: {
      width: "100%",
      maxWidth: "350px"  // Thoda bada kiya taki form comfortable dikhe
    },

    heading: {
      fontSize: "35px",  // Mobile pe better fit hone ke liye font size thoda tweak kiya
      fontWeight: "600",
      borderBottom: "4px solid",
      color: "#4a0b65ff",
      display: "inline-block"
    },

    label: {
      fontSize: "15px",
      fontWeight: "500",
      display: "block",
      marginBottom: "5px"
    },

    input: {
      width: "100%",
      padding: "10px 8px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      marginBottom: "15px",
      outline: "none",
      boxSizing: "border-box" // CHANGE: Input padding box ke bahar na nikle
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
      marginTop: "15px",
      fontSize: "14px",
      textAlign: "center"
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
              width: "100%",       // CHANGE: Image ab bahar nahi niklegi
              maxWidth: "300px",   // Maximum width di hai
              height: "auto"
            }}
          />
          <div style={styles.subheading}>Welcome to Examprep!</div>
          <div style={styles.welcomeText}>Your Journey Starts Here</div>
          <div style={styles.subText}>
            Login to view your exams, results and profile.
          </div>
        </div>

        {/* Right */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit} style={styles.formBox}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={styles.heading}>User Login</div>
            </div>

            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleChange}
              value={data.email}
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
              onChange={handleChange}
              value={data.password}
              style={styles.input}
            />

            <button type="submit" style={styles.submitBtn}>
              Login
            </button>

            <button type="button" onClick={googleLogin} style={styles.googleBtn}>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
                style={{ width: "20px", height: "20px" }}
              />
              Continue with Google
            </button>

            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <span style={{ color: "#666", fontSize: "14px" }}>
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
              <label>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#7e22ce", fontWeight: "600", textDecoration: "none" }}>
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