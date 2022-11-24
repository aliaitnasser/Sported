import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    closeForm: () => void
    activity: Activity | undefined
    createOrEdit: (activity: Activity) => void
    submitting: boolean
}

export default function ActivityForm({closeForm, activity: selectedActivity, createOrEdit, submitting}: Props) {

    const initialFormState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialFormState);

    function handleSubmit() {
        console.log(activity);
        createOrEdit(activity);
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
                <Button content='Submit' floated='right' positive type='submit' loading={submitting} />
                <Button content='Cancel' floated='right' type='button' onClick={closeForm} />
            </Form>
        </Segment>
    )
} 