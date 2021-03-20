import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { mouseClick } from "./custom_test_utils";
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
} from '@testing-library/dom';

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import VariableDrawer from "../components/VariableDrawer/VariableDrawer";
import {
  generatePreviewData,
    generateTemplateValues,
} from "../utils/functions";
import { initialState } from "../utils/appReducer";

const varData = generateTemplateValues(initialState.inputVariables);
const data = generatePreviewData(initialState.inputVariables, varData);
let initTestProps = {
      open: true,
      onClose: null,
      data,
      fetching: false,
      onSendTestEmail: null
}, inputLabels = [],
    inputNames = [],
    testProps = {};

beforeEach(() => { //the most powerful function in jest
  testProps = {...initTestProps};
    inputLabels = [];
    inputNames = [];
    testProps = {};
    initTestProps.variables.forEach(variable => {
        if (variable.inDrawer) {
            inputLabels.push(variable.label);
            inputNames.push(variable.name)
        }
    });
});

afterEach(cleanup);


describe("It renders correctly", () => {
    it("renders correctly", () => {
        const { queryByTestId } = render(<VariableDrawer {...testProps} />);
        expect(queryByTestId("variable-drawer").toBeInTheDocument();
        expect(queryByTestId("variable-drawer").not.toBeEmpty();
    });

  it("has all the inputs labels" , ()=> {
    inputLabels.forEach(inputName => {
        const VD = shallow(<VariableDrawer {...testProps}/>);
        const foundInput = VD.find(`input[${inputName}]`);
        expect(foundInput).toBeInTheDocument();
        expect(foundInput).toHaveLength(1);
        foundInput.simulate('click');
        expect(foundInput).toHaveFocus();
    });

  });

  it("has all the input names" , ()=> {
      inputLabels.forEach(showingLabel => {
          const VD = render(<VariableDrawer {...testProps}/>);
          const label = getByLabelText(VD, showingLabel);
          expect(label).toBeInTheDocument();
          expect(label).not.toBeEmpty();
      });
  });

    it("registers the click correctly", () => {
        const clickMock = jest.fn(),
            newProps = {
                ...testProps,
                onClose: clickMock,
            };

        const VD = render(<VariableDrawer {...newProps} />);
        queryByTestId(VD, "close-drawer-button").click();
        expect(clickMock).toHaveBeenCalledTimes(1);
    });




    it(`Able to focus on the input`, () => {
        inputNames.forEach(inputName => {

            const clickMock = jest.fn(),
                inputKeyMock = jest.fn(),
                newProps = {
                    ...testProps,
                    onVariableChange: inputKeyMock,
                    onClose: clickMock,
                };

            const VD = shallow(<VariableDrawer {...newProps}/>);
            const foundInput = VD.find(`input[${inputName}]`);
            fireEvent(foundInput), mouseClick);
            expect(clickMock).toHaveBeenCalledTimes(1);
            expect(foundInput).toHaveFocus();
        });
    });
});

describe("It handles input events correctly", () => {

    inputNames.forEach(inputName => {
      it(`Able to set a key event on  ${inputName} input`, () => {
          const inputKeyMock = jest.fn(),
              newProps = {
                  ...testProps,
                  onVariableChange: inputKeyMock
              };
      const VD = shallow(<VariableDrawer {...newProps}/>);;
          const foundInput = VD.find(`input[${inputName}]`)[0];
        const keyToPress = "K";
        const currentValue = foundInput.value;
        fireEvent(foundInput, onkeydown());
        expect(inputKeyMock).toHaveBeenCalled(1);
        expect(foundInput.value).not.toEqual(currentValue);
          expect(foundInput).toHaveFocus();
      })
    })
})
