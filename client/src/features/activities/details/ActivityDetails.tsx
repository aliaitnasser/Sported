import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebare from './ActivityDetailsSidebare';


export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity : activity, loadActivity, loadingInitial} = activityStore;

    const{id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadActivity(id);
    }, [id, loadActivity])

    if(loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebare />
            </Grid.Column>
        </Grid>
    );
})
