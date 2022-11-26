import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage(){
    return(
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src="/assets/logo.png" alt='Logo' style={{marginBottom:12}} />
                    Sported
                </Header>
                <Header as='h2' inverted content='Welcome to Sported' />
                <Button as={Link} to='/activities' inverted>
                    Take me to the activities!
                </Button>
            </Container>
        </Segment>
    )
} 