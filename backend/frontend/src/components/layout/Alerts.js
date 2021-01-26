import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps){
        const { error, alert, message } = this.props;
        if(error !== prevProps.error){
           if(error.msg.name)
                alert.error(`Nombre: ${error.msg.name.join()}`); //Join to convert from array to string
           if(error.msg.surname)
                alert.error(`Apellido: ${error.msg.surname.join()}`);
           // if(error.msg.non_field_errors)
           //      alert.error(error.msg.non_field_errors.join());
        }

        if(message !== prevProps.message){
           if(message.deleteStudent)
             alert.success(message.deleteStudent);
           if(message.addStudent)
             alert.success(message.addStudent);
           if(message.passwordNotMatch)
             alert.error(message.passwordNotMatch);
           if(message.UserNotValidated)
               alert.error(message.UserNotValidated);
            if(message.passwordReset)
                alert.success(message.passwordReset)
            if(message.credentialsNeeded)
                alert.error(message.credentialsNeeded)
            if(message.GoogleAccount)
                alert.error(message.GoogleAccount)
            if(message.validationDone)
                alert.success(message.validationDone)
            if(message.testTokenSent)
                alert.success(message.testTokenSent)
            if(message.emailRegistered)
                alert.error(message.emailRegistered)
            if(message.NotValidToken)
                alert.error(message.NotValidToken)
            if(message.notValidEmail)
                alert.error(message.notValidEmail)
            if(message.aulaRegistered)
                alert.error(message.aulaRegistered)
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
   error: state.errors,
   message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));