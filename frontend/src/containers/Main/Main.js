import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import {deleteImage, getImage} from "../../store/action/galleryActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Modal from "../../components/UI/Modal/Modal";


class Main extends Component {
    state={
        modal: false,
        image: ''
    };
    componentDidMount() {
        this.props.getImage(this.props.match.params.id)
    };

    boxStyle = {
        minHeight: '1080px',
        paddingTop: '80px'
    };
    cardHeaderStyle = {
        backgroundColor: '#fff',
        width: '100%',
        minHeight: '700px',
        padding: '35px',
        margin: '0 auto',
        boxShadow: '0px 0px 50px 10px rgba(0,0,0,1)',
        display: 'flex',
        flexWrap: 'wrap'
    };

    deleteHandler = (id) => {
        this.props.deleteImage(id)
    }
    openImage = (img) => {
        if (typeof img !== 'string'){
            img = this.state.image
        }
        this.setState({modal: !this.state.modal, image: img})
    }
    viewUserHandler = (id) => {
     this.props.history.push('/user/' + id)
    }
    render() {
        if (this.props.loading) {
            return (
                <>
                    <Spinner/>
                    <Box style={this.boxStyle} className='fons'/>
                </>
            )
        }
        return this.props.gallery && (
            <>
                <Box style={this.boxStyle} className='fons'>
                    <Container>
                        <Box style={this.cardHeaderStyle}>
                            {this.props.gallery && this.props.gallery.map(item => (
                                <Card  key={item._id} style={{width: '19%', margin: '5px', maxHeight: '300px'}}>
                                    <CardActionArea>
                                        <CardMedia style={{height: '150px'}}
                                                   image={'http://localhost:5556/uploads/'+item.image}
                                                   title="Contemplative Reptile"
                                                   onClick={() => this.openImage(item.image)}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" component="h4">
                                                {item.user.displayName}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button onClick={() => this.viewUserHandler(item.user._id)} size="small" color="primary">View all user</Button>
                                        {this.props.user && this.props.user._id === item.user._id ? <Button onClick={() => this.deleteHandler(item._id)} size="small" color="primary">Delete</Button> : null}
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Container>
                </Box>
                <Modal openModal={this.state.modal} handlerOpen={this.openImage}>{<img src={'http://localhost:5556/uploads/' + this.state.image} alt=""/>}</Modal>
            </>
        );
    }

}

const mapStateToProps = state => ({
    user: state.users.user,
    gallery: state.imageReducer.gallery,
    error: state.imageReducer.galleryError,
    loading: state.imageReducer.galleryLoading
});

const mapDispatchToProps = dispatch => ({
    getImage: (id) => dispatch(getImage(id)),
    deleteImage: (id) => dispatch(deleteImage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);