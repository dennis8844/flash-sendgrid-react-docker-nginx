import React from 'react';

import Card from '../_material-toolkit-components/Card/Card';
import CardHeader  from '../_material-toolkit-components/Card/CardHeader';
import CardBody  from "../_material-toolkit-components/Card/CardBody";
import CardFooter from "../_material-toolkit-components/Card/CardFooter";

// const cardStyle = {};
// const cardHeaderProps = {};
// const cardFooterProps = {};
const defaultChildren = <>
    <CardHeader></CardHeader>
    <CardBody></CardBody>
    <CardFooter></CardFooter>
</>;

export const cardArgs = {
  title: 'Components/Cards',
  component: Card,
  argTypes: {
      backgroundColor: {control: 'color'},
      plain: {
          control: "boolean"
      },
      carousel: {
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

export const cardHeaderArgs = {
    title: 'Components/Cards/CardHeader',
    component: Card,
    argTypes: {
        backgroundColor: {control: 'color'},
        plain: {
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

export const CardTemplate = (args) => {
    return (
        <CardFooter {...args} />
    );
}

export const CardHeaderTemplate = (args) => {
    return (
        <CardHeader {...args} />
    );
};

export const CardBodyTemplate = (args) => {
    return (
        <CardBody {...args}/>
    );
}

export const CardFooterTemplate = (args) => {
    return (
        <CardFooterTemplate {...arg} />
    );
}

export const AllCardPropsTemplate = (cardArgs, cardHeaderArgs, cardBodyArgs, cardFooterArgs) => {
    return (
        <Card {...cardArgs}>
            <CardHeader {...cardHeaderArgs} />
            <CardBody {...cardBodyArgs} />
            <CardFooter {...cardFooterArgs} />
        </Card>
    );
}

export const AllCardComponentsProps = AllCardPropsTemplate.bind({});
AllCardPropsTemplate.cardArgs = {
    plain: true
};
AllCardPropsTemplate.cardHeaderArgs = {

};
AllCardPropsTemplate.cardBodyArgs = {

};
AllCardPropsTemplate.cardFooterArgs = {

};

// export const Plain = Template.bind({});
// Plain.args = {
//   plain: true,
//   children: defaultChildren
// };
//
// export const Carousel = Template.bind({});
// Carousel.args = {
//   carousel: true,
//   children: defaultChildren
// };
