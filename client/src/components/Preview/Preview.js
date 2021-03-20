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

const Preview = (props) => {
	console.log(props);
	const {
		open,
		onClose,
		data,
		fetching,
		onSendTestEmail
	} = props,
		messageElementRef = React.useRef(null),
		classes = useStyles();

	/**
	 * sends a message once the button is clicked
	 * @param e
	 */
	const handleSendMessege = e => {
		if (e) {
			onSendTestEmail(e);
			onClose(e)
		}
	}

	/**
	 * Closes the preview mode
	 * @param e
	 */
	const handleClose = e => {
		if (e) {
			onClose(e);
		}
	}

	/**
	 * Sets focus inside the preview - no changes can be made
	 */
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
			fullWidth
			maxWidth="md"
			data-testId="message-preview"
		>
			{fetching && <div className={classes.fetching}>
					<CircularProgress color="secondary" />
				</div>
			}
			<DialogTitle id="scroll-dialog-title" className={classes.dialogHeader}>
				<Toolbar className={classes.toolbar}>
					<div className="half" data-testId="sender_email">
						From: {data.sender_email}
					</div>
					<div className="half" data-testId="recipient_email">
						To: {data.recipient_email}
					</div>
				</Toolbar>
				<Toolbar className={classes.toolbar}>
					<div data-testId="subject">
						Subject: {data.subject}
					</div>
				</Toolbar>
			</DialogTitle>
			<DialogContent dividers >
				<DialogContentText
					id="scroll-dialog-description"
					data-testId="message"
					ref={messageElementRef}
					tabIndex={-1}
					className={classes.dialogContentText}
					dangerouslySetInnerHTML={{ __html: data.message }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={e => handleClose(e)}
						color="primary"
						data-testId="close-btn"
				>
					Close
				</Button>
				<Button onClick={e => handleSendMessege(e)}
						color="primary"
						data-testId="send-message-btn"
				>
					Send Test Messege
				</Button>
			</DialogActions>
		</Dialog>
	);
}

Preview.defaultProps = {
	open: true, //will always be open due to rendered conditionally
	fetching: false, //shows a loading element, yet fetches are fast
	data: { //should never be empty when open
		// 	sender_email: "",
		// 	recipient_email: "",
		// 	subject: "",
		// 	message: ""
	}
};

Preview.propTypes = {
	fetching: PropTypes.bool.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	data: PropTypes.shape({
		sender: PropTypes.string.isRequired,
		recipient: PropTypes.string.isRequired,
		subject: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired
	}).isRequired,
	onSendTestEmail: PropTypes.func.isRequired
};

export default Preview;
