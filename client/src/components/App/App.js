import React from 'react';
import clsx from "clsx";
import classNames from "clsx";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    TextField,
    Snackbar,
    CssBaseline
} from '@material-ui/core';
import {
    Menu,
    Refresh,
    Close,
    Visibility
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

//custom imports
import PreviewDialog from "../Preview/Preview";
import VariableDrawer from "../VariableDrawer/VariableDrawer";
import { actionTypes } from "../../utils/types";
import { initState, mainReducer } from "../../utils/appReducer";
import logo from '../../assets/svg/logo.svg';
import '../../assets/stylesheets/App.css';

const drawerWidth = 350;

//you can ignore this
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: drawerWidth,
    },
    contentShift: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    templateRoot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardRoot: {
        minWidth: 500,
        width: "100%"
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    cardFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));


const  App = () => {
    const [state, dispatch] = React.useReducer(mainReducer, initState),
        classes = useStyles(),
        inputDrawerWidth = drawerWidth;

    const handleDrawerOpen = e => {
        if (e) {
            dispatch({
                type: actionTypes.openInputDrawer
            });
        }
    }

    const handleDrawerClose = e => {
        if (e) {
            dispatch({
                type: actionTypes.closeInputDrawer
            });
        }
    }

    const handleSnackbarClose = (e, reason) => {
        if (e) {
            if (reason === 'clickaway') return;

            dispatch({
                type: actionTypes.closeSnackbar
            });
        }
    };

    const handleSnackbarExited = e => {
        if (e) {
            dispatch({
                type: actionTypes.exitSnackbar
            });
        }
    };

    const handleOpenPreview = e => {
        if (e) {
            dispatch({
                type: actionTypes.openPreview
            });
        }
    }

    const handleClosePreview = e => {
        if (e) {
            dispatch({
                type: actionTypes.closePreview
            });
        }
    }

    const handleInputChange = e => {
        if (e) {
            const newValue = e.target.value,
                name = e.target.name;

            dispatch({
                type: actionTypes.changeInput,
                inputName: name,
                value: newValue
            })
        }
    }

    const handleSendTestEmail = e => {
        if (e) {
            dispatch({
                type: actionTypes.showFetching
            });
            dispatch({
                type: actionTypes.sendTestEmail,
                closeAfter: true
            });
        }
    }

    const handleInputReset = e => {
        if (e) {
            dispatch({
                type: actionTypes.resetAll
            });
        }
    }


  return (
    <div className="App">
        <CssBaseline />
        <AppBar position="static"  className={classNames(classes.appBar, state.showInputDrawer ? classes.appBarShift : "")}>
            <Toolbar>
                <img src={logo} className="App-logo" alt="logo" style={{width: 40, height: 40}} />
                <Typography variant="h6" className={classes.title}>
                    Email Template
                </Typography>
                {!state.showInputDrawer && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                    >
                        <Menu/>
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
        <VariableDrawer
            open={state.showInputDrawer}
            onReset={handleInputReset}
            onClose={handleDrawerClose}
            onVariableChange={handleInputChange}
            variables={state.inputVariables}
            width={inputDrawerWidth}
        />

        <main className={clsx({
                [classes.content]: state.showInputDrawer,
                [classes.contentShift]: !state.showInputDrawer,
            })}
        >
            <Grid item md={12}>
                <Card className={classes.cardRoot}>
                    <CardHeader className={classes.cardHeader}
                        title="Edit Discount Messages"
                    />
                    <CardContent >

                        <br />
                        <TextField fullWidth
                            {...state.inputVariables.subject}
                            defaultValue="Type messege here"
                            className={classes.textField}
                            onChange={e => handleInputChange(e)}
                        />
                        <br />
                        <br />
                        <TextField fullWidth
                           {...state.inputVariables.message}
                           defaultValue="Type messege here"
                           className={classes.textField}
                           onChange={e => handleInputChange(e)}
                           multiline
                        />
                        <br />
                        <span id="server"> </span>
                    </CardContent>
                    <CardActions  className={classes.cardFooter}>
                        <Button variant="text"
                            size="small"
                            disabled={!state.actionsEnabled}
                            onClick={e => handleInputReset(e)}
                            startIcon={<Refresh />}
                        >
                            Reset
                        </Button>
                        <Button size="small"
                            color="primary"
                            disabled={!state.actionsEnabled}
                            onClick={e => handleOpenPreview(e)}
                            startIcon={<Visibility />}
                        >
                            See Preview
                        </Button>
                    </CardActions>
                </Card>
            </Grid>


            <PreviewDialog
                open={state.showPreview}
                fetching={state.showFetching}
                onClose={handleClosePreview}
                onSendTestEmail={handleSendTestEmail}
                sender={state.inputVariables.sender.value}
                recipient={state.inputVariables.recipient.value}
                subject={state.compiledSubject}
                message={state.compiledMessage}
            />
        </main>


        <Snackbar
            key={state.snackbar.messageInfo ? state.snackbar.messageInfo.key : undefined}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={state.snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            onExited={handleSnackbarExited}
            message={state.snackbar.messageInfo ? state.snackbar.messageInfo.message : undefined}
            action={

                <IconButton
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleSnackbarClose}
                >
                    <Close />
                </IconButton>
            }
        />
    </div>
  );
}

export default App;
