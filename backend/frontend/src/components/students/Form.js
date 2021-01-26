import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addStudent, getStudents} from '../../actions/students';
import {getGrades, getSchools} from '../../actions/schools';


import TextField from '@material-ui/core/TextField'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {getExtendedUser} from "../../actions/auth";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';


export class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            name: '',
            surname: '',
            grade: {value:'', label:'No records'},
            tutor: '',
            log_code: '',
            postalCode: '',
            school:{value:'', label:'No records'},
            schools:{value:'0', label:'No records'},
            nameError: false,
            surnameError: false,
            postalCodeError: false,
            gradeError: false,
            schoolError: false
        }
         this.props.getExtendedUser(this.props.user.user.id)
    }

    // define the 'local functions' from other modules ??
    static propTypes = {
        addStudent: PropTypes.func.isRequired,
        getSchools: PropTypes.func.isRequired,
        getGrades: PropTypes.func.isRequired
    };

    // keep input in the field
    onChange = input => e => {
        if(input=='school'){
            const label = this.props.schools.filter(school => school.id == e.target.value)
            this.setState({
                    school: e ? e.target.value : '',
                    [input]: {'value':e.target.value, 'label': label[0].nombre}
            });
        } else if(input=='grade') {
            const label = this.props.grades.filter(grade => grade.id == e.target.value)
            this.setState({
                grade: e ? e.target.value : '',
                [input]: {'value':e.target.value, 'label': label[0].nombre}
            });
        } else {
            this.setState({ [e.target.name]: e.target.value })
            this.setState({
                [input]: e.target.value
            })
        }
    };

    onChangePostal = e => {
        const postalCode = e.target.value
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
                ['postalCode']: e.target.value
            })
        if(postalCode.length >= 4){
            this.props.getSchools(e.target.value.toString());
        } else {
            this.state.schools = {value:'0', label:'No records'}
        }
    }


    onSubmit = async e => {
        e.preventDefault();
        const  { name, surname, postalCode} = this.state;
        const tutor = this.props.user.extendedUser.id
        console.log('Tutor', this.props.user.extendedUser)
        const school = this.state.school.value
        const grade = this.state.grade.value
        const randomstring = require("randomstring");
        const log_code =  randomstring.generate({length: 5, charset: 'alphanumeric', capitalization: 'uppercase'});
        const student = { name, surname,  grade, tutor, log_code, school};
        if(name==''){
            this.setState({nameError:true})
        } else if(surname==''){
            this.setState({surnameError:true})
        } else if(postalCode=='') {
            this.setState({postalCodeError:true})
        } else if (this.state.school.value == 0) {
            this.setState({schoolError: true })
        }  else if (this.state.grade.value == 0) {
            this.setState({gradeError: true })
        } else {
            this.props.addStudent(student, this.props.user.extendedUser.id);
            this.setState({
                name: "",
                surname: "",
                grade: {'value': grade , 'label': this.state.grade.label},
                tutor: "",
                log_code: "",
                postalCode: this.state.postalCode,
                school: {'value': school, 'label': this.state.school.label}
            });
        }
    }

    render(){
     const { name, surname, postalCode} = this.state;
     const grades = this.props.grades.map(({id,name}) => {
         return {
             value:id,
             label:name
         }     })
     const schools = this.props.schools.map(({id,nombre}) => {
         return {
             value:id,
             label:nombre
         }
     })

        return(
            <Fragment>
            <MuiThemeProvider>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5 ">
                        <br/>
                            <Grid container justify="center" direction="column">
                            <h1 className="text-center">Registro de alumnos</h1>
                                    <TextField
                                        required
                                        error={this.state.nameError}
                                        label="Nombre"
                                        onChange={this.onChange('name')}
                                        defaultValue={name}
                                        value={name}
                                    />
                                <br/>
                                <TextField
                                    required
                                    error={this.state.surnameError}
                                    label="Apellido"
                                    onChange={this.onChange('surname')}
                                    defaultValue={surname}
                                    value={surname}
                                />
                                <br/>
                                <TextField
                                    required
                                    error={this.state.postalCodeError}
                                    label="Código postal"
                                    onChange={this.onChangePostal}
                                    defaultValue={postalCode}
                                    value={postalCode}
                                    type="number"
                                />
                                  <br/>
                                    <FormControl required style={{minWidth: 180}} disabled={this.state.postalCode.length < 5 ? true : false}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">Colegio</InputLabel>
                                    <Select
                                        name="school"
                                        value={this.state.school.value}
                                        onChange={this.onChange('school')}
                                    >
                                        {schools.map((school) =>
                                            <MenuItem value={school.value}>{school.label}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                  <br/>
                                <FormControl required style={{minWidth: 180}}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">Curso</InputLabel>
                                    <Select
                                        name="grade"
                                        value={this.state.grade.value}
                                        onChange={this.onChange('grade')}
                                    >
                                        {grades.map((grade) =>
                                            <MenuItem value={grade.value}>{grade.label}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <br/>
                                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={this.onSubmit}>
                                    Guardar
                                </Button>
                                </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
        </Fragment>
    )
}
}

const mapStateToProps = state => ({
    schools: state.schools.schools,
    grades: state.schools.grades,
    user: state.auth
});


export default connect(mapStateToProps, { addStudent, getSchools, getGrades, getExtendedUser, getStudents })( Form );