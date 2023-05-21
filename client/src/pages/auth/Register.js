import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserEmail,
  setUserLoginDetails,
} from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";

const creatOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const Register = () => {
  const [email, setEmail] = useState("");
  const userEmail = useSelector(selectUserEmail);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userEmail !== null) {
      history.push("/");
    }
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const config = {
      url: "https://confused-kilt-newt.cyclic.app/register/complete-registration",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email has been sent to ${email} click on link to complete registration`
    );
    window.localStorage.setItem("emailForRegister", email);
    setEmail("");
  };

  const handleGoogleSubmit = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        let { user } = result;
        console.log(user);
        const idTokenResult = await user.getIdTokenResult();

        creatOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              setUserLoginDetails({
                name: user.displayName,
                email: res.data.email,
                token: idTokenResult.token,
                photo: user.photoURL,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch((err) => console.log(err));

        history.push("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <div className="register">
        <div className="register_container" style={{ height: "24rem" }}>
          <div className="register_background"></div>
          <div className="register_content">
            <h1>Create Account</h1>
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
              Already an User?{" "}
              <Link to="/login" style={{ marginLeft: "0.4rem" }}>
                Login
              </Link>
            </div>

            <div className="register_btn" onClick={handleSubmit}>
              <span>REGISTER</span>
            </div>

            <div className="register_btn2" onClick={handleGoogleSubmit}>
              <span>REGISTER WITH GOOGLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="register_mobile">
        <div className="register_container_mobile2" style={{ height: "24rem" }}>
          <div className="register_background_mobile2"></div>
          <div className="register_content">
            <h1>Create Account</h1>
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
              Already an User?{" "}
              <Link to="/login" style={{ marginLeft: "0.4rem" }}>
                Login
              </Link>
            </div>

            <div className="register_btn" onClick={handleSubmit}>
              <span>REGISTER</span>
            </div>

            <div className="register_btn2" onClick={handleGoogleSubmit}>
              <span>REGISTER WITH GOOGLE</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
