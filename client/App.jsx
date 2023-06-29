import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import HeaderContainer from './containers/HeaderContainer.jsx';

// Init func app that returns containers to be rendered on our front-end
const App = () => {
  return (
    <div>
      <HeaderContainer />
      <MainContainer />
    </div>
  );
};

export default App;
