import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../store/slices/authSlice";
import { persistor } from "../store/store";
import { Button } from "antd";

const LogoutButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {

        dispatch(clearCredentials());

        await persistor.purge();

        navigate("/login", {
            replace: true,
        });
    };


    return (
        <Button color="danger" variant="solid" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;