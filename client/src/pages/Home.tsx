import { DataTable } from "./Tasks/data-table";
import { Tasks, columns } from "./Tasks/columns";

const Home = () => {
    const data: Tasks[] = [
        {
            id: "1",
            title: "Task 1",
            description: "Description 1",
            status: "TO_DO",
        },
        {
            id: "2",
            title: "Task 2",
            description: "Description 2",
            status: "IN_PROGRESS",
        },
        {
            id: "3",
            title: "Task 3",
            description: "Description 3",
            status: "DONE",
        },
    ];

    return (
        <div className="lg:mx-20 m-4"> 
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Home;
