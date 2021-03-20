
import React from 'react';

import { Button } from '../_material-toolkit-components/';
import {
    BUTTON_COLORS,
    BUTTON_SIZES
} from "../_material-toolkit-components/_utils/enums";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

export const buttonArgs = {
    title: 'Example/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
        color: {
            control: {
                type: 'select',
                options: Object.values(BUTTON_COLORS)
            }
        },
        size: {
            control: {
                type: 'inline-radio',
                options: Object.values(BUTTON_SIZES)
            }
        },
        simple: {
            control: "boolean"
        },
        round: {
            control: "boolean"
        },
        fullWidth: {
            control: "boolean"
        },
        disabled: {
            control: "boolean"
        },
        block: {
            control: "boolean"
        },
        link: {
            control: "boolean"
        },
        justIcon: {
            control: "boolean"
        },
        className: {
            control: "text"
        },
        style: {
            control: "object"
        }
    }
};


export const Template = (args) => {
    if (!!args.justIcon) {
        return (
            <Button {...args}>
                <DeleteForeverSharpIcon/>
            </Button>
        );
    }
    return (
        <Button {...args}>Button</Button>
    )
}

export const Props = Template.bind({});
Props.args = {
    color: BUTTON_COLORS.primary
};

// export const Primary = Template.bind({});
// Primary.args = {
//     color: BUTTON_COLORS.primary,
//     label: 'Button',
// };
//
// export const Success = Template.bind({});
// Success.args = {
//     label: 'Button',
//     color: BUTTON_COLORS.success
// };
//
// export const Large = Template.bind({});
// Large.args = {
//     size: BUTTON_SIZES.large
// };
//
// export const Small = Template.bind({});
// Small.args = {
//     size: BUTTON_SIZES.small
// };

// export const Simple = Template.bind({});
// Simple.args = {
//     simple: true
// };
//
// export const FullWidth = Template.bind({});
// FullWidth.args = {
//     fullWidth: true
// };
//
// export const Block = Template.bind({});
// Block.args = {
//     block: true
// };
//
// export const Link = Template.bind({});
// Link.args = {
//     link: true
// };
//
// export const JustIcon = Template.bind({});
// JustIcon.args = {
//     justIcon: true
// };
