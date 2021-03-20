import React from 'react';
import {  cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import App from '../components/App/App';

describe("The App renders correctly", ()=> {
  it("renders the app", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId("app")).toBeDefined();
  });

  it('renders email template in the title', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Email Template/i);
    expect(linkElement).toBeInTheDocument();
  });
})

/**more tests can be written
 To be honest, I haven't determined how to test the parent functional component that uses a reducer
 i'd prob take a snapshot of it in enzyme and dig into state values but that's a lot to explore

 test each function with an mock event
 test if data passed into the material components correctly, that the values show the handlebars
 - sender
 - recipient
 - subject
 - message

 test when the preview button clicked the event is triggered
 test when the inputs have an change event it is triggerd
 */
