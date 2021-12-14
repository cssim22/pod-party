import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { CreateContext } from 'react';
import LoginContainer from './LoginContainer.jsx';
import ClubPageContainer from './ClubPageContainer.jsx';
import HomePageContainer from './HomePageContainer.jsx';
import LoginPage from '../components/LoginPage.jsx';
import HomePage from '../components/HomePage.jsx';
import PodcastClub from '../components/PodcastClub.jsx';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


// export const UserContext = createContext();

const MainContainer = (props) => {

  return (
    <div>
      <HomePageContainer />
      {/* <Router>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/club">club</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={LoginContainer} />
          <Route path="/home" exact component={HomePageContainer} />
          <Route path='/club/page' exact component={PodcastClub} />
        <Route path="/club" exact component={ClubPageContainer} />
        </Switch>
      </Router> */}
    </div >
  );
};

export default MainContainer;