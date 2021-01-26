import React, {Component} from 'react';
import StudentsTable from "./StudentsTable";
import AdminNavbar from "./AdminNavbar";
import CssBaseline from "@material-ui/core/CssBaseline";

class DashboardAdmin extends Component {
    
    render() {
        return (
            <div>
                <CssBaseline />
                <AdminNavbar />
                <StudentsTable />
            </div>
        );
    }
}

export default DashboardAdmin;