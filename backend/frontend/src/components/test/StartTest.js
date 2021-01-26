import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {createMessage} from "../../actions/messages";
import {Button} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class StartTest extends Component {

    constructor(props) {
        super(props);
        console.log('student', this.props.location.state.student)
        this.state = {list: this.props.location.state.student}
    }



    componentDidMount(props) {
        this.props.createMessage({testTokenSent: "Token correctamente validado"})
    }

    state = {
        list :  []
    }


    render() {
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h1>DATOS DEL ALUMNO</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nombre"
                                value={this.state.list.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}></Grid>
                        <br/>
                        <Grid item xs={12} sm={3}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apellido"
                                value={this.state.list.surname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}></Grid>
                        <br/>
                        <Grid item xs={12} sm={3}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Colegio"
                                value={this.state.list.school.nombre}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}></Grid>
                        <br/>
                        <Grid item xs={12} sm={3}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Curso"
                                value={this.state.list.grade.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}></Grid>
                        <br/>
                        <Grid item xs={12} sm={3}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email (tutor)"
                                value={this.state.list.tutor.user.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}></Grid>
                        <br/>
                    </Grid>
                    <Button href="www.smartick.com" variant="primary" size="lg" block>Iniciar test</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    test_student: state.tests.test_student
});


export default connect(mapStateToProps, {createMessage})(StartTest);