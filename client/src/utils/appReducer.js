import { useReducer } from "react";
import axios from 'axios';
import { variableTypes, actionTypes } from "./types";
import {
	snakeCaseToCamelCase,
	validateByType,
	generatePreviewData,
	generateTemplateValues
} from "./functions";
// import SendAPI from "../apis/apis";
// console.log(SendAPI.get("/api/test"));

export const initialState = {
	inputVariables: {
		senderEmail: {
			//value must match authenticated sender in sendgrid
			value: "dpitcock+sendgrid@gmail.com",
			previousValue: "dpitcock+sendgrid@gmail.com",
			error: false,
			type: variableTypes.email,
			name: "sender_email",
			label: "sender",
			required: true,
			touched: false,
			focused: false,
			disabled: false,
			readOnly: false,
			helperText: "",
			inDrawer: true,
			inPreview: true,
			tabIndex: 5
		},
		recipientEmail: {
			value: "dpitcock+sendgridTo@gmail.com",
			previousValue: "dpitcock+sendgridTo@gmail.com",
			error: false,
			type: variableTypes.email,
			name: "recipient_email",
			label: "recipient",
			required: true,
			touched: false,
			focused: false,
			readOnly: false,
			disabled: false,
			tabIndex: 6,
			inPreview: true,
			inDrawer: true
		},
		contactFirstName: {
			value: "Simon",
			previousValue: "Simon",
			error: false,
			type: variableTypes.text,
			name: "contact_first_name",
			label: "contact_first_name",
			required: true,
			touched: false,
			focused: false,
			readOnly: false,
			disabled: false,
			helperText: "",
			tabIndex: 7,
			inPreview: false,
			inDrawer: true
		},
		discountRate: {
			value: 15,
			previousValue: 15,
			error: false,
			type: variableTypes.number,
			min: 0,
			max: 100,
			step: 1,
			name: "discount_rate",
			label: "discount_rate",
			required: true,
			touched: false,
			focused: false,
			disabled: false,
			readOnly: false,
			helperText: "",
			tabIndex: 8,
			inPreview: false,
			inDrawer: true
		},
		discountCode: {
			value: "SIMON15",
			previousValue: "SIMON15",
			error: false,
			type: variableTypes.text,
			name: "discount_code",
			label: "discount_code",
			required: true,
			touched: false,
			focused: false,
			disabled: false,
			readOnly: false,
			helperText: "",
			tabIndex: 9,
			inPreview: false,
			inDrawer: true
		},
		subject: {
			value: "Check out this discount for you",
			previousValue: "Check out this discount for you",
			error: false,
			type: variableTypes.text,
			name: "subject",
			label: "subject",
			required: true,
			touched: false,
			focused: false,
			disabled: false,
			readOnly: false,
			helperText: "",
			inPreview: true,
			usesTemplate: true,
			tabIndex: 1
		},
		message: {
			value: "Hi {{contact_first_name}}, \n\nGood news! You can get {{discount_rate}} off your next pair of shoes by using this discount code: {{discount_code}}. Enjoy! \n\nSincerely, \nMarketer",
			previousValue: "Hi {{contact_first_name}}, \n\nGood news! You can get {{discount_rate}} off your next pair of shoes by using this discount code: {{discount_code}}. Enjoy! \n\nSincerely, \nMarketer",
			error: false,
			type: variableTypes.text,
			name: "message",
			label: "message",
			required: true,
			touched: false,
			focused: false,
			disabled: false,
			readOnly: false,
			helperText: "",
			inPreview: true,
			usesTemplate: true,
			tabIndex: 2
		},
	},
	previewData: {},
	showPreview: false,
	showInputDrawer: true,
	showFetching: false,
	compiledSubject: "",
	compiledMessage: "",
	actionsEnabled: true,
	//resetEnabled: false,
	snackbar: {
		open: false,
		messageInfo: {
			message: ""
		}
	}
};


export const mainReducer = (state, action) => {
	const inputKeys = Object.keys(state.inputVariables);
	let copyOfState = {...state},
		templateValues = generateTemplateValues(state.inputVariables);

	switch (action.type) {
		case actionTypes.changeInput:
			const inputKey = snakeCaseToCamelCase(action.inputName),
				helperText = validateByType(state.inputVariables[inputKey].type, action.value);


			let copyOfInputData = {
				...copyOfState.inputVariables[inputKey],
				touched: true,
				focused: true,
				value: action.value,
				helperText,
				error: !!helperText
			};

			//double check sender email to match sendgrids (could grab these emails via api, make a dropdown
			if (!helperText && copyOfInputData.name === "sender_email") {
				let validSendingEmails = ["dpitcock+sendgrid@gmail.com"];
				if (validSendingEmails.indexOf(copyOfInputData.value) === -1) {
					copyOfInputData.error = true;
					copyOfInputData.helperText = "Must be validated in Sendgrid"
				}
			}
			copyOfState.inputVariables[inputKey] = copyOfInputData;

			let hasActionError = false;
				// resetDisabled = false;
			for(let i = 0; i < inputKeys.length; i++) {
				const inputObj = copyOfState.inputVariables[inputKeys[i]],
					hasError = inputObj.required && inputObj.error;
					//isChanged = inputObj.value !== inputObj.previousValue;

				hasActionError = hasError? hasError : hasActionError;
				//resetDisabled = isChanged ? !isChanged : resetDisabled;
			}

			return {
				...copyOfState,
				actionsEnabled: !hasActionError
				//resetEnabled: !resetDisabled
			};
		case actionTypes.openPreview:
			if (copyOfState.actionsEnabled) {
				copyOfState.showPreview = true;
				copyOfState.previewData = generatePreviewData(copyOfState, templateValues)
			}

			return {
				...copyOfState
			};
		case actionTypes.closePreview:
			copyOfState.previewData = {};
			copyOfState.showPreview = false;
			return {
				...copyOfState
			};
		case actionTypes.openInputDrawer:
			return {
				...copyOfState,
				showInputDrawer: true
			}
		case actionTypes.closeInputDrawer:
			return {
				...copyOfState,
				showInputDrawer: false
			}
		case actionTypes.showFetching:
			return {
				...copyOfState,
				showFetching: true,
				actionsEnabled: false
			}
		case actionTypes.sendTestEmail:
			if (copyOfState.showFetching && Object.keys(templateValues).length > 0) {
				//weird error so not using this since this would be best for using in multiple different enviroments and testiing

				//SendAPI.post("api/send-test-email/", data).then(response => {

				axios.post(`http://localhost:5000/api/send-test-email`, copyOfState.previewData).then(response => {
					return {
						...copyOfState,
						showFetching: false,
						actionsEnabled: true,
						snackbar: {
							...state.snackbar,
							messageInfo: {
								message: "Template successfully sent",
								key: new Date().getTime()
							},
							open: true
						},
						showPreview: !action.closeAfter
					};
				}).catch(error => {
					console.log(error);
					return {
						...copyOfState,
						showFetching: false,
						actionsEnabled: true,
						snackbar: {
							...state.snackbar,
							messageInfo: {
								message: "Error sending email, try again",
								key: new Date().getTime()
							},
							open: true
						}
					};
				});
			}
			return {
				...state,
				showFetching: false,
				actionsEnabled: true
			}
		case actionTypes.addSnackbar:
			return {
				...copyOfState,
				snackbar: {
					...state.snackbar,
					messageInfo: {
						message: action.message,
						key: new Date().getTime()
					},
					open: true
				}
			}
		case actionTypes.closeSnackbar:
			return {
				...copyOfState,
				snackbar: {
					...state.snackbar,
					open: false
				}
			}
		case actionTypes.exitSnackbar:
			return {
				...state,
				snackbar: {
					...state.snackbar,
					messageInfo: undefined
				}
			}
		default:
			return {
				...state
			}
	}
}

export const AppReducer = () => {
	return useReducer(mainReducer, initialState);
}
