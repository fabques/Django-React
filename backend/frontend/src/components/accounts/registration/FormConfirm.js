import React, {Component, Fragment} from 'react';
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux';
import { register } from '../../../actions/auth';
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";


export class FormConfirm extends Component {

    state = {
        privacy: false,
        open: false,
        checked: null,
        isValidated: false
    }

    componentDidMount() {
        if(this.props.values.external_account=='Google'){
                this.setState({isValidated: true})
            }
    }

    continue = e => {
        e.preventDefault()
        if(this.state.checked){
            this.props.nextStep();
            const { email, password1, val_token, external_account, role} = this.props.values;
            const newUser = {
                username: email,
                password: password1,
                email,
                isValidated: this.state.isValidated,
                val_token,
                external_account,
                role
            }
            this.props.register(newUser)
        } else {
            this.setState({checked: false})
        }
    }


    back = e => {
        e.preventDefault()
        this.props.prevStep();
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
    this.setState({open:false});
    };

    handleChange = () => {
        this.setState({checked: !this.state.checked})
    }

    render() {
        const { values: {email, password1, role}} = this.props

        return (
            <MuiThemeProvider>
                <Fragment>
                    <div className="col-md-6 m-auto" >
                        <div className="card card-body mt-5">
                             <Grid container spacing={3}>
                                 <Grid item xs={12} sm={2}></Grid>
                                 <Grid item xs={12} sm={8}>
                                     {this.state.checked==null | this.state.checked ? '' : 'Confirme las condiciones de Uso y Privacidad'}
                                     <List>
                                         <ListItem
                                             primaryText="Email"
                                             secondaryText={email}
                                         />
                                         <ListItem
                                             primaryText="Contraseña"
                                             secondaryText={password1}
                                         />
                                         <ListItem
                                             primaryText="Rol"
                                             secondaryText={role.label}
                                         />
                                     </List>
                                      <Checkbox
                                          checked={this.state.checked}
                                          onChange={this.handleChange}
                                          inputProps={{ 'aria-label': 'primary checkbox' }}
                                      />
                                     <Link onClick={this.handleClickOpen}>Condiciones de Uso y Privacidad</Link>
                                     <Dialog
                                         open={this.state.open}
                                         onClose={this.handleClose}
                                         scroll='body'
                                         aria-labelledby="scroll-dialog-title"
                                         aria-describedby="scroll-dialog-description"
                                     >
                                         <DialogTitle id="scroll-dialog-title">Condiciones de Uso y Privacidad</DialogTitle>
                                         <DialogContent dividers={scroll === 'body'}>
                                             <DialogContentText
                                                 id="scroll-dialog-description"
                                                 tabIndex={-1}
                                             >
                                                 Este es el texto que queremos mostrar con los terminos de privacidad
                                             </DialogContentText>
                                         </DialogContent>
                                     </Dialog>
                                 </Grid>
                                 <Grid item xs={12} sm={2}></Grid>
                             </Grid>
                            <br/>
                            <RaisedButton
                                label="Confirmar registrar"
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
    external_account: state.auth.external_account
})


export default connect(mapStateToProps, {register})(FormConfirm);