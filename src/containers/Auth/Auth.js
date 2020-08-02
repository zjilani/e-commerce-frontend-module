import React , {Component} from 'react' ;

import Input from '../../components/UI/Input/Input'; 
import validator from 'validator';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import pic1 from '../../assets/images/pic1.png';

class Auth extends Component {
    state = {
        loginForm: {
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
        // this.setState({ loading: true})
        const formData = {};
        for (let formElementIdentifier in this.state.loginForm){
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        }
        // this.props.onSignUp(formData,this.props.history);
        
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
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier]=updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedLoginForm){
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid})
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
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
                <Button btnType="Success" disabled={!this.state.formIsValid} >LOGIN</Button>  
            </form>
        );
        // if (this.props.loading){
        //     form=<Spinner/>;
        // }
        return (
            <div className={classes.Auth}>
                <img className={classes.pic1} src={pic1} alt="Colossal"/>
                {form}
            </div>
        );
    }
}

export default Auth;