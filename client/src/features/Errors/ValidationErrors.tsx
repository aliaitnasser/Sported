import { Fragment } from "react";
import { Message } from "semantic-ui-react";

interface Props {
    errors: any;
}

export default function ValidationErrors({errors}: Props) {

    return (
        <Message error>
            {errors && (
                <Fragment>
                    {errors.map((err: any, i: any) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Fragment>
            )}
        </Message>
    );
}