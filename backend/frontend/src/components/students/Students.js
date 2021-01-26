import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStudents, deleteStudent } from '../../actions/students';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";


export class Students extends Component {

     constructor(props) {
        super(props);
        this.props.getStudents(this.props.user.extendedUser.id);
    }

    static propTypes = {
        students: PropTypes.array.isRequired,
        getStudents: PropTypes.func.isRequired,
        deleteStudents: PropTypes.func.isRequired,
    }


    render(){
        return(
            <div className="container">
            <div className="card card-body mt-4 mb-4">
                <h1 className="text-center">Estudiantes registrados</h1>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Apellidos</TableCell>
                        <TableCell align="right">Colegio</TableCell>
                        <TableCell align="right">Curso</TableCell>
                        <TableCell align="right">Contacto tutor</TableCell>
                        <TableCell align="right">Code</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell component="th" scope="row">
                            {student.id}
                          </TableCell>
                          <TableCell align="right">{student.name}</TableCell>
                          <TableCell align="right">{student.surname}</TableCell>
                          <TableCell align="right">{student.school.nombre}</TableCell>
                          <TableCell align="right">{student.grade.name}</TableCell>
                          <TableCell align="right">{student.tutor.user.username}</TableCell>
                          <TableCell align="right">{student.log_code}</TableCell>
                          <TableCell align="right">
                              <button
                                  onClick={this.props.deleteStudent.bind
                                  (this, student.id)}
                                  className="btn btn-danger btn-sm">
                                  {"  "}
                                  Eliminar
                              </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
            </div>
        );
     }
}

const mapStateToProps = state => ({
    students: state.students.students,
    user: state.auth
});

export default connect(mapStateToProps, { getStudents, deleteStudent })(Students);