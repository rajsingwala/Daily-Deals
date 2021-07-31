import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { selectUserRole } from "../features/user/userSlice";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const userRole = useSelector(selectUserRole);

  return userRole === "subscriber" ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
