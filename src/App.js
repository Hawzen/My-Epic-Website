import React, { useState, lazy, Suspense } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  AppBar, 
  Tab, 
  makeStyles, 
  Tabs, 
  ThemeProvider, 
  Grid, 
  Container,
  Button,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

// // // // Assets
import profileImg from "./assets/profile.jpg";

import assets_logo_githubLogo from "./assets/logos/githubLogo.png";
import assets_logo_twitterLogo from "./assets/logos/twitterLogo.png";
import assets_logo_linkedInLogo from "./assets/logos/linkedinLogo.png";

import assets_distribution2 from "./assets/distribution2.png";

import assets_squareTwitgraph from "./assets/squareTwitgraph.png";
// // // //

const Dialect = lazy(() => import("./dialect/dialect"));

const SymbolViewerContainer = lazy(() => import( "./symbolViewer/symbolViewerComponent"));
const TriangleCanvasContainer = lazy(() => import("./sketches/trianglesCanvas"));
// App
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/dialect">
        <Suspense fallback={<div>Loading...</div>}>
          <Dialect/>
        </Suspense>
      </Route>
      <Route>

        <div className="App">
          <header className="App-body">
          
            <ThemeProvider theme={theme}>
              <TabsContentContainer/>
            </ThemeProvider>
          </header>
        </div>
        
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

// Style
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4C566A',
      main: '#434C5E',
      dark: '#2E3440',
    },
    secondary: {
      light: '#ECEFF4',
      main: '#E5E9F0' ,
      dark: '#D8DEE9',
    },
  },
});

/*
Nord pallet
#2E3440
#3B4252
#434C5E
#4C566A

#D8DEE9
#E5E9F0
#ECEFF4
 */

const useStyles = makeStyles((theme) => ({
  root: {

  },
  generalContainer: {
    marginTop: "3em"
  },
  containerProfileImage: {
    borderRadius: "50%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "100%",
    },
  },
  containerWhatboardImage: {
    // borderRadius: "50%",
    // [theme.breakpoints.down("xs")]: {
    //   maxWidth: "100%",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   maxWidth: "25em",
    // },
    marginLeft: 0,
    maxWidth: "20em",
  },
  containerTwitgraphImage: {
    // marginRight: "4em",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "25em",
    },
    marginLeft: 0,
  },
  center: {
    justify: "center",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  socialsLogo: {
    maxWidth: "2em",
    // boxShadow: "0 0 4px #4C566A"
  }
}));

// Tabs and content container
function TabsContentContainer(){
  let [activeTab, activeTabSet] = useState(4);
  // const ContentOutput = (props) => {
  //   return props.contents[props.activeTab];
  // }
  const changeContent = (event, newTab) => {
    activeTabSet(newTab);
  }
  
  return (
    <div>
      <ScrollableTabsButtonAuto activeTab={activeTab} changeContent={changeContent}/>
      {/* <ContentOutput contents={contents} activeTab={activeTab}/> */}
      <Switch>
        <Route exact path="/">
          <HomeContainer key="home"/>
        </Route>
        <Route path="/Whatboard">
          <WhatboardContainer key="whatboard"/>
        </Route>
        <Route path="/TwitgraphSite">
          <TwitgraphContainer key="Twitgraph"/>
        </Route>
        <Route path="/Sketches">
          <Suspense fallback={<div>Loading...</div>}>
            <TriangleCanvasContainer density={125} speed={0.03} key="Triangle"/>
          </Suspense>
        </Route>
        <Route path="/SymbolViewer">
          <Suspense fallback={<div>Loading...</div>}>
            <SymbolViewerContainer/>
          </Suspense>
        </Route>
      </Switch>
    </div>
  )
}

// Tabs
function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="primary">
        <Tabs
          value={props.activeTab}
          onChange={props.changeContent}
          indicatorColor="primary"
          // justify="center"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <RouterLink onChange={props.changeContent} to="/" style={{color: "black", textDecoration: "none"}}>
            <Tab label="Home"/>
          </RouterLink>
          <RouterLink onChange={props.changeContent} to="/Whatboard" style={{color: "black", textDecoration: "none"}}>
            <Tab label="Whatboard"/>
          </RouterLink>
          <RouterLink onChange={props.changeContent} to="/TwitgraphSite" style={{color: "black", textDecoration: "none"}}>
            <Tab label="Twitgraph"/>
          </RouterLink>
          <RouterLink onChange={props.changeContent} to="/Sketches" style={{color: "black", textDecoration: "none"}}>
            <Tab label="Sketches"/>
          </RouterLink>
          <RouterLink onChange={props.changeContent} to="/SymbolViewer" style={{color: "black", textDecoration: "none"}}>
            <Tab label="Symbol Viewer"/>
          </RouterLink>
        </Tabs>
      </AppBar>
    </div>
  );
}

// // Content
function GeneralContainer(props){
  const classes = useStyles();
  return (
    <Container style={{paddingTop: "3em"}} className={classes.generalContainer}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm={6} md={5} style={{paddingLeft: "3em"}}>
            {props.left}
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            {props.right}
          </Grid>
        </Grid>
    </Container>
  );
}

// Home
function HomeContainer(){
  const classes = useStyles();
  return (
    <Container>
      <GeneralContainer 
        left={<img src={profileImg} alt="profile" className={classes.containerProfileImage}/>}
        right={
              <Container>
                <h1 style={{marginBottom: "0"}}>Hi,</h1> 
                <h2 style={{marginTop: ".4em", marginBottom: ".9em"}}>
                  This website is a personal repository of projects.&nbsp;
                  <a style={{color: '#4C566A', fontSize: "0.7em"}} href="https://www.nordtheme.com/" target="_blank" rel="noreferrer">❄️</a>
                </h2>
                <SocialsLogos spacing={3}/>
              </Container>
              }
      />
    </Container>
  );
}

// Whatboard
function WhatboardContainer(){
  const classes = useStyles();
  return (
    <Container style={{paddingTop: "3em"}} className={classes.generalContainer}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs={12} sm={12} md={5} style={{paddingLeft: "1em"}}>
            <img
              className={classes.containerWhatboardImage}
              style={{borderRadius: "0.5em", boxShadow: "0 0 10px #000000"}}
              src={assets_distribution2}
              alt="distirbution"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Container style={{marginTop: "1em"}}>
              <h1 style={{marginBottom: "0"}}>Whatboard,</h1> <h2 style={{marginTop: ".4em", marginBottom: ".9em"}}>An online whatsapp chat analysis tool</h2>
              <Button variant="contained" color="primary" href="https://whatboard.hawzen.me" target="_blank">
                Visit
              </Button> 
              <Button style={{marginLeft: "1em"}} variant="contained" color="secondary" href="https://github.com/Hawzen/Whatboard" target="_blank">
                Code
              </Button>

            </Container>
          </Grid>
        </Grid>
    </Container>
  );
}

// Twitgraph
function TwitgraphContainer(){
  const classes = useStyles();
  return (
    <Container style={{paddingTop: "3em", paddingBottom: "1em"}} className={classes.generalContainer}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xs={12} sm={12} md={6} xl={7} style={{paddingLeft: "0.5em"}}>
            <img
              className={classes.containerTwitgraphImage}
              style={{borderRadius: "0.5em", boxShadow: "0 0 10px #000000"}}
              src={assets_squareTwitgraph}
              alt="twitgraph"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} xl={4}>
            <Container style={{marginTop: "1em"}}>
              <h1 style={{marginBottom: "0"}}>Twitgraph,</h1> <h2 style={{marginTop: ".4em", marginBottom: ".9em"}}>Generates an interactive network of social clusters related to any twitter profile</h2>
              <Button variant="contained" color="primary" href="https://hawzen.me/twitgraph" target="_blank">
                Demo
              </Button> 
              <Button style={{marginLeft: "1em"}} variant="contained" color="secondary" href="https://github.com/Hawzen/Twitgraph" target="_blank">
                Code
              </Button>

            </Container>
          </Grid>
        </Grid>
    </Container>
  );
}


// Sketch
// Imported TriangleCanvasContainer component from triangleCanvas.js

// Unicode
// function Unistring(){
//   let [i, setI] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => setI(i+3), 100);
//     return () => {
//       clearInterval(interval);
//     };
//   }, [i]);

  
//   return <Container style={{marginTop: "1em", fontSize: "10em", color: "white"}}>{String.fromCharCode(i+2)} {String.fromCharCode(i+1)} {String.fromCharCode(i)}</Container>
// }

// Utils
function SocialsLogos(props){
  const classes = useStyles();
  return (
    <Grid container spacing={props.spacing}>
      <Grid item>
        <a rel="noreferrer" target="_blank" href="https://github.com/Hawzen"><img alt="github"  src={assets_logo_githubLogo} className={classes.socialsLogo}/></a>
      </Grid>
      <Grid item>
        <a rel="noreferrer" target="_blank" href="https://twitter.com/MohndAlrasheed"><img alt="twitter" src={assets_logo_twitterLogo} className={classes.socialsLogo}/></a>
      </Grid>
      <Grid item>
        <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/mohand-alrasheed/"><img alt="linkedin" src={assets_logo_linkedInLogo} className={classes.socialsLogo}/></a>
      </Grid>
    </Grid>
  );
}

