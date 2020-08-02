import React, { Component } from 'react' ;

import { connect } from 'react-redux';
 
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './SignUp.module.css';
import pic1 from '../../assets/images/pic1.png';
// import axios from '../../../axios-orders';
// import axios from 'axios';
import Input from '../../components/UI/Input/Input'; 
import validator from 'validator';
// import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class SignUp extends Component {
    state = {
        signUpForm: {
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email Id'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            mobileNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mobile No.',
                    minLength: 10 ,
                    maxLength: 10
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    minLength: 7 
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    formHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true})
        const formData = {};
        for (let formElementIdentifier in this.state.signUpForm){
            formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
        }
        this.props.onSignUp(formData,this.props.history);
        
    }

    checkValidity(value, rules) {
        
        let isValid = true;
        if (!rules){
            return true;
        }
        if(rules.isEmail){
            if(!validator.isEmail(value)){
                isValid = false;
            }
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event , inputIdentifier) => {
        const updatedSignUpForm = {
            ...this.state.signUpForm
        }
        const updatedFormElement = {
            ...updatedSignUpForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignUpForm[inputIdentifier]=updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedSignUpForm){
            formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({signUpForm: updatedSignUpForm, formIsValid: formIsValid})
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.signUpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }
        let form = (
            <form onSubmit={this.formHandler} >
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        defaultValue={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)} />
                    
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >SIGN UP</Button>  
            </form>
        );
        if (this.props.loading){
            form=<Spinner/>;
        }
        let errorMessage = null;
        
        if(this.props.error) {
            errorMessage = (
                <p style={{color: "#ff2459"}}>{this.props.error.message}</p>
            );
        }
        return (
            <div className={classes.SignUp}>
                <img className={classes.pic1} src={pic1} alt="Colossal"/>
                {errorMessage}
                {form}
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.signUp.loading,
        error: state.signUp.error
        
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (formData,history) => dispatch(actions.signUp(formData,history))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);