import { Fragment } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props{
  content: string
}

export function LoadingComponent({content}: Props) {
  return (
    <Fragment>
      <Dimmer active inverted>
        <Loader content={content} />
      </Dimmer>
    </Fragment>
  );
}