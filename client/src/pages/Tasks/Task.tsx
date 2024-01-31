import {useParams} from "react-router-dom";

export default function Task() {
    // get id from query params
    const {id} = useParams();

    // fetch task by id
    // display task details
    return (
        <>
            <h1>Task {id}</h1>
        </>
    );
}
