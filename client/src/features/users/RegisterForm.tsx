import { ErrorMessage, Form, Formik } from "formik";
import { Button, ButtonGroup, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from 'mobx-react-lite';
import { useStore } from "../../app/stores/store";
import React from "react";
import * as Yup from 'yup';
import ValidationErrors from '../Errors/ValidationErrors';



export default observer(function RegisterForm()
{
    const {userStore, modalStore} = useStore();

    return(
        <Formik
            initialValues={{ email: "", password: "", username:"", displayName:"", error: null }}
            onSubmit={(values, {setErrors}) => userStore.Register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required(),
                username: Yup.string().required(),
                displayName: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (

                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Sign uo to Sported' color="teal" textAlign="center" />
                    <MyTextInput name="email" placeholder="Email" type="email" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <ErrorMessage 
                        name="error" render={() => 
                        <ValidationErrors errors={errors.error} />} 
                    />
                    <ButtonGroup size="small">
                        <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive fluid content="Register" type="submit" />
                        <Button fluid content="Cancel" onClick={() => modalStore.closeModal()} />
                    </ButtonGroup>
                </Form>
            )}
        </Formik>
    )
})