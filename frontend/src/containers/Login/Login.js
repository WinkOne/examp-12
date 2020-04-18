import React, {Component} from 'react';
import './Login.css';
import '../../App.css';
import FormElement from "../../components/UI/Form/FormElement";
import {Alert, Form} from "reactstrap";
import {loginUser} from "../../store/action/usersActions";
import FacebookLoginButton from './facabookLogin/facebookLogin'
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FacebookIcon from "@material-ui/icons/Facebook";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";


class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.loginUser({...this.state});
    };

    boxStyle = {
        minHeight: '1080px',
        paddingTop: '150px'
    };
    cardStyle = {
        width: '95%',
        margin: '0 auto',
        padding: '25px 25px 25px 25px',
    };
    buttonStyle = {
        marginLeft: '42%',
        marginTop: '15px'
    };
    cardHeaderStyle = {
        backgroundColor: '#3f51b5',
        width: '100%%',
        padding: '35px',
        margin: '0 auto',
        boxShadow: '0px 0px 50px 10px rgba(0,0,0,1)',
        loginText: {
            display: 'inline-block',
            color: '#fff',
            margin: '0 45%',
            textTransform: 'uppercase',
        },
    };
    facebookLoginStyle = {
        width: '100%',
        margin: '10px auto',
    };

    render() {
        return (
            <Box style={this.boxStyle} className='fon'>
                <Container>
                    <Grid container>
                        <Grid style={{margin: '0 auto'}} item xs={12} lg={5} sm={10} ml={8}>
                            <Card style={this.cardHeaderStyle} component='div'>
                                <Box style={this.cardHeaderStyle.loginText}>
                                    <p>Login</p>
                                </Box>
                                <Card style={this.cardStyle}>
                                    <Box>
                                        <ButtonGroup style={this.facebookLoginStyle} aria-label="large outlined button group">
                                            <FacebookLoginButton icon={<FacebookIcon/>}/>
                                        </ButtonGroup>
                                    </Box>
                                    <Form onSubmit={this.submitFormHandler}>
                                        <FormElement
                                            propertyName="username"
                                            title="Username"
                                            value={this.state.username}
                                            onChange={this.inputChangeHandler}
                                            type="text"
                                            autoComplete="current-username"
                                            placeholder="Enter username you registered with"
                                        />
                                        <FormElement
                                            propertyName="password"
                                            title="Password"
                                            value={this.state.password}
                                            onChange={this.inputChangeHandler}
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Enter password"
                                        />
                                        <Box>
                                            {this.props.error && (
                                                <Alert color="danger">{this.props.error.error}</Alert>
                                            )}
                                        </Box>
                                        <Box>
                                            <Button style={this.buttonStyle} type="submit" color="primary">
                                                Login
                                            </Button>
                                        </Box>
                                    </Form>
                                </Card>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.users.loginLoading,
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);