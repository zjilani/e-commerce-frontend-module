import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import OTPInput from '../../components/OTPInput/index';
import pic1 from '../../assets/images/pic1.png';
import classes from './Otp.module.css';
import * as actions from '../../store/actions/index';

class Otp extends Component {
    state = {
        otp : '', 
        customerId : '',
        otpSent:false
    }

    componentDidUpdate(){
        // console.log(this.props.otp1 )
    }
    otpHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true , otpSent: true})
        this.props.onOtpInput(this.state.otp,this.state.customerId,this.props.history);
        
    }
    
    sendOTP = () => {
        this.props.otpViaMail(this.props.customerId)
        this.setState({customerId: this.props.customerId})
        
    }
    
    render() {
        let account = "Verify your Account :";
        let verification = null;
        if(this.state.otpSent){
            if(this.props.otpVerified){
                verification = "Verification Successful"
            }else{
                verification = "Incorrect Otp !!!"
            }
        }
        
        
        let form =(
            <div className={classes.Otp}>
            <img className={classes.pic1} src={pic1} alt="Colossal"/>
                <p>{account}</p>
                <p>{verification}</p>
                <Button btnType="Success" clicked={this.sendOTP}>OTP Via Email</Button>
                <Button btnType="Success" disabled>OTP Via SMS</Button>
                <OTPInput
                    length={4}
                    className={classes.OtpContainer}
                    inputClassName="otpInput"
                    isNumberInput
                    autoFocus
                    onChangeOTP={otp => this.setState({otp:otp})}
                />
                <Button btnType="Success" clicked={this.otpHandler}>VERIFY</Button>
            </div>
        );
        if (this.props.loading){
            form=<Spinner/>;
        }
        return(
            <div>
                {form}
            </div>
        );

    }
    
}
const mapStateToProps = state => {
    return {
        loading: state.otp.loading,
        error: state.otp.error,
        customerId: state.signUp.customerId,
        otpVerified: state.otp.otpVerified
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOtpInput: (otp,customerId,history) => dispatch(actions.otpVerification(otp,customerId,history)),
        otpViaMail: (customerId) => dispatch(actions.otpByMail(customerId))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Otp);
