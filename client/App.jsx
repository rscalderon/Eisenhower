import React, { useState } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import HeaderContainer from './containers/HeaderContainer.jsx';

const App = () => {
  const [resetCount, updateResetCount] = useState(0);
  return (
    <div>
      <HeaderContainer setter={updateResetCount} resetCount={resetCount} />
      <MainContainer setter={updateResetCount} resetCount={resetCount} />
    </div>
  );
};

export default App;
