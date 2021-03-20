import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { BADGE_COLORS } from "../_utils/enums";
import styles from "../_assets/jss/material-kit-react/components/badgeStyle.js";

const useStyles = makeStyles(styles);

export default function Badge(props) {
  const classes = useStyles();
  const {
      color,
      backgroundColor,
      className,
      children,
      style
  } = props;

  let newStyle = {
      ...style
  };

  if (!!backgroundColor) {
      newStyle.backgroundColor = backgroundColor;
  }

  const badgeClasses = classNames({
    [classes.badge]: true,
    [classes[color]]: !!color,
    [className]: !!className
  });

  return (
    <span className={badgeClasses} style={newStyle}>
        {children}
    </span>
  );
}

Badge.defaultProps = {
  color: BADGE_COLORS.gray,
  className: "",
  backgroundColor: "",
  style: {}
};

Badge.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.oneOf([...Object.values(BADGE_COLORS)]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};
