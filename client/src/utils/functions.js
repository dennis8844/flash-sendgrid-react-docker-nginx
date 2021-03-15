import { variableTypes } from "./types";

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

export const validateByType = (type, newValue) => {
	switch(type) {
		case variableTypes.email:
			if (!!newValue) {
				const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					isEmail = re.test(newValue.toLowerCase());
				return isEmail ? "" : "Must be valid email";
			}
			return "Must have a value";
		case variableTypes.number:
		case variableTypes.text:
			return !!newValue ? "" : "Must have a value";
		default:
			//todo
			return "Unable to validate - error"
	}
}
