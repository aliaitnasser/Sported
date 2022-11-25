import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityList() {
    const [target, setTarget] = useState("");

    const { activityStore } = useStore();
    const { activitiesByDate:activities, selectActivity, loading, deleteActivity } = activityStore;

    function handleActivityDelete( e: SyntheticEvent<HTMLButtonElement>,id: string ) {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>
                                    {activity.city}, {activity.venue}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    floated="right"
                                    content="View"
                                    color="blue"
                                    onClick={() => selectActivity(activity.id)}
                                />
                                <Button
                                    floated="right"
                                    content="Delete"
                                    color="red"
                                    loading={loading && target === activity.id}
                                    name={activity.id}
                                    onClick={(e) =>
                                        handleActivityDelete(e, activity.id)
                                    }
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
});
