import React from 'react';
import {
  snakeCaseToCamelCase,
  generatePreviewData,
    generateTemplateValues,
  validateByType,
  errorEnums
} from "../utils/functions";
import { render, cleanup, beforeEach } from '@testing-library/react';
import { variableTypes } from "../utils/types"
import { initialState } from "../utils/appReducer";

describe("case converter working", () => {
  const snakeCase = "snake_case",
      hyphenCase = "hyphen-case",
      snakeResult  = snakeCaseToCamelCase(snakeCase),
      hyphenResult = snakeCaseToCamelCase(hyphenCase);
  it("Converts snake cases properly", () => {
    expect(snakeResult).toEqual("snakeCase");
  });
  it("Converts hyphen case too", ()=> {
    expect(hyphenResult).toEqual("hyphenCase");
  })
})

describe("validator working right", () => {
  //it will return an error string explaingin the invalidness if invalid accordign to type and value
  const emailEmpty = validateByType(variableTypes.email, ""),
      emailWrongPattern1 = validateByType(variableTypes.email,"billOgmail.com"),
      emailWrongPattern2 = validateByType(variableTypes.email,"bill@gmail"),
      validEmail = validateByType(variableTypes.email, "bill@gmail.com"),
      textEmpty = validateByType(variableTypes.text, ""),
      textValid = validateByType(variableTypes.text, "Hello World");
  it("validates the emails correctly", () => {
    expect(emailEmpty).toBe(errorEnums.mustHaveValue);
    expect(emailWrongPattern1).toBe(errorEnums.mustBeValid);
    expect(emailWrongPattern2).toBe(errorEnums.mustBeValid);
    expect(validEmail).toEqual("");
  });

  it("validates the text correctly", () => {
    expect(textEmpty).toBe(errorEnums.mustHaveValue);
    expect(textValid).toEqual("");
  })

})

describe("Preview data generator working right", () => {
  //i would test here in more detail than in the reducer
  /**
   * things id test
   *
   * diff templating results form handlebars
   * that the other variables are always correct
   */
});

describe("Template generator working right", () => {
  //i would test here in more detail than in the reducer
  /**
   * things id test
   *
   * diff templating results form handlebars
   * that the other variables are always correct
   */
});
