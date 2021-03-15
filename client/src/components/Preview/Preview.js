import React from 'react';
import PropTypes from "prop-types";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Toolbar
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	dialog: {
		position: "relative"
	},
	fetching: {
		position: "absolute",
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	dialogHeader: {
		padding: 0,
		margin: 0,
		fontSize: 12
	},
	dialogContentText: {
		fontSize: 12,
		whiteSpace: "pre"
	},
	toolbar: {
		fontSize: 12,
		height: 40,
		minHeight: 40,
		margin: 0,
		padding: 0,
		border: 0,
		"&>div": {
			padding: "0 16px",
			width: "100%",
			margin: 0,
			display: "flex",
			flexDirection: "row",
			justifyContent: "flexStart",
			alignItems: "center",
			height: "100%",
			border: "1px solid #ccccc",
			"&.half": {
				width: "50%"
			}
		},
		"&:first-child": {
			top: 0
		}
	}
}));

const PreviewDialog = (props) => {
	const {
		open,
		onClose,
		sender,
		recipient,
		subject,
		message,
		fetching,
		onSendTestEmail
	} = props,
		messageElementRef = React.useRef(null),
		classes = useStyles();

	const handleSendMessege = e => {
		if (e) {
			onSendTestEmail(e);
			onClose(e)
		}
	}

	const handleClose = e => {
		if (e) {
			onClose(e);
		}
	}

	React.useEffect(() => {
		if (open) {
			const { current: messageElement } = messageElementRef;
			if (messageElement !== null) {
				messageElement.focus();
			}
		}
	}, [open]);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			scroll="paper"
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description"
			className={classes.dialog}
		>
			{fetching && <div className={classes.fetching}>
					<CircularProgress color="secondary" />
				</div>
			}
			<DialogTitle id="scroll-dialog-title" className={classes.dialogHeader}>
				<Toolbar className={classes.toolbar}>
					<div className="half">
						From: {sender}
					</div>
					<div className="half">
						To: {recipient}
					</div>
				</Toolbar>
				<Toolbar className={classes.toolbar}>
					<div>
						Subject: {subject}
					</div>
				</Toolbar>
			</DialogTitle>
			<DialogContent dividers >
				<DialogContentText
					id="scroll-dialog-description"
					ref={messageElementRef}
					tabIndex={-1}
					className={classes.dialogContentText}
					dangerouslySetInnerHTML={{ __html: message }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
				<Button onClick={handleSendMessege} color="primary">
					Send Test Messege
				</Button>
			</DialogActions>
		</Dialog>
	);
}

PreviewDialog.defaultProps = {
	open: false,
	fetching: false,
	sender: "",
	recipient: "",
	subject: "",
	message: ""
};

PreviewDialog.propTypes = {
	fetching: PropTypes.bool.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	sender: PropTypes.string.isRequired,
	recipient: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onSendTestEmail: PropTypes.func.isRequired
};

export default PreviewDialog;
