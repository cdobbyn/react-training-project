import React, {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, FormControl, FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';
import {createPost} from '../actions';


class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error} } = field;

        return (
            <FormGroup validationState={touched && error ? 'error': null}>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl type="text" {...field.input} placeholder="poops"/>
                <HelpBlock>{touched ? error : ''}</HelpBlock>
            </FormGroup>
        );
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Link to="/">
                    <Button bsStyle="danger">Cancel</Button>
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if (!values.content) {
        errors.content = "Enter some content please!";
    }


    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumed form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{createPost})(PostsNew)
);