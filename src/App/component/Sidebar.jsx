import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, 
  ExitToApp, 
  ArrowBack, 
  ChevronLeft, 
  ChevronRight,
  Search,
  ExpandLess,
  ExpandMore,
  StarBorder,
  GitHub
} from '@material-ui/icons'
import { 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  InputBase,
  Collapse
} from '@material-ui/core'
import { IoGitCommitSharp } from 'react-icons/io5'
import { GoIssueOpened } from 'react-icons/go'
import clsx from 'clsx'
import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import { useState } from 'react'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  list: {
    width: 200,
    height: 'calc(100%)'
  },
  logout: {
    position: "absolute",
    bottom: 0
  },
  menuList: {
    height: 'calc(100%)'
  }
}))



export default function Sidebar({ children }) {
  
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const history = useHistory()
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(true)

  const list = () => (
    <div className={classes.list} role="presentation" >
      <List className={classes.menuList}>
        <ListItem button onClick={goToSelect}>
            <ListItemIcon>
                <ArrowBack/>
            </ListItemIcon>
            <ListItemText primary="Select"/>
        </ListItem>
        <ListItem button onClick={() => {setMenuOpen(!menuOpen)}}>
        <ListItemIcon>
          <GitHub />
        </ListItemIcon>
        <ListItemText primary="GitHub" />
          {menuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <IoGitCommitSharp size={24.5}/>
              </ListItemIcon>
              <ListItemText primary="Commit" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <GoIssueOpened size={24.5}/>
              </ListItemIcon>
              <ListItemText primary="Issue" />
            </ListItem>
          </List>
        </Collapse>
        
        <ListItem className={classes.logout} button onClick={logout}>
            <ListItemIcon>
                <ExitToApp/>
            </ListItemIcon>
            <ListItemText primary="Logout"/>
        </ListItem>
      </List>
    </div>
  )


  const logout = () => {
		history.push('/login')
  }
  
  const goToSelect = () => {
    history.push("/select")
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        {list()}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
