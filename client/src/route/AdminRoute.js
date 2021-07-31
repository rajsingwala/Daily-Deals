import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const currentAdmin = async (authtoken) => {
  return await axios.post(
    `/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const AdminRoute = ({ children, ...rest }) => {
  const userToken = useSelector(selectUserToken);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (userToken !== null) {
      currentAdmin(userToken)
        .then((res) => {
          console.log(res);
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Admin Resource.Access Denied");
          setOk(false);
        });
    }
  }, [userToken]);

  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
