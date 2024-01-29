import "./App.css";
import {ThemeProvider} from "./components/theme-provider";

import {Tasks, columns} from "./components/tasks/columns";
import {DataTable} from "./components/tasks/data-table";

import Header from "./components/Header";

function App() {
    const data: Tasks[] = [
        {
            id: "1",
            status: "TO_DO",
            title: "Task 1",
            description: "This is task 1",
        },
    ];

    return (
        <ThemeProvider storageKey="vite-ui-theme">
            <Header />

            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </ThemeProvider>
    );
}

export default App;
