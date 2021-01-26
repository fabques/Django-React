import React, {Component} from 'react';
import {connect} from "react-redux";
import {checkCode} from "../../actions/test";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class TestSmartick extends Component {

    state = {
        codeSmartick: '',
        test_checked: false,
        testError:false
    }

    onChange = input => e => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ testError: false})
        this.setState({
                [input]: e.target.value
            })
        if(e.target.value.length == 5) {
            this.props.checkCode(e.target.value)
         }
    };

    onSubmit = e =>  {
        if(this.props.testChecked){
            this.setState({test_checked: true})
        } else {
            this.setState({testError: true})
        }
}


    render() {
        const {codeSmartick, test_checked} = this.state;
        if(test_checked){
            return <Redirect to={{
                pathname: "/start-test",
                state: {student: this.props.test_student}
            }}/>
        }
        return (
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Empezar test</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={this.state.testError}
                            label="Codigo Test"
                            onChange={this.onChange('codeSmartick')}
                            value={codeSmartick}
                            helperText={this.state.testError ? 'Token no válido': ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <br/>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary"  onClick={this.onSubmit}>
                            Iniciar test
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                </Grid>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        testChecked: state.tests.testChecked,
        test_student: state.tests.test_student
})

export default connect(mapStateToProps, { checkCode })(TestSmartick);