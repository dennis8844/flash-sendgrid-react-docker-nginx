import React from "react";
import '@testing-library/jest-dom'

export function mockComponentWithProps (componentSrc) {
	jest.mock(
		componentSrc,
		({children, ...rest}) => (
			<mock-my-component {...rest}>
				{typeof children === 'function' ? '[Child as a function]' : null}
			</mock-my-component>
		)
	);
}
