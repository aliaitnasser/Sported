import { Fragment } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export function LoadingComponent() {
  return (
    <Fragment>
      <Dimmer active inverted>
        <Loader content="Loading..." />
      </Dimmer>
    </Fragment>
  );
}