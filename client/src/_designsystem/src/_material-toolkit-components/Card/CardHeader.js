import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../_assets/jss/material-kit-react/components/cardHeaderStyle.js";

const useStyles = makeStyles(styles);

export default function CardHeader(props) {
  const classes = useStyles();
  const {
      backgroundColor,
      className,
      children,
      color,
      plain,
      ...rest
  } = props;

  let newRest = {...rest};

  if (!!backgroundColor) {
      newRest.style = {
          ...newRest.style,
          backgroundColor: backgroundColor
      };
  }

  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [className]: !!className
  });

  return (
    <div className={cardHeaderClasses} {...newRest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary"]),
  plain: PropTypes.bool,
  children: PropTypes.node
};
