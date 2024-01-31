import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {ThemeProvider} from "./components/Themes/theme-provider.tsx";

import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store.ts";

import {Toaster} from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider storageKey="vite-ui-theme">
                    <App />
                    <Toaster position="top-right" richColors />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
