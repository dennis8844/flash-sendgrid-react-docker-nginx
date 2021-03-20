import { fireEvent } from '@testing-library/react';

export const updatePropsByKeyValue = (targetObj, key, value) => {
    targetObj[key] = value;
}

export const updatePropsByObj = (targetObj, updatedDataObj) => {
    Object.assign(targetObj, updatedDataObj);
}

export const mouseClick = new MouseEvent('click', { //must be used because we pass the event in the click function
    bubbles: true,
    cancelable: true,
});

export const typeAString = (testElementNode, character) => { //for typing one character into an input
    const keyToType = { //must be used because we pass the event in the click function
        key: character,
        keyCode: character.charCodeAt(0),
        bubbles: true,
        cancellable: false,
        type: "change",
        defaultPrevented: false,
        target: {
            value: character
        }
    };
    fireEvent.keyPress(testElementNode, keyToType);
};


export const changeInputString = (testElementNode, stringToChange) => { //for just testing the changes on inputs
    for (let i = 0; i < stringToChange.length; i++) {
        //console.log(stringToType[i], stringToType.charCodeAt(i), stringToType.substring(0, i+1));
        const newValue = {
            target: {
                value: stringToChange.substring(0, i+1)
            }
        };
        fireEvent.change(testElementNode, newValue);
    }
};
