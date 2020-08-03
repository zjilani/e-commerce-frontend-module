import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import OTPInput from '../../components/OTPInput/index';
import pic1 from '../../assets/images/pic1.png';
import classes from './Otp.module.css';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Otp extends Component {
    state = {
        otp : '', 
        customerId : '',
        otpSent:null
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
    re_enterOtp = () => {
        this.setState({otpSent: null})
    }
    
    render() {
        let account = "Verify your Account :";
        
        let form =(
            <div className={classes.Otp}>
            <img className={classes.pic1} src={pic1} alt="Colossal"/>
                <p>{account}</p>
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
                <Modal show={this.state.otpSent && (this.props.error === false)} modalClosed={this.re_enterOtp}>
                   <p>Incorrect Otp !!!</p>
                </Modal>
                {form}
                
            </div>
        );

    }
    
}
const mapStateToProps = state => {
    return {
        loading: state.otp.loading,
        error: state.otp.error,
        customerId: state.signUp.customerId || state.auth.customerId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOtpInput: (otp,customerId,history) => dispatch(actions.otpVerification(otp,customerId,history)),
        otpViaMail: (customerId) => dispatch(actions.otpByMail(customerId))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Otp,axios));
