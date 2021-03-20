import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {cleanup, render} from '@testing-library/react';
import { mouseClick } from "./custom_test_utils";

import Preview from "../components/Preview/Preview";
import {
  generatePreviewData,
    generateTemplateValues
} from "../utils/functions";
import { initialState } from "../utils/appReducer";

const varData = generateTemplateValues(initialState.inputVariables),
  variables = generatePreviewData(initialState.inputVariables, varData),
  initTestProps = {
      open: true,
      onClose: null,
      data: variables,
      fetching: false,
      onSendTestEmail: null
    };
let inputLabels = [],
    inputNames = [],
    testProps = {};



beforeEach(() => { //the most powerful function in jest
  testProps = {...initTestProps};
    inputLabels = [];
    inputNames = [];
  initTestProps.variables.forEach(variable => {
    if (variable.usesTemplate) {
      inputLabels.push(variable.label);
      inputNames.push(variable.name)
    }
  });
});

afterEach(cleanup);

describe('renders correctly', () => {

  it("renders the container component", ()=> {
      const { queryByTestId } = render(<Preview {...testProps} />);
      expect(queryByTestId("mesage-preview")).toBeInTheDocument();
      expect(queryByTestId("mesage-preview")).not.toBeEmpty();
  });
});

describe("renders the data correctly", () => {
    const { queryByTestId } = render(<Preview {...testProps} />);
    inputNames.forEach(inputName => {
        it(`Renders the data for "${inputName}" correctly`, ()=> {
            // const { queryByTestId } = render(<Preview {...testProps} />);
            expect(queryByTestId(inputName)).toBeInTheDocument();
            expect(queryByTestId(inputName)).not.toBeEmpty();
        })
    });

    //same can be done for labels if given testid
});

describe("It handles clicks correctly", () => {

    it("registers the close click correctly", () => {
        const clickMock = jest.fn();
        const {queryByTestId} = render(<Preview {...testProps} onClose={clickMock}  /> );
        fireEvent(queryByTestId("close-btn"), mouseClick);
        expect(clickMock).toHaveBeenCalledTimes(1);
    });

    it("registers the send click correctly", () => {
        const clickMock = jest.fn();
        const {queryByTestId} = render(<Preview {...testProps} onSendTestEmail={clickMock} /> );
        fireEvent(queryByTestId("send-message-btn"), mouseClick);
        expect(clickMock).toHaveBeenCalledTimes(1);
    });
})
