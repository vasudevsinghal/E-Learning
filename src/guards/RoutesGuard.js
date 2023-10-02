import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const RoutesGuard = (props) => {
    const authCtx = useContext(AuthContext);
    if(!authCtx.isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return props.children;
}

export default RoutesGuard;