// Logout
import { useEffect } from "react";
import { useHistory } from "react-router";
import store from "../../../Redux/Store";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import notify from "../../../Services/Notify";

function Logout(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        store.dispatch(userLoggedOutAction());
        notify.success("Logged-out successfully.");
        history.push("/login");
    });
    return null;
}

export default Logout;