
const COLORS = {
    primary: "primary",
    info: "info",
    success: "success",
    warning: "warning",
    danger: "danger",
    rose: "rose",
    gray: "gray",
    white: "white",
    facebook: "facebook",
    twitter: "twitter",
    google: "google",
    github: "github",
    transparent: "transparent"
};

let buttonColorsRoot = {};
buttonColorsRoot[COLORS.primary] = COLORS.primary;
buttonColorsRoot[COLORS.info] = COLORS.info;
buttonColorsRoot[COLORS.success] = COLORS.success;
buttonColorsRoot[COLORS.warning] = COLORS.warning;
buttonColorsRoot[COLORS.danger] = COLORS.danger;
buttonColorsRoot[COLORS.rose] = COLORS.rose;
buttonColorsRoot[COLORS.white] = COLORS.white;
buttonColorsRoot[COLORS.facebook] = COLORS.facebook;
buttonColorsRoot[COLORS.twitter] = COLORS.twitter;
buttonColorsRoot[COLORS.google] = COLORS.google;
buttonColorsRoot[COLORS.github] = COLORS.github;
buttonColorsRoot[COLORS.transparent] = COLORS.transparent;
const BUTTON_COLORS = {...buttonColorsRoot};

let badgeColorsRoot = {};
badgeColorsRoot[COLORS.primary] = COLORS.primary;
badgeColorsRoot[COLORS.warning] = COLORS.warning;
badgeColorsRoot[COLORS.danger] = COLORS.danger;
badgeColorsRoot[COLORS.success] = COLORS.success;
badgeColorsRoot[COLORS.info] = COLORS.info;
badgeColorsRoot[COLORS.rose] = COLORS.rose;
badgeColorsRoot[COLORS.gray] = COLORS.gray;
const BADGE_COLORS = {...badgeColorsRoot};


const BUTTON_SIZES = {
    small: "sm",
    large: "lg"
};

let cardHEaderColorsRoot = {};
cardHEaderColorsRoot[COLORS.warning] = COLORS.warning;
cardHEaderColorsRoot[COLORS.success] = COLORS.success;
cardHEaderColorsRoot[COLORS.danger] = COLORS.danger;
cardHEaderColorsRoot[COLORS.info] = COLORS.info;
cardHEaderColorsRoot[COLORS.primary] = COLORS.primary;
const CARD_HEADER_COLORS = {...cardHEaderColorsRoot};

module.exports = {
    BUTTON_COLORS,
    BUTTON_SIZES,
    BADGE_COLORS,
    CARD_HEADER_COLORS
};
