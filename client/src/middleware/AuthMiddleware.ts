import { PropsWithChildren } from "react";

import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

const AuthMiddleware = ({ children }: ProtectedRouteProps) => {
  // check users
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false || user === null) {
      navigate("/");
    }
  }, [isAuthenticated, user]);

  // return children; // return layout
  return isAuthenticated && user ? children : null;
};

export default AuthMiddleware;
