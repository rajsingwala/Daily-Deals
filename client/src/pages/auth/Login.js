import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginDetails } from "../../features/user/userSlice";
import { selectUserEmail } from "../../features/user/userSlice";
import { Link, useHistory } from "react-router-dom";
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

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let intended = history.location.state;

    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      let { user } = result;
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

      if (intended) {
        history.push(intended.from);
      } else {
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSubmit = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        let { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        creatOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              setUserLoginDetails({
                name: user.name,
                email: res.data.email,
                token: idTokenResult.token,
                photo: user.photoURL,
                role: res.data.role,
                _id: res.data._id,
                address: res.data.address,
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
        <div className="register_container2" style={{ height: "30rem" }}>
          <div className="register_background"></div>
          <div className="register_content2">
            <h1>Welcome Back! </h1>
          </div>

          <div className="register_form">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />

            <Input.Password
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ marginTop: "1rem" }}
            />
            <div className="forgot_link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="new_here">
              New Here?{" "}
              <Link to="/register" style={{ marginLeft: "0.4rem" }}>
                SignUp
              </Link>
            </div>
            <div className="register_btn" onClick={handleSubmit}>
              <span>LOGIN</span>
            </div>
            <div className="register_btn2" onClick={handleGoogleSubmit}>
              <span>LOGIN WITH GOOGLE</span>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="register_mobile">
        <div
          className=" register_container2_mobile"
          style={{ height: "30rem" }}
        >
          <div className="register_background_mobile3"></div>
          <div className="register_content2">
            <h1>Welcome Back! </h1>
          </div>

          <div className="register_form">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />

            <Input.Password
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ marginTop: "1rem" }}
            />
            <div className="forgot_link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="new_here">
              New Here?{" "}
              <Link to="/register" style={{ marginLeft: "0.4rem" }}>
                SignUp
              </Link>
            </div>
            <div className="register_btn" onClick={handleSubmit}>
              <span>LOGIN</span>
            </div>
            <div className="register_btn2" onClick={handleGoogleSubmit}>
              <span>LOGIN WITH GOOGLE</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
