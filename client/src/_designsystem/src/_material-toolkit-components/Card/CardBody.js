import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../_assets/jss/material-kit-react/components/cardBodyStyle.js";

const useStyles = makeStyles(styles);

export default function CardBody(props) {
  const classes = useStyles();
  const {
      backgroundColor,
      className,
      children,
      ...rest
  } = props;

  let newRest = {...rest};

  if (!!backgroundColor) {
    newRest.style = {
        ...newRest.style,
        backgroundColor: backgroundColor
    };
  }

  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined
  });

  return (
    <div className={cardBodyClasses} {...newRest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
