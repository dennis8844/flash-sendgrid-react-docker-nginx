import React from 'react';
import { Badge } from '../_material-toolkit-components/';
import {BADGE_COLORS} from "../_material-toolkit-components/_utils/enums";
import EmailIcon from '@material-ui/icons/Email';
const iconStyles = {
    fontSize: 10
}

export const badgeArgs = {
    title: 'Components/Badge',
    component: Badge,
    argTypes: {
        backgroundColor: { control: 'color' },
        color: {
            control: {
                type: 'select',
                options: Object.values(BADGE_COLORS)
            }
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
    return (
        <Badge {...args} />
    );
}

export const Props = Template.bind({});
Props.args = {
  color: BADGE_COLORS.primary,
  children: <EmailIcon style={iconStyles}/>
};
