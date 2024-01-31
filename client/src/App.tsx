import "./App.css";

import {Routes, Route} from "react-router-dom";

/* Layout Components */
import DefaultLayout from "./layout/DefaultLayout";
import ProtectedLayout from "./layout/ProtectedLayout";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Task from "./pages/Tasks/Task";
import ErrorPage from "./pages/error-page";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Profile from "./pages/Auth/Profile";

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
                <Route element={<ProtectedLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks/:id" element={<Task />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </>
    );
}
