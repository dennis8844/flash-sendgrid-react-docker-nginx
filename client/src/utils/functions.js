import { variableTypes } from "./types";
import Handlebars from "handlebars";

/**
 * also works with hyphenated...
 * @param str
 * @returns {*}
 */
export const snakeCaseToCamelCase = (str) => str.replace(
	/([-_][a-z])/g,
	(group) => group.toUpperCase()
		.replace('-', '')
		.replace('_', '')
);

export const errorEnums = {
	mustBeValid: "Must be valid",
	mustHaveValue: "Must have Value",
	unknown: "Unable to validate - error"
};

/**
 * Could be mroe complex but quite simple validation
 * @param type
 * @param newValue
 * @returns {string|string}
 */
export const validateByType = (type, newValue) => {
	switch(type) {
		case variableTypes.email:
			if (!!newValue) {
				const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					isEmail = re.test(newValue.toLowerCase());
				return isEmail ? "" : errorEnums.mustBeValid;
			}
			return errorEnums.mustHaveValue;
		case variableTypes.number:
		case variableTypes.text:
			return !!newValue ? "" : errorEnums.mustHaveValue;
		default:
			//todo
			return errorEnums.unknown;
	}
}

/**
 * conditionally created the values for the payload as there are changes
 * @param stateInputObj
 * @returns {{sender: string, discount_code: string, recipient: string, contact_first_name: string, discount_rate: string}}
 */
export const generatePreviewData = (stateInputObj, varData) => {
	console.log(varData);
	const subjectTemplate = Handlebars.compile(stateInputObj.inputVariables.subject.value),
		messageTemplate = Handlebars.compile(stateInputObj.inputVariables.message.value);

	return {
		sender_email: varData.sender_email,
		recipient_email: varData.recipient_email,
		subject: subjectTemplate(varData),
		message: messageTemplate(varData)
	};
}

export const generateTemplateValues = (inputVariables) => {
	const inputKeys = Object.keys(inputVariables);
	let templateValues = {};

	/**
	 * populates the values to be used for generateing template and keeps them accessable of a variable before reducer
	 */
	inputKeys.forEach(inputKey => {
		if (!inputVariables[inputKey].usesTemplate){ //ignore templates
			if (inputKey === "discountRate") { //transform data
				templateValues[inputVariables[inputKey].name] = inputVariables[inputKey].value.toString().concat("%");
			} else {
				templateValues[inputVariables[inputKey].name] = inputVariables[inputKey].value;
			}
		}
	});

	return templateValues;
}
