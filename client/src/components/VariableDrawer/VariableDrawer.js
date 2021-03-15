import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Drawer,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField
} from '@material-ui/core';
import {
	ChevronLeft,
	ChevronRight,
	Refresh
} from '@material-ui/icons';

const VariableDrawer = (props) => {
	const {
		open,
		variables,
		onVariableChange,
		onClose,
		onReset,
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

	const handleDrawerClose = e => {
		if (e) {
			onClose(e);
		}
	}

	const handleVariablesReset = e => {
		if (e) {
			onReset(e);
		}
	}

	const handleInputChange = e => {
		if (e) {
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
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{inputVariableKeys.map((inputKeyName, keyIndex) => {
					if (variables[inputKeyName].inDrawer) {
						let customProps = {...variables[inputKeyName]},
							inputProps;
						const isTouched = !!customProps.touched;
						if (customProps.type === "number") {
							let foundNumProps = {};
							if (!!customProps.min || customProps.min === 0) foundNumProps.min = customProps.min;
							if (!!customProps.max) foundNumProps.max = customProps.max;
							if (!!customProps.step) foundNumProps.step = customProps.step;
							if (Object.values(foundNumProps).length) {
								inputProps = foundNumProps;
							}
						}
						delete customProps.inDrawer;
						delete customProps.touched;

						return (
							<ListItem key={keyIndex} className={classes.drawerListItem}>
								<TextField fullWidth
									id="standard-number"
								   {...customProps}
									className={isTouched ? "touched" : ""}
								   onChange={handleInputChange}
									InputLabelProps={{
										shrink: true,
									}}
								   InputProps={ !!inputProps ? {
								   	   inputProps: inputProps } : {}
								   }
								/>
							</ListItem>
						);
					}
					return "";
				})}
			</List>
			<Divider />
			<List>
				<ListItem button onclick={handleVariablesReset}>
					<ListItemIcon>
						<Refresh />
					</ListItemIcon>
					<ListItemText >
						Reset Variables
					</ListItemText>
				</ListItem>
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
	onReset: PropTypes.func.isRequired,
	width: PropTypes.number.isRequired
};

export default VariableDrawer;
