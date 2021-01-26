import React, {Component, Fragment} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";


export class FormProfileDetails extends Component {


    continue = e => {
        e.preventDefault()
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault()
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props

        const roles = this.props.roles.map(({id,name}) => {
            return {
                value:id,
                label:name
            }
        })



        return (
            <MuiThemeProvider>
                <Fragment>
                     <div className="col-md-6 m-auto" >
                        <div className="card card-body mt-5">
                                <Grid container justify="center">
                                        <FormControl style={{minWidth: 180}}>
                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">Rol</InputLabel>
                                            <Select
                                                name="role"
                                                value={this.props.values.role.value}
                                                onChange={handleChange('role')}
                                            >
                                                {roles.map((role) =>
                                                    <MenuItem value={role.value}>{role.label}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                            <br/>
                            <RaisedButton
                                label="Siguiente"
                                primary={true}
                                style={styles.button}
                                onClick={this.continue}
                            />
                            <RaisedButton
                                label="Atrás"
                                primary={false}
                                style={styles.button}
                                onClick={this.back}
                            />
                        </div>
                     </div>
                </Fragment>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {
        margin:15
    }
}

const mapStateToProps = state => ({
    roles: state.roles.roles
});


export default connect(mapStateToProps)(FormProfileDetails);