import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

class Decision extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sectionStyle = {
            width: "100%",
            height: "400px",
            backgroundImage: "url('static/frontend/images/background-initial.png')"
        };


        return (
            <div className="row" >
                <div className="col-sm-6">
                    <div className="card card-cascade wider">
                        <div className="view view-cascade overlay">
                            <img className="card-img-top" src={'static/frontend/public/images/decision-register.jpg'}
                                 alt="Card image cap"></img>
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                        </div>

                        <div className="card-body card-body-cascade text-center pb-0">
                            <div className="card-footer text-muted text-center mt-4">
                                <Button href="/#/login" variant="primary" size="lg" block>Tutor</Button>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card card-cascade wider">
                        <div className="view view-cascade overlay">
                            <img className="card-img-top" src={'static/frontend/public/images/decision-test.jpg'}
                                 alt="Card image cap"></img>
                                <a href="#!">
                                    <div className="mask rgba-white-slight"></div>
                                </a>
                        </div>

                        <div className="card-body card-body-cascade text-center pb-0">
                            <div className="card-footer text-muted text-center mt-4">
                               <Button href="/#/check-test-token" variant="primary" size="lg" block>Alumno</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Decision;