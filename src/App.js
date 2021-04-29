// import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Sell from './components/Sell';
import Search from './components/Search';
import Feature from './components/Feature';
import About from './components/About';
import Blog from './components/Blog';
import Experience from './components/Experience';
import Submitproperty from './components/Submitproperty';
import Loan from './components/Loan';
import Submitoffer from './components/Submitoffer'
import map from './components/googleMap/sample'
import { useEffect, useState } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
// import { ServerCallings } from "./utils/ServerCallings";

function App(props) {
    const location = useLocation();
    const [showFooter, setShowFooter] = useState(true);
    // const isLogedin = localStorage.getItem("id");

    // console.log({ location })
    useEffect(() => {
        if (location.pathname.includes("/admin-dashboard")) setShowFooter(false);
        else setShowFooter(true)
    }, [location])

    // useEffect(() => {
    //     ServerCallings.revive()
    // }, [])

    return (
        <>
            <Header {...props} />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/sell' component={Sell} />
                <Route exact path='/about' component={About} />
                <Route exact path='/search' component={Search} />
                <Route exact path='/feature' component={Feature} />
                <Route exact path='/feature/:id' component={Feature} />
                <Route exact path='/blog' component={Blog} />
                <Route exact path='/experience' component={Experience} />
                <Route exact path='/submit-property' component={Submitproperty} />
                <Route exact path='/loan' component={Loan} />
                <Route exact path='/submit-offer' component={Submitoffer} />
                <Route exact path='/map' component={map} />
                <Redirect exact to='/' />
            </Switch>
            {showFooter && <Footer {...props} />}
        </>
    );
}

export default App;
