import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const LoginSignupGuard = (props) => {
    const authCtx = useContext(AuthContext);
    if(authCtx.isAuthenticated) {
        return <Navigate to="/" />;
    }
    return props.children;
}

export default LoginSignupGuard;