import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import './App.css';

function App() {
  const[activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:5001/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, [])

  return (
    <div className="App">
      <Header as="h2" icon="users" content="Sported" />
        <List>
          {activities.map((activity: any) => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </List>
    </div>
  );
}

export default App;
