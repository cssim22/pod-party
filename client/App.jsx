import React from 'react';
import { render } from 'react-dom';
import MainContainer from './containers/MainContainer.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const App = (props) => {

  return (
    <div>
      {/* <Router> */}
      <MainContainer />
      {/* </Router> */}
    </div>
  );
};

export default App;