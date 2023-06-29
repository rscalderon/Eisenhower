import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import HeaderContainer from './containers/HeaderContainer.jsx';

// Init func app that accepts props as an arg and returns components to be rendered on our front-end
const App = (props) => {
  return (
    <div>
      <HeaderContainer />
      <MainContainer />
    </div>
  );
};

export default App;
