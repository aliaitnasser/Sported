import { ErrorMessage, Form, Formik } from "formik";
import { Button, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from 'mobx-react-lite';
import { useStore } from "../../app/stores/store";
import React from "react";

export default observer(function LoginForm()
{
    const {userStore} = useStore();

    return(
        <Formik
            initialValues={{ email: "", password: "", error: null }}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (

                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="email" placeholder="Email" type="email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage 
                        name="error" render={() => 
                        <Label color="red" style={{marginBottom: 10}} basic content={errors.error} />} 
                    />
                    <Button loading={isSubmitting} positive fluid content="Login" type="submit" />
                </Form>
            )}
        </Formik>
    )
})