import React, { Fragment } from 'react';
import Form from './Form';
import Students from './Students';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {AppBar} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
    const {children, value, index} = props
    return(
        <div>
            {value===index && (<Fragment>{children}</Fragment>)}
        </div>)
}

export default function Dashboard() {
    const [value, setValue] = React.useState(0)
    const handleTabs = (e, val) => {
        setValue(val)
    }
        return(
            <Fragment>
                <AppBar position="static" >
                <Tabs centered value={value} onChange={handleTabs}>
                    <Tab label="Registro"/>
                    <Tab label="Alumnos"/>
                </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}><Form/></TabPanel>
                <TabPanel value={value} index={1}><Students/></TabPanel>
            </Fragment >
        )
}

