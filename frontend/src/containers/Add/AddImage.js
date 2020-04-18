import React, {Component} from 'react';
import {Box} from "@material-ui/core";
import "./AddImage.css"
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Form} from "reactstrap";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Label from "reactstrap/es/Label";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {createImage} from "../../store/action/galleryActions";
import Spinner from "../../components/UI/Spinner/Spinner";

class AddImage extends Component {
    state = {
        title: '',
        image: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });

        this.props.createImage(formData);
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
        marginLeft: '40%',
        marginTop: '15px'
    };
    cardHeaderStyle = {
        backgroundColor: '#3f51b5',
        width: '100%%',
        padding: '35px',
        margin: '0 auto',
        boxShadow: '0px 0px 50px 10px rgba(0,0,0,1)',
        createText: {
            display: 'inline-block',
            color: '#fff',
            margin: '0 24%',
            textTransform: 'uppercase',
        },
    };

    render() {
        if (this.props.loading) {
            return (
                <>
                    <Spinner/>
                    <Box style={this.boxStyle} className='fons'/>
                </>
            )
        }
        return (
            <Box style={this.boxStyle} className='fons'>
                <Container>
                    <Grid container>
                        <Grid style={{margin: '0 auto'}} item xs={12} lg={5} sm={10} ml={8}>
                            <Card style={this.cardHeaderStyle} component='div'>
                                <Box style={this.cardHeaderStyle.createText}>
                                    <p>Form create new cocktail</p>
                                </Box>
                                <Card style={this.cardStyle}>
                                    <Form onSubmit={this.submitFormHandler}>
                                        <TextField
                                            required
                                            onChange={this.inputChangeHandler}
                                            style={{marginBottom: '10px', width: '100%'}}
                                            name='title'
                                            type='text'
                                            label="Title"
                                            variant="filled"
                                        />
                                        <hr/>
                                        <FormGroup>
                                            <Label htmlFor='image'>Image</Label>
                                            <TextField
                                                required
                                                onChange={this.fileChangeHandler}
                                                style={{marginBottom: '10px', width: '100%'}}
                                                name='image'
                                                type='file'
                                                id='image'
                                            />
                                        </FormGroup>
                                        <Grid>
                                            <Button style={this.buttonStyle} type="submit" color="primary">
                                                Create
                                            </Button>
                                        </Grid>
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
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    createImage: (data) => dispatch(createImage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);