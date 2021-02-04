import React, {Component, Fragment} from 'react';
import classes from './Register.module.css';
import AuthForm from '../AuthForm/AuthForm';
import { connect } from 'react-redux';
import { register } from '../../../../actions/auth';
import Spinner from '../../../Layout/Spinner/Spinner';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        nomatchpass: null
    }

    regStart = () => {
        const { username, email, password, password2} = this.state;
        if(password !== password2) {
           this.setState({
               nomatchpass: "Passwords don't match."
           })
        } else {
            this.setState({
                nomatchpass: null
            })
            this.props.register(username, email, password);
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className={classes.Register}>
                {this.props.isLoading ? <div className={classes.spinnercont}><Spinner/></div> :
                <AuthForm title="Register" passworderror={this.state.nomatchpass}>
                    <input name="username" onChange={this.onChange} type="text" value={this.state.username} placeholder="Username"/>
                    <input name="email" onChange={this.onChange} type="email" value={this.state.email} placeholder="Email"/>
                    <input name="password" onChange={this.onChange} type="password" value={this.state.password} placeholder="Password"/>
                    <input name="password2" onChange={this.onChange} type="password" value={this.state.password2} placeholder="ReEnter Password"/>
                    <button onClick={this.regStart}>Register</button>
                </AuthForm>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.auth.regError,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { register })(Register);