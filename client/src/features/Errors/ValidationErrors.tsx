import { Fragment } from "react";
import { Message } from "semantic-ui-react";

interface Props {
    errors: string[];
}

export default function ValidationErrors({errors}: Props) {

    return (
        <Message error>
            {errors && (
                <Fragment>
                    {errors.map((err, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Fragment>
            )}
        </Message>
    );
}