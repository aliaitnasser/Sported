import { useState, useEffect } from 'react';
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { useHistory, useParams, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import { Activity } from '../../../app/models/activity';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOption } from '../../../app/common/options/categoryOption';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadActivity} = activityStore;
    const{id} = useParams<{id: string}>()

    
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required('Venue is required'),
        city: Yup.string().required('City is required')
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
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

    return(
        <Segment clearing>
            <Header content="Activity Details" sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput placeholder='Title' name='title' />
                        <MyTextArea rows={3} placeholder='Description' name="description"/>
                        <MySelectInput options={categoryOption} placeholder='Category' name="category"/>
                        <MyDateInput
                            placeholderText='Date'
                            name="date"
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content="Location Details" sub color='teal' />
                        <MyTextInput placeholder='City' name="city"/>
                        <MyTextInput placeholder='Venue' name="venue" />
                        <Button
                            disabled={ isSubmitting || !dirty || !isValid }
                            content='Submit' 
                            floated='right' 
                            positive 
                            type='submit' 
                            loading={loading}
                        />
                        <Button as={Link} to="/activities" content='Cancel' floated='right' type='button' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})