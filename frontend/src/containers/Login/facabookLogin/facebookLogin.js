import React from 'react';
import Button from "@material-ui/core/Button";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {useDispatch} from "react-redux";
import {loginFacebook} from "../../../store/action/usersActions";

const FacebookLoginButton = (props) => {
    const dispatch = useDispatch();
    const callback = (facebookData) => {
        if (facebookData.id !== 'unknown') {
            dispatch(loginFacebook(facebookData))
        }
    };
    return <Button>
        <FacebookLogin
            appId="633834247194808"
            callback={callback}
            fields='picture, name'
            render={renderProps => (
                <span onClick={renderProps.onClick}>{props.icon}</span>
            )}/>
    </Button>
};

export default FacebookLoginButton;