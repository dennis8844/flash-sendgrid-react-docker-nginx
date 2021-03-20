import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Drawer,
	Divider,
	IconButton,
	List,
	ListItem,
	TextField
} from '@material-ui/core';
import {
	ChevronLeft,
	ChevronRight
} from '@material-ui/icons';

const VariableDrawer = (props) => {
	const {
		open,
		variables,
		onVariableChange,
		onClose,
		width
	} = props,
	useStypes = makeStyles((theme) => ({
		drawer: {
			width: width,
			flexShrink: 0,
		},
		drawerPaper: {
			width: width,
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: 'flex-start',
		},
		drawerListItem: {
			marginTop: 10,
			marginBottom: 10
		}
	})),
	theme = useTheme(),
	classes = useStypes(),
	inputVariableKeys = Object.keys(variables);

	/**
	 * closes the drawer of inputs
	 * @param e
	 */
	const handleDrawerClose = e => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
			onClose(e);
		}
	}

	/**
	 * changes the content in state for the input with event
	 * @param e
	 */
	const handleInputChange = e => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
			onVariableChange(e);
		}
	}

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="right"
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
			data-test-id="variable-drawer"
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose} data-test-id={"close-drawer-button"}>
					{theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{inputVariableKeys.map((inputKeyName, keyIndex) => {
					/**
					 * Loop through inputs
					 */
					if (variables[inputKeyName].inDrawer) {
						let customProps = {...variables[inputKeyName]},
							inputProps;
						const isTouched = !!customProps.touched;
						if (customProps.type === "number") { //pass on num props to the input for html5 to do the validation
							let foundNumProps = {};
							foundNumProps.tabIndex = customProps.tabIndex;
							if (!!customProps.min || customProps.min === 0) foundNumProps.min = customProps.min;
							if (!!customProps.max) foundNumProps.max = customProps.max;
							if (!!customProps.step) foundNumProps.step = customProps.step;
							if (Object.values(foundNumProps).length) {
								inputProps = foundNumProps;
							}
						}
						delete customProps.inDrawer;
						delete customProps.inPreview;
						delete customProps.touched;
						delete customProps.usesTemplate;
						delete customProps.tabIndex;
						delete customProps.previousValue;


						return (
							<ListItem key={keyIndex} className={classes.drawerListItem}>
								<TextField fullWidth
									id="standard-number"
								   {...customProps}
									className={isTouched ? "touched" : ""}
								   onChange={handleInputChange}
									InputLabelProps={{
										shrink: true
									}}
								   InputProps={ inputProps }
								/>
							</ListItem>
						);
					}
					return "";
				})}
			</List>
		</Drawer>
	);
}

VariableDrawer.defaultProps = {
	open: false,
	variables: {},
	width: 350
};

VariableDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	variables: PropTypes.object,
	onVariableChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	width: PropTypes.number.isRequired
};

export default VariableDrawer;
