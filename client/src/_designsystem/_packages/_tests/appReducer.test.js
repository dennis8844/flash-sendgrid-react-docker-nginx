import React, {useReducer} from 'react';
import {  cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { actionTypes } from "../utils/types";
import { renderHook } from '@testing-library/react-hooks';
import { initialState, mainReducer } from "../utils/appReducer";

let testState = {},
    mockDispatch = {},
    updatedState = {};

beforeEach(() => { //the most powerful function in jest
  testState = {...initialState};
});

afterEach(cleanup);


// changeInput
describe("Reducer correctly applies input data changes", () => {


  it('changes the state correctly when changing a valid text input', () => {
    const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));
    mockDispatch = {
      type: actionTypes.changeInput,
      name: "discountCode",
      value: "DISCOUNT"
    };

    dispatch(mockDispatch);
    expect(updatedState.inputVariables[mockDispatch.name].value).toEqual(mockDispatch.value);
  })


  it('changes the state correctly when changing an input with empty string', () => {
    mockDispatch = {
      ...mockDispatch,
      value: ""
    }
    const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));
    dispatch(mockDispatch);
    expect(updatedState.inputVariables[mockDispatch.name].value).toEqual(mockDispatch.value);
    expect(!!updatedState.inputVariables[mockDispatch.name].error).toBe(true);
    expect(updatedState.inputVariables[mockDispatch.name].helperText).toBeDefined();
  });

  //do the same for an email type but not every version, we can do that by testing the validation func,
  //just the sender email

  it('relizes the email is not a valid sender', () => {
    mockDispatch = {
      ...mockDispatch,
      name: "senderEmail",
      value: "valid@email.com"
    };
    const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));
    dispatch(mockDispatch);
    expect(updatedState.inputVariables[mockDispatch.name].value).toEqual(mockDispatch.value);
    expect(!!updatedState.inputVariables[mockDispatch.name].error).toBe(true);
    expect(updatedState.inputVariables[mockDispatch.name].helperText).toBeDefined();
  })
});

describe("Open preview sets the correct data", () => {

  it("shows the preview", ()=> {
    mockDispatch = {
      type: actionTypes.openPreview
    };
    const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));
    dispatch(mockDispatch);
    expect(updatedState.showPreview).toBe(true);
  });


  it ("grabs the input values", () => {
    mockDispatch = {
      type: actionTypes.openPreview
    };
    const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));
    dispatch(mockDispatch);
    expect(updatedState.previewData.sender_email).toEqual(testState.inputVariables.senderEmail.value);
    expect(updatedState.previewData.recipient_email).toEqual(testState.inputVariables.recipientEmail.value);
  })

  it("correctly compiles the template", () => {
    const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));
    const subjectTemplate = Handlebars.compile(testState.inputVariables.subject.value),
        messageTemplate = Handlebars.compile(testState.inputVariables.message.value);

    mockDispatch = {
      type: actionTypes.openPreview
    };
    dispatch(mockDispatch);
    expect(updatedState.previewData.subject).toEqual(subjectTemplate)
    expect(updatedState.previewData.message).toEqual(messageTemplate)
  })
})



// closePreview
describe("Close Preview works right", () => {

  it('changes the state correctly opening the preview button', () => {
    testState = {
      ...testState,
      showPreview: true,
      previewData: {
        anything: true
      }
    };

    mockDispatch = {
      type: actionTypes.closePreview
    };

    dispatch(mockDispatch);

    expect(updatedState.showPreview).toBe(false);
    expect(updatedState.previewData).toEqual({});

  });
})

//input drawer
describe("Input Drawer works right", () => {
  testState = {
    ...testState,
    showPreview: true,
    previewData: {
      anything: true
    }
  };

  mockDispatch = {
    type: actionTypes.openInputDrawer
  };

  const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));

  dispatch(mockDispatch);
  it('State correct after input draws shows', () => {
    expect(updatedState.showInputDrawer).toBe(true);
  });

  mockDispatch = {
    type: actionTypes.closeInputDrawer
  };

  dispatch(mockDispatch);
  it('State correct after input draws shows', () => {
    expect(updatedState.showInputDrawer).toBe(false);
  });
});

// showFetching
describe("Showing the fetching state", () => {
  testState = {
    ...testState,
    showInputDrawer: true
  };

  const [updatedState, dispatch] = renderHook(() => useReducer(mainReducer, testState));

  mockDispatch = {
    type: actionTypes.showFetching
  };

  dispatch(mockDispatch);
  it('State correct after fetching should be shown', () => {
    expect(updatedState.showFetching).toBe(true);
  });
});

/**
// sendTestEmail
- tricky because we have to test mock apis however the data is from preview
- describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {

  });

  it('fetches erroneously data from an API', async () => {

  });
});
*/

/**
 *
// addSnackbar
 * that is is open and has a message and key
// closeSnackbar
 * that is is closed, no message, no key
// exitSnackbar
 * that is is closed, no message, no key

*/
