import React, {Component, Fragment} from 'react';
import classes from './Login.module.css';
import AuthForm from '../AuthForm/AuthForm';
import { login } from '../../../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../../Layout/Spinner/Spinner';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    loginStart = () => {
        this.props.login(this.state.username, this.state.password);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        
        return (
            <div className={classes.login}>
                {this.props.isLoading ? <div className={classes.spinnercont}><Spinner/></div> :
                <AuthForm title="Login">
                    <input name="username" type="text" onChange={this.onChange} value={this.state.username} placeholder="Username"/>
                    <input name="password" type="password" onChange={this.onChange} value={this.state.password} placeholder="Password"/>
                    <button onClick={this.loginStart}>Login</button>
                </AuthForm>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { login })(Login);