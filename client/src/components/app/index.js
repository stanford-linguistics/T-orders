import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import Documentation from '../documentation';
import Navbar from '../navbar';
import MyTorders from '../myTorders';
import SuFooter from '../suFooter';
import SuHeader from '../suHeader';

const App = () => (
  <div id="torder-main-container">
    <div id="su-wrap">
      <div id="su-content">
        <SuHeader />
        <main>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/documentation" component={Documentation} />
          <Route exact path="/my-t-orders" component={MyTorders} />
        </main>
      </div>
    </div>
    <SuFooter />
  </div>
);

export default App;
