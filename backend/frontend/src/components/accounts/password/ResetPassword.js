import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {resetPassword, checkPasswordToken, login} from "../../../actions/auth";
import { createMessage } from '../../../actions/messages'
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";


class ResetPassword extends Component {

    state = {
        psw_token: this.props.match.params.psw_token,
        new_password: '',
        confirm_password: '',
        resetPasswordError: false
    }

    componentDidMount() {
        this.props.checkPasswordToken(this.state.psw_token)
    }

    onChange = input => e => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
                [input]: e.target.value
            })
    };


    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.new_password !== this.state.confirm_password){
            this.setState({resetPasswordError:true})
        } else if(this.state.new_password=='' | this.state.confirm_password=='') {
            this.setState({resetPasswordError:true})
        } else {
            this.props.resetPassword(this.state.new_password, this.props.user)
        }
    }

    render() {
        const { new_password, confirm_password } = this.state
        if(this.props.passwordChanged){
            this.props.createMessage({passwordReset: 'CONTRASEÑA MODIFICADA'})
            return <Redirect to="/login" />;
        }
        const ShowResetPassword = (
             <div className="col-md-6 m-auto">
                 <div className="card card-body mt-5 text-center">
                         <TextField
                             InputProps={{
                                 readOnly: true,
                             }}
                             label="Email"
                             defaultValue={this.props.user!=null ? this.props.user.email : ''}
                         />
                             <TextField
                                 required
                                 label="Contraseña"
                                 onChange={this.onChange('new_password')}
                                 defaultValue={new_password}
                                 value={new_password}
                                 type="password"
                             />
                             <TextField
                                 required
                                 error={this.state.resetPasswordError}
                                 label="Confirmar contraseña"
                                 onChange={this.onChange('confirm_password')}
                                 defaultValue={confirm_password}
                                 value={confirm_password}
                                 helperText={this.state.resetPasswordError ? 'Las contraseñas no coinciden': ''}
                                 type="password"
                             />
                             <Button variant="contained" color="primary" onClick={this.onSubmit}>
                                 Guardar cambios
                             </Button>
                 </div>
             </div>
        )

        const NotShowResetPassword = (
            <CircularProgress />
        )

        return (
            <Fragment>
                {this.props.passwordTokenValidated ? ShowResetPassword : NotShowResetPassword}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    passwordTokenValidated: state.auth.passwordTokenValidated,
    user: state.auth.user,
    passwordChanged: state.auth.passwordChanged
})

export default connect(mapStateToProps, {resetPassword, login, createMessage, checkPasswordToken})(ResetPassword);