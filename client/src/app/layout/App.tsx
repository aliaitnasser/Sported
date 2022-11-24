import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from "uuid";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const[editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios
            .get<Activity[]>("https://localhost:5001/api/activities")
            .then((response) => {
                console.log(response);
                setActivities(response.data);
            });
    }, []);

    // This function passe the selected activity to the state
    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find((x) => x.id === id));
    }

    // this function clears the selected activity from the state
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    //This function handles the opening of the form
    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    //This function handles the closing of the form
    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        activity.id
            ? setActivities([...activities.filter((x) => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter((x) => x.id !== id)]);
    }

    return (
        <Fragment>
            <NavBar openForm={handleFormOpen} />
            <Container style={{ marginTop: "5rem" }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    );
}

export default App;
