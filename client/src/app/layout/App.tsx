import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/Errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/Errors/NotFound";
import ServerError from '../../features/Errors/ServerError';
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
    const location = useLocation();
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if(commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        }else{
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    if(!commonStore.appLoaded) return <LoadingComponent content='Loading App...' />

    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar />
            <ModalContainer />
            <Route exact path="/" component={HomePage} />
            <Route
                // this path means that all paths that has something after the slash will be rendered
                path={"/(.+)"}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: "5rem" }}>
                            <Switch>
                                <Route exact path="/activities" component={ActivityDashboard} />
                                <Route path="/activities/:id" component={ActivityDetails} />
                                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                                <Route path="/errors" component={TestErrors} />
                                <Route path="/server-error" component={ServerError} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/register" component={RegisterForm} />
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </>
                )}
            />
        </>
    );
}

export default observer(App);
