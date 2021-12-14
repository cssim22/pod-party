import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import NewClub from './NewClub.jsx';
import ClubPageContainer from '../containers/ClubPageContainer.jsx';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';

const HomePage = (props) => {

  const [newClub, addNewClub] = useState('');
  const [clubs, setClubs] = useState([]);
  const [email, setEmail] = useState('');
  const [routesArray, setRoutesArray] = useState([]);
  const [clubsArray, setClubsArray] = useState([]);
  const [linksArray, setLinksArray] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  const addClub = () => {

    fetch('/addgroup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_name: newClub
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const copy = [...clubs];
        copy.push(data);
        setClubs(copy);
      })
      .catch((err) => {
        console.log(err);
      });
    // const copy = [...clubs];
    // copy.push(newClub);
    // setClubs(copy);
  };


  const renderClubs = () => {

    const tempRoutesArray = [];
    const tempClubsArray = [];
    const tempLinksArray = [];

    for (const club of clubs) {
      // note: club is now an object with properties, club_id, club_name
      tempRoutesArray.push(
        <Route exact path={`/${club.group_name}`}>
          <ClubPageContainer name={club.group_name} groupId={club.group_id} />
        </Route>);
      tempLinksArray.push(
        <li>
          <Link to={`/${club.group_name}`}>{club.group_name}</Link>
        </li>);
    }
    setRoutesArray(tempRoutesArray);
    setClubsArray(tempClubsArray);
    setLinksArray(tempLinksArray);
  };

  useEffect(() => {
    const cookieEmail = document.cookie.split('; ').find(row => row.startsWith('email='))
      .split('=')[1].replace('%40', '@');
    setEmail(cookieEmail);
  }, []);

  useEffect(() => {
    fetch('/clubs')
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
        return data;
      })
      .catch(res => console.log('Error in getting clubs', res));
  }, []);

  useEffect(() => {
    renderClubs();
  }, [clubs]);

  console.log(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    fetch('club/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({

        newClub
      })
    })
      .then((res) => res.json())
      .catch(res => console.log('Error in sending clubs', res));
  };

  const handleClub = (e) => {
    addNewClub(e.target.value);
  };

  return (

    <div>
      <Box display="flex" justifyContent="center" alignItems="center" style={{ width: '100%' }} color="primary">
        <form id="GroupForm" method="POST" action="/club/add" onSubmit={handleSubmit}>
          <TextField label='club' name='club' variant="outlined" style={{ width: '100%' }} onChange={handleClub}></TextField><br></br>
          <Button type="button" display="flex" justifyContent="center" alignItems="center" variant="outlined" style={{ margin: 20 }} onClick={() => addClub()}>Add Club</Button>
        </form>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Router>
          <ul id="podcasts-list">
            {linksArray}
          </ul>
          <Switch>
            {routesArray}
          </Switch>
        </Router>
      </Box>
    </div>
  );
};

export default HomePage;