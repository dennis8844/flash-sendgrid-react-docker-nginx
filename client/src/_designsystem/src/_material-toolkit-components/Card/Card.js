import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../_assets/jss/material-kit-react/components/cardStyle.js";

const useStyles = makeStyles(styles);

const Card = (props) => {
  const classes = useStyles();
  const {
      className,
      children,
      plain,
      carousel,
      backgroundColor,
      ...rest
  } = props;

  let newRest = {...rest};
  if (!!backgroundColor) {
      newRest.style = {
          ...newRest.style,
          backgroundColor: backgroundColor
      };
  }

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined
  });

  return (
    <div className={cardClasses} {...newRest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  plain: PropTypes.bool,
  carousel: PropTypes.bool,
  children: PropTypes.node
};

export default Card;
