import { ChangeEvent, useState, useEffect } from 'react';
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { useHistory, useParams, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadActivity} = activityStore;
    const{id} = useParams<{id: string}>()

    
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleSubmit() {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title' name="title" value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name="description" value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name="category" value={activity.category} onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' name="date" value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name="city" value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name="venue" value={activity.venue} onChange={handleInputChange}/>
                <Button content='Submit' floated='right' positive type='submit' loading={loading} />
                <Button as={Link} to="/activities" content='Cancel' floated='right' type='button' />
            </Form>
        </Segment>
    )
})