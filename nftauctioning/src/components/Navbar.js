import React from 'react'
import '../App.css';

import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6BBB, #FFBE53)',
    border:0,
    fontWeight: 'bold',
    borderRadius: 15,
    marginBottom:15,
    color: 'white',
    padding: '15px 20px',
  },
  space :{
    width:200,
  },
  white :{
    color: '#fff'
  }
})

const theme = createTheme({
  typography:{
    h2: {
      fontSize: 36,
      marginBottom: 15,
    }
  },
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: indigo[900],
    }
  }
})

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <ThemeProvider theme={theme}>
        <div className="App">
        
          <header className="App-header">
          <AppBar>
            <Toolbar>
              <IconButton>
                <Menu className={classes.white}/>
              </IconButton>
              <Typography variant="h6"  className={classes.space}>
                NFT Auctioning
              </Typography>
              <Typography variant="h6" className={classes.space}>
               Live Auctions 
              </Typography>
              <Typography variant="h6" className={classes.space}>
                Recent NFT Sales
              </Typography>
              <Typography variant="h6" className={classes.space}>
                Login
              </Typography>
            </Toolbar>
          </AppBar>
          </header>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default App;

