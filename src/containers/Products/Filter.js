import React , {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import validator from 'validator';
import axios from 'axios';
import classes from './Products.module.css';

class Filter extends Component {
    state={
        show : false,
        authorized:false,
        loadingFeatures:false,
        filterform:{},
        formIsValid:false
    }
    componentDidMount(){
        axios.post('http://localhost:3001/getFeatures',{mainCategory: this.props.params.main , subCategory: this.props.params.sub})
            .then(response => {
                const features = response.data.data
                let filterform = {}
                
                features.forEach((feature)=>{
                    let options = [];
                    options.push({
                        value:'',
                        displayValue:"Filter By "+feature.featureName.replace("_"," ")
                    })
                    feature.featureValues.forEach((value)=>{
                        options.push({
                            value:value,
                            displayValue:value
                        })
                    })
                    filterform[feature.featureName+"label"]={
                        elementType:"label",
                        value:feature.featureName.replace("_"," ")

                    }
                    filterform[feature.featureName]={
                        elementType:'select',
                        elementConfig:{
                            options:options
                        },
                        value:'',
                        validation:{
                            required:false
                        },
                        valid:false,
                        touched:false
                    }
                  
                    
                })
                this.setState({
                    loadingFeatures:false,
                    filterform:filterform
                })  
                console.log(filterform)
            })
            .catch( err => {
                console.log(err)
                this.setState({
                    loadingFeatures:false
                })
            })       
    }
    formSubmitHandler = (event) =>{
        event.preventDefault();
        let productFeatures = {}
        for(let feature in this.state.filterform){
            if(this.state.filterform[feature].elementType !== 'label'){
                if(this.state.filterform[feature].value !== ""){
                    productFeatures[feature] = this.state.filterform[feature].value
                }
            }
                
        }
        let formData = {
            mainCategory:this.props.params.main,
            subCategory:this.props.params.sub,
            productFeatures:productFeatures
        }
        console.log(productFeatures)
        this.props.getFilteredProducts(formData)
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
        const updatedForm = {
            ...this.state.filterform
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier]=updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            filterform:updatedForm,
            formIsvalid:formIsValid
        })
    }
    
    render(){
        const formElementsArray = [];
        for (let key in this.state.filterform) {
            formElementsArray.push({
                id: key,
                config: this.state.filterform[key]
            });
        }
        let form = (
            <form onSubmit={this.formSubmitHandler} >
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
                <Button btnType="Danger" >Filter</Button>  
            </form>
        );
        return (
            <div className={classes.FilterDisplay}>
                <b>FILTERS</b>
                <hr/>
                {form}
            </div>
        );
    };
}
// deliveryMethod: {
//     elementType: 'select',
//     elementConfig: {
//         options: [
//             {value: 'fastest' , displayValue: 'Fastest'},
//             {value: 'cheapest' , displayValue: 'Cheapest'}
//         ]
//     },
//     value: 'fastest',
//     validation:{},
//     valid: true
// }
const mapDispatchToProps = dispatch => {
    return {
        getFilteredProducts: (formData) => dispatch(actions.getFilteredProducts(formData))
    }
}

export default connect(null,mapDispatchToProps)(Filter);