import React, {Fragment} from 'react';
import Main from "./containers/Main/Main";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ButtonAppBar from "./components/UI/Toolbar/ButtonAppBar";
import AddImage from "./containers/Add/AddImage";
import UserGallery from "./containers/UserGallery/UserGallery";


function App() {
    return (
        <Fragment>
            <header>
                <ButtonAppBar/>
            </header>
            <Switch>
                <Route path="/new" exact component={AddImage}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/" exact component={Main}/>
                <Route path="/:id" exact component={Main}/>
                <Route path="/user/:id" exact component={UserGallery}/>
            </Switch>
        </Fragment>
    );
}

export default App;
