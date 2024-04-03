import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
