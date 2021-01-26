import {AppBar, Box, Divider, IconButton, ListItem, Toolbar, Typography} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {Apps, ArrowBack, AssignmentInd, ContactMail, Home} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MobileLeftMenuSlider from "@material-ui/core/Drawer"
import Drawer from "@material-ui/core/Drawer";

// CSS STYLES
const useStyles = makeStyles(theme =>({
    menuSliderContainer: {
        width: 250,
        background: '#511',
        height: "30rem"
    },

    avatar:{
        display: "block",
        margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13)
    },

    listItem: {
        color: "tan"
    }
}));

const menuItems = [
    {
        listIcon: <Home />,
        listText: "Home"
    },
    {
        listIcon: <AssignmentInd />,
        listText: "Resume"
    },
    {
        listIcon: <Apps />,
        listText: "Portfolio"
    },
    {
        listIcon: <ContactMail />,
        listText: "Contacts"
    }
]


const Navbar = () => {
    const [state, setState] = useState({
        left: false
    })
    const toggleSlider = (slider, open) => () =>{
        setState({...state, [slider]: open});
    }
    const classes = useStyles()
    const sideList = slider => (
        <Box className={classes.menuSliderContainer} component="div">
                <Avatar className={classes.avatar} src="static/frontend/public/images/avatar.jpg" alt="Avatar"/>
                <Divider />
                <List>
                    {menuItems.map((lsItem, key) =>(
                        <ListItem button key={key}>
                            <ListItemIcon className={classes.listItem}>
                                {lsItem.listIcon}
                            </ListItemIcon>
                            <ListItemText className={classes.listItem} primary={lsItem.listText}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
    )
    return (
        <Fragment>
            <Box component="nav">
                <AppBar position="static" style={{background: "#222222"}}>
                    <Toolbar>
                        <IconButton onClick={toggleSlider("left",true)}>
                            <ArrowBack style={{color: "tomato"}} />
                        </IconButton>
                        <Typography variant="h5" style={{color: "tan"}}>
                            Aula Admin
                        </Typography>
                        <Drawer
                        open={state.left}>
                            {sideList("left")}
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    )
}

export default Navbar