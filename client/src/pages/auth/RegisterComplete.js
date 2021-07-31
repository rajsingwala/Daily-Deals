import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "../../features/user/userSlice";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/user/userSlice";

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

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userEmail !== null) {
      history.push("/");
    }
  }, [userEmail]);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegister"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 character long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegister");

        let user = auth.currentUser;
        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();
        creatOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              setUserLoginDetails({
                name: res.data.name,
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
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register_container2" style={{ height: "24rem" }}>
          <div className="register_background"></div>
          <div className="register_content2">
            <h1>Complete Registration </h1>
          </div>

          <div className="register_form">
            <input value={email} disabled />

            <Input.Password
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ marginTop: "1rem" }}
              autoFocus
            />

            <div className="register_btn" onClick={handleSubmit}>
              <span>REGISTER</span>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="register_mobile">
        <div className="register_container2_mobile" style={{ height: "24rem" }}>
          <div className="register_background_mobile2"></div>
          <div className="register_content2">
            <h1>Complete Registration </h1>
          </div>

          <div className="register_form">
            <input value={email} disabled />

            <Input.Password
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ marginTop: "1rem" }}
              autoFocus
            />

            <div className="register_btn" onClick={handleSubmit}>
              <span>REGISTER</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComplete;
