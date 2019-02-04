import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import Documentation from '../documentation';
import Navbar from '../navbar';
import MyTorders from '../myTorders';

const App = () => (
  <div className="background-image">
    <main>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/documentation" component={Documentation} />
      <Route exact path="/my-t-orders" component={MyTorders} />
    </main>
  </div>
);

export default App;
