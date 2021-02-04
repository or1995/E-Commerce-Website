import React, {Component, Fragment} from 'react';
import classes from './AuthForm.module.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { clearError } from '../../../../actions/auth';

class AuthForm extends Component {

    render() {
        if(this.props.error) {
            console.log(this.props.error.data);
        }

        if(this.props.isAuthenticated) {
            console.log(this.props.isAuthenticated);
        }

        let errorArr = [];
        if(this.props.error) {
            if(this.props.error.name) {
                errorArr.push(<h3 key="1" className={classes.errorh3}>{`Name: ${this.props.error.name.join()}`}</h3>);
            }
            if(this.props.error.email) {
                errorArr.push(<h3 key="2" className={classes.errorh3}>{`Email: ${this.props.error.email.join()}`}</h3>);
            }
            if(this.props.error.message) {
                errorArr.push(<h3 key="3" className={classes.errorh3}>{`Message: ${this.props.error.message.join()}`}</h3>);
            }
            if(this.props.error.non_field_errors) {
                errorArr.push(<h3 key="4" className={classes.errorh3}>{this.props.error.non_field_errors.join()}</h3>);
            }
            if(this.props.error.username) {
                errorArr.push(<h3 key="5" className={classes.errorh3}>{this.props.error.username.join()}</h3>);
            }
            if(this.props.passworderror) {
                console.log(this.props.passworderror);
                errorArr.push(<h3 key="6" className={classes.errorh3}>{this.props.passworderror}</h3>);
            }
        }
    
        return (
            <div className={classes.authform}>
                <div className={classes.top}>
                    <h1>{this.props.title}</h1>
                </div>
                <div className={classes.middle}>
                    {this.props.children}
                </div>
                <div className={classes.bottom}>
                    <div className={classes.errorsarea}>
                        {errorArr}
                        <h3 className={classes.errorh3}>{this.props.passworderror}</h3>
                    </div>
                    {this.props.title === 'Register' ? 
                        <h3>Have an account already? <Link onClick={this.props.clearError} to='/login'>Login</Link></h3> : 
                        <h3>Don't have an account? <Link onClick={this.props.clearError} to='/register'>Register</Link></h3>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { clearError })(AuthForm);