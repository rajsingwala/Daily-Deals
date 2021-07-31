import React, { useState } from "react";
import { Layout, Input } from "antd";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import AdminSideNav from "./AdminSideNav";
import Admin from "../../components/mobiledash/Admin";

const { Content } = Layout;

const Password = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 length long");
      return;
    }

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.success("Password Updated");
        setPassword("");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="password">
      <Admin />
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="register_container4">
              <div className="register_background"></div>
              <div className="register_content3">
                <h1>Update Password</h1>
              </div>
              <div className="register_form2">
                <Input.Password
                  placeholder="Enter New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoFocus
                />

                <div className="register_btn" onClick={handleSubmit}>
                  <span>UPDATE</span>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      <div className="register_container4_mobile">
        <div className="register_background_mobile"></div>
        <div className="register_content4_mobile">
          <h1>Update Password</h1>
        </div>
        <div className="register_form_mobile">
          <Input.Password
            placeholder="Enter New Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoFocus
          />

          <div className="register_btn" onClick={handleSubmit}>
            <span>UPDATE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
