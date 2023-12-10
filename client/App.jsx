import React from 'react';
import MainContainer from './containers/MainContainer.jsx';
import HeaderContainer from './containers/HeaderContainer.jsx';

// Init func app that returns main containers
const App = () => {
  return (
    <div>
      <HeaderContainer />
      <MainContainer />
    </div>
  );
};

export default App;
