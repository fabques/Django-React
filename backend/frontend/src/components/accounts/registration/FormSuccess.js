import React, {Component, Fragment} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Grid from "@material-ui/core/Grid";


export class FormSuccess extends Component {





    render() {
        return (
            <MuiThemeProvider>
                <Fragment>
                     <div className="col-md-6 m-auto" >
                        <div className="card card-body mt-5">
                             <Grid container justify="center">
                                 <h1> Gracias por registrarse</h1>
                                 <p>{this.props.values.external_account == 'Aula' ? 'Por favor, valide la cuenta desde su correo' : ''}</p>
                             </Grid>
                        </div>
                     </div>
                </Fragment>
            </MuiThemeProvider>
    );
    }
    }


export default FormSuccess;