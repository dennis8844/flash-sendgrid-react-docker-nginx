import Handlebars from "handlebars";
import axios from 'axios';
import { variableTypes, actionTypes } from "./types";
import { snakeCaseToCamelCase, validateByType } from "./functions";
import SendAPI from "../apis/apis";

console.log(SendAPI.get("/api/test"));

export const initState = {
	inputVariables: {
		sender: {
			//value must match authenticated sender in sendgrid
			value: "dpitcock+sendgrid@gmail.com",
			previousValue: "dpitcock+sendgrid@gmail.com",
			error: false,
			type: variableTypes.email,
			name: "sender",
			label: "sender",
			required: true,
			touched: false,
			focused: false,
			disabled: false,
			readOnly: false,
			helperText: "",
			inDrawer: true,
			tabIndex: 0
		},
		recipient: {
			value: "dpitcock+sendgridTo@gmail.com",
			previousValue: "dpitcock+sendgridTo@gmail.com",
			error: false,
			type: variableTypes.email,
			name: "recipient",
			label: "recipient",
			required: true,
			touched: false,
			focused: false,
			readOnly: false,
			disabled: false,
			tabIndex: 1,
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
			tabIndex: 2,
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
			tabIndex: 3,
			inDrawer: true
		},
		discountCode: {
			value: "Simon",
			previousValue: "Simon",
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
			tabIndex: 4,
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
			helperText: ""
		},
	},
	showPreview: false,
	showInputDrawer: true,
	showFetching: false,
	compiledSubject: "",
	compiledMessage: "",
	actionsEnabled: true,
	snackbar: {
		open: false,
		messageInfo: {
			message: ""
		}
	}
};

const copyOfInitState = {...initState};

/**
 * conditionally parses values for the template if enabled
 * @param inputState
 * @param data
 * @returns {{actionsEnabled}|*}
 */
const updateParsedState = (inputState, data) => {
	if (!inputState.actionsEnabled) {
		inputState.compiledSubject = "Please fix invalid input";
		inputState.compiledMessage = "Please fix invalid input";

	} else {
		const subjectTemplate = Handlebars.compile(inputState.inputVariables.subject.value),
			messageTemplate = Handlebars.compile(inputState.inputVariables.message.value);
		inputState.compiledMessage = messageTemplate(data);
		inputState.compiledSubject = subjectTemplate(data);
	}

	return inputState;
}

/**
 * conditionally created the values for the payload as there are changes
 * @param stateInputObj
 * @returns {{sender: string, discount_code: string, recipient: string, contact_first_name: string, discount_rate: string}}
 */
const createDataPayload = stateInputObj => {
	// return {
	// 	sender: stateInputObj.sender.value,
	// 	recipient: stateInputObj.recipient.value,
	// 	contact_first_name: stateInputObj.contactFirstName.value,
	// 	discount_rate: stateInputObj.discountRate.value.toString().concat("%"),
	// 	discount_code: stateInputObj.discountCode.value
	// };

	return {
		sender_email: stateInputObj.inputVariables.sender.value,
		recipient_email: stateInputObj.inputVariables.recipient.value,
		subject: stateInputObj.compiledSubject,
		message: stateInputObj.compiledMessage
	};
}

export const mainReducer = (state, action) => {
	let copyOfState = {...state};

	const inputKeys = Object.keys(initState.inputVariables),
		data = createDataPayload(copyOfState);


	switch (action.type) {
		case actionTypes.resetAll:
			let refreshedState = {...copyOfInitState};
			refreshedState.showInputDrawer = state.showInputDrawer;
			refreshedState.showPreview = state.showPreview;

			const newData = createDataPayload(refreshedState);
			if (refreshedState.showPreview) refreshedState = updateParsedState(refreshedState, newData);

			return {
				...refreshedState
			}
		case actionTypes.changeInput:
			const inputKey = snakeCaseToCamelCase(action.inputName),
				helperText = validateByType(state.inputVariables[inputKey].type, action.value)
			let copyOfInputData = {
				...copyOfState.inputVariables[inputKey],
				touched: true,
				focused: true,
				value: action.value,
				helperText,
				error: !!helperText
			};
			copyOfState.inputVariables[inputKey] = copyOfInputData;
			let hasActionError = false;
			for(let i = 0; i < inputKeys.length; i++) {
				const inputObj = copyOfState.inputVariables[inputKeys[i]];
				if (inputObj.required && inputObj.error) {
					hasActionError = true;
					break;
				}
			}
			copyOfState.actionsEnabled = !hasActionError && (
				(!!copyOfState.compiledMessage && copyOfState.compiledMessage !== "Please fix invalid input") &&
				(!!copyOfState.compiledSubject && copyOfState.compiledSubject  !== "Please fix invalid input")
			);

			if (copyOfState.showPreview) copyOfState = updateParsedState(copyOfState, data);

			return {
				...copyOfState
			};
		case actionTypes.openPreview:
			copyOfState = updateParsedState(copyOfState, data);
			copyOfState.showPreview = true;

			return {
				...copyOfState
			};
		case actionTypes.closePreview:
			copyOfState.compiledMessage = null;
			copyOfState.compiledSubject = null;
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
				showFetching: true
			}
		case actionTypes.sendTestEmail:
			//weird error so not usign this
			//SendAPI.post("api/send-test-email/", data).then(response => {
			axios.post(`http://localhost:5000/api/send-test-email`, data).then(response => {
				const k = response;
				return {
					...copyOfState,
					showFetching: false,
					snackbar: {
						...state.snackbar,
						messageInfo: {
							message: "Preview email has been sent",
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
			return {
				...state,
				showFetching: false
			}
		case actionTypes.addSnackbar:
			return {
				...copyOfState,
				snackbar: {
					...state.snackbar,
					messageInfo: {
						message: action.messageContent,
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
