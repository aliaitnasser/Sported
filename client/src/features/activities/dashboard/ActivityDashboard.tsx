import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const { loadingInitial, loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 0) loadActivities();
    }, [loadActivities, activityRegistry.size]);

    if (loadingInitial) return <LoadingComponent content="Loading Activities..." />
    
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                Activity Calender
            </Grid.Column>
        </Grid>
    );
})
