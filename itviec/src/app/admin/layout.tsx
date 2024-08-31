'use client';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { menuItems } from '@/constants';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	}),
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSubMenuToggle = (text: string) => {
		setOpenSubMenu((prev) => (prev === text ? null : text));
	};

	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body>
				<Box sx={{ display: 'flex' }}>
					<CssBaseline />
					<AppBar position="fixed" open={open}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								sx={{ mr: 2, ...(open && { display: 'none' }) }}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" noWrap component="div">
								TRANG QUẢN TRỊ
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						sx={{
							width: drawerWidth,
							flexShrink: 0,
							'& .MuiDrawer-paper': {
								width: drawerWidth,
								boxSizing: 'border-box',
							},
						}}
						variant="persistent"
						anchor="left"
						open={open}
					>
						<DrawerHeader>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'ltr' ? (
									<ChevronLeftIcon />
								) : (
									<ChevronRightIcon />
								)}
							</IconButton>
						</DrawerHeader>
						<Divider />
						<List>
							{menuItems.map((item) => (
								<React.Fragment key={item.text}>
									<ListItem disablePadding>
										{item.subMenu.length > 0 ? (
											// Item with submenu
											<ListItemButton
												onClick={() => handleSubMenuToggle(item.text)}
											>
												<ListItemText primary={item.text} />
												<IconButton edge="end">
													{openSubMenu === item.text ? (
														<ExpandLess />
													) : (
														<ExpandMore />
													)}
												</IconButton>
											</ListItemButton>
										) : (
												<ListItemButton component="a" href={item.href || '#'}>
													<ListItemText primary={item.text} />
												</ListItemButton>
										)}
									</ListItem>

									<Collapse in={openSubMenu === item.text}>
										<List component="div" disablePadding>
											{item.subMenu.map((subItem) => (
												<ListItem key={subItem.text} disablePadding>
													<Link
														href={subItem.href}
														passHref
														legacyBehavior
													>
														<ListItemButton
															component="a"
															sx={{ pl: 4 }}
														>
															<ListItemText primary={subItem.text} />
														</ListItemButton>
													</Link>
												</ListItem>
											))}
										</List>
									</Collapse>
								</React.Fragment>
							))}
						</List>
						<Divider />
					</Drawer>
					{/* --body-- */}
					<Main open={open}>
						<DrawerHeader />
						{children}
					</Main>
				</Box>
			</body>
		</html>
	);
}
