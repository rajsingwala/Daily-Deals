import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const config = {
      url: "https://confused-kilt-newt.cyclic.app/login",
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        toast.success(
          `Email has been sent to ${email} click on link to Reset Password`
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="register">
        <div className="register_container">
          <div className="register_background"></div>
          <div className="register_content">
            <h1>Forgot Password</h1>
          </div>
          <div className="register_form">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
            <div className="new_here" style={{ marginTop: "1rem" }}>
              <Link to="/login">BACK</Link>
            </div>
            <div className="register_btn" onClick={handleSubmit}>
              <span>REGISTER</span>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="register_mobile">
        <div className="register_container2_mobile" style={{ height: "22rem" }}>
          <div className="register_background_mobile2"></div>
          <div className="register_content">
            <h1>Forgot Password</h1>
          </div>
          <div className="register_form">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
            <div className="new_here" style={{ marginTop: "1rem" }}>
              <Link to="/login">BACK</Link>
            </div>
            <div className="register_btn" onClick={handleSubmit}>
              <span>REGISTER</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
