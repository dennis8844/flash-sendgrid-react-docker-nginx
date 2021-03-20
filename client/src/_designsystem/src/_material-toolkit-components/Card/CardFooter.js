import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../_assets/jss/material-kit-react/components/cardFooterStyle.js";

const useStyles = makeStyles(styles);

export default function CardFooter(props) {
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

  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: !!className
  });

  return (
    <div className={cardFooterClasses} {...newRest}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
