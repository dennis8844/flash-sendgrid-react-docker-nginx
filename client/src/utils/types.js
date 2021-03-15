const variableTypes = {
    email: "email",
    text: "text",
    number: "number"
}

const actionTypes = {
	changeInput: "changeInput",
	openPreview: "openPreview",
	closePreview: "closePreview",
	openInputDrawer: "openInputDrawer",
	closeInputDrawer: "closeInputDrawer",
	showFetching: "showFetching",
	sendTestEmail: "sendTestEmail",
	saveTemplate: "saveTemplate",
	addSnackbar: "addSnackbar",
	closeSnackbar: "closeSnackbar",
	exitSnackbar: "exitSnackbar",
	resetAll: "resetAll"
};

module.exports = {
    variableTypes,
    actionTypes
};
