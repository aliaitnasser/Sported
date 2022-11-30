import { ErrorMessage, Form, Formik } from "formik";
import { Button, ButtonGroup, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from 'mobx-react-lite';
import { useStore } from "../../app/stores/store";
import React from "react";
import { Link } from 'react-router-dom';

export default observer(function RegisterForm()
{
    const {userStore} = useStore();

    return(
        <Formik
            initialValues={{ email: "", password: "", username:"", displayName:"", error: null }}
            onSubmit={(values, {setErrors}) => userStore.Register(values).catch(error => 
                setErrors({error: 'Invalid input'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (

                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="email" placeholder="Email" type="email" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <ErrorMessage 
                        name="error" render={() => 
                        <Label color="red" style={{marginBottom: 10}} basic content={errors.error} />} 
                    />
                    <ButtonGroup>
                        <Button loading={isSubmitting} positive fluid content="Register" type="submit" />
                        <Button fluid content="Cancel" as={Link} to='/' />
                    </ButtonGroup>
                </Form>
            )}
        </Formik>
    )
})