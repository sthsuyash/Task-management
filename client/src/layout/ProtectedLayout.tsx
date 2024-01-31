import { Outlet} from "react-router-dom";
import { useAppSelector} from "../hooks/redux-hooks";
import {Navigate} from "react-router-dom";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const ProtectedLayout = () => {
    const basicUserInfo = useAppSelector(state => state.auth.basicUserInfo);

    if (!basicUserInfo) {
        return <Navigate replace to={"/login"} />;
    }

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default ProtectedLayout;
