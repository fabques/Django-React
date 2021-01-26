import React, {Component} from 'react';
import { validateUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class Validate extends Component {

    componentDidMount() {
        const val_token = this.props.match.params.validCode
        this.props.validateUser(val_token)
    }

    render() {
        if(this.props.isValidated){
        return <Redirect to="/login" />;
        }

        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Validating...</span>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isValidated: state.auth.isValidated
});


export default connect(mapStateToProps, { validateUser })(Validate);