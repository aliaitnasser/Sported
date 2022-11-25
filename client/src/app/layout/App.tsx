import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
    const location = useLocation();
    return (
        <>
            <Route exact path="/" component={HomePage} />
            <Route
                // this path means that all paths that has something after the slash will be rendered
                path={"/(.+)"}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: "5rem" }}>
                            <Route
                                exact
                                path="/activities"
                                component={ActivityDashboard}
                            />
                            <Route
                                path="/activities/:id"
                                component={ActivityDetails}
                            />
                            <Route
                                key={location.key}
                                path={["/createActivity", "/manage/:id"]}
                                component={ActivityForm}
                            />
                        </Container>
                    </>
                )}
            />
        </>
    );
}

export default observer(App);
