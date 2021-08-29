import React, {useState} from 'react';
import { Fragment } from 'react';
import './Header.css';
import Logo from './../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Login from './../../auth/Login';
import Register from './../../auth/Register'


//import { makeStyles } from '@material-ui/core/styles';
Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

 // Tabpanel
 function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'} variant={'body2'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const Header = () => {
    // Here are decide whether the modal needs to be one or off
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // This section is used to determine whether the Login or Logout page needs to be shown
    const username = useSelector(state=>state.username);
    let buttonValue;
    if (username === ""){
        buttonValue = "LOGIN";   
    } else {
        buttonValue = "LOGOUT";
    }

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
      }

    // Function that will pop up the modal
    function  displayLoginModal(){
        if (buttonValue === "LOGIN"){
            // set the modalIsOpen to true
            openModal();
        }

    }

    //const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Fragment>
            <div className="header">
                <img className="logo" src={Logo} alt="Logo.svg"></img>
                <div className="bookshowDiv">
                    <Button className="bookshowbutton" variant="contained" color="primary">Book Show</Button>
                </div>
                <div className="bookshowDiv">
                    <Button className="logobutton" variant="contained" color="inherit" onClick={() => displayLoginModal()}>{buttonValue}</Button>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <Paper square>
                    <Tabs
                        centered
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        TabIndicatorProps={{
                            style: {
                              backgroundColor: "#F00"
                             }
                            }}
                    >
                    <Tab label="Login" />
                    <Tab label="Register" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Login turnOffModal={setModalIsOpen} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Register />
                    </TabPanel>
                </Paper>
            </Modal>
        </Fragment>
    )
}

export default Header;