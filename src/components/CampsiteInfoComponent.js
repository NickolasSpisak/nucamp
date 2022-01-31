import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody }from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import Label from 'reactstrap/lib/Label';
import { Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



const minLength = (length) => (value) => {
    return value > length > 2 ? true : false;
}
const maxLength = (length) => (value) => {
    return value < length > 2 ? false : true;
}




class CommentForm extends Component {
    state= {
        showModal: false,
    };
    submitComment = (values) =>{
        console.log(values);
        this.openModal();
    }
    openModal = () => {
        this.setState ({
            showModal: !this.state.showModal,
        }); 
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
    render() {
        return (
        <div>
           
            <Button outline onClick={this.openModal}><i className="fa fa-pencil fa-lg"/>Submit Comment</Button>
            <Modal isOpen= {this.state.showModal} toggle={this.state.showModal}>
                <ModalHeader toggle={this.openModal}>Header</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.submitComment}>
                    <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                            <Control.select 
                                defaultvalue="1"   
                                id="rating"
                                modal=".rating"
                                name="rating"
                                className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                                <Label htmlFor="author">Your name</Label>
                            <Control.text    
                                id="author"
                                modal=".author"
                                name="author"
                                placeholder="YourName"
                                validators = {{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                                className="form-control"
                            />
                            <Errors className="text-danger" 
                            show="touched"
                            model=".author"
                            component="div"
                            messages={{
                                minLength: "Must be at least 2 characters.",
                                maxLength: "Must be less than 15 characters.",
                            }}/>
                        </div>
                        <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                            <Control.textarea 
                                rows="6"  
                                id="text"
                                modal=".text"
                                name="text"
                                className="form-control"
                            />
                        </div>
                        <Button color= "primary" type="submit">
                        Submit Contnet
                    </Button>
                    </LocalForm>
                    
                </ModalBody>
            </Modal>
        </div>
        )}
}

function RenderCampsite({ campsite }) {
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
            <Card>
                <CardImg src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                  <h4>Comments</h4>
                <Stagger in>
                    {
                        comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <p>
                                            {comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
                 <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
}


function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />    
                </div>
            </div>
        );
    }
}




export default CampsiteInfo;