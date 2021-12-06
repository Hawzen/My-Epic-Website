import React, { useState, lazy, Suspense } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  AppBar, 
  Tab, 
  makeStyles, 
  Tabs,
  TabPanel,
  ThemeProvider, 
  Grid, 
  Container,
  Button,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
// // // // Assets
import profileImg from "./assets/profile.jpg";

import assets_logo_githubLogo from "./assets/logos/githubLogo.png";
import assets_logo_twitterLogo from "./assets/logos/twitterLogo.png";
import assets_logo_linkedInLogo from "./assets/logos/linkedinLogo.png";

import assets_distribution2 from "./assets/distribution2.png";

import assets_squareTwitgraph from "./assets/squareTwitgraph.png";

import assets_calbotFonts from "./assets/calbotFonts.png";
// // // //


const SymbolViewerContainer = lazy(() => import( "./symbolViewer/symbolViewerComponent"));
const TriangleCanvasContainer = lazy(() => import("./sketches/trianglesCanvas"));
// App
export default function App() {
  return (
        <div className="App">
          <header className="App-body">
          
            <ThemeProvider theme={theme}>
              <TabsContentContainer/>
            </ThemeProvider>
          </header>
        </div>
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
  const classes = useStyles();
  let [activeTab, activeTabSet] = useState(0);
  // const ContentOutput = (props) => {
  //   return props.contents[props.activeTab];
  // }
  const changeContent = (event, newTab) => {
    activeTabSet(newTab);
  }

  const whichTab = () => {
    switch(activeTab){
      case 0:
        return <HomeContainer/>
      case 1:
        return <WhatboardContainer/>
      case 2:
        return <TwitgraphContainer/>
      case 3:
        return <Calbot/>
      case 4:
        return <SymbolViewerContainer/>
      case 5:
        return <TriangleCanvasContainer density={125} speed={0.03}/>
      default:
        return <HomeContainer/>
    }
    return <div/>
  }
  
  return (
    <div>
      <ScrollableTabsButtonAuto activeTab={activeTab} changeContent={changeContent}/>
      <Suspense fallback="Waiting">
        {whichTab()}
      </Suspense>
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
          <Tab label="Home"/>
          <Tab label="Whatboard"/>
          <Tab label="Twitgraph"/>
          <Tab label="Calbot"/>
          <Tab label="Symbol Viewer"/>
          <Tab label="Sketches"/>
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

function ShowcaseContents(props){
  const classes = useStyles();
  return (
    <Container style={{paddingTop: "3em", paddingBottom: "1em"}} className={classes.generalContainer}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xs={12} sm={12} md={6} xl={7} style={{paddingLeft: "0.0em", paddingRight: "1em"}}>
            <img
              className={props.imageClass}
              style={{borderRadius: "0.5em", boxShadow: "0 0 10px #000000"}}
              src={props.image}
              alt="twitgraph"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} xl={4}>
            <Container style={{marginTop: "1em"}}>
              <h1 style={{marginBottom: "0"}}>{props.title},</h1> 
              <h2 style={{marginTop: ".4em", marginBottom: ".9em"}}>
                {props.description}
              </h2>
              <Button variant="contained" color="primary" href={props.link1Url} target="_blank">
                {props.link1Text}
              </Button> 
              <Button style={{marginLeft: "1em"}} variant="contained" color="secondary" href={props.link2Url} target="_blank">
                {props.link2Text}
              </Button>

            </Container>
          </Grid>
        </Grid>
    </Container>
  );
}

function WhatboardContainer(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Whatboard",
    description: "An online whatsapp chat analysis tool",
    image: assets_distribution2,
    imageClass: classes.containerWhatboardImage,
    link1Url: "https://whatboard.hawzen.me",
    link1Text: "Visit",
    link2Url: "https://github.com/Hawzen/Whatboard",
    link2Text: "Code",
  });
}

function TwitgraphContainer(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Twitgraph",
    description: "Generates an interactive network of social clusters related to any twitter profile",
    image: assets_squareTwitgraph,
    imageClass: classes.containerTwitgraphImage,
    link1Url: "https://twitgraph.hawzen.me/",
    link1Text: "Demo",
    link2Url: "https://github.com/Hawzen/Twitgraph",
    link2Text: "Code",
  });
}

function Calbot(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Calbot",
    description: "Arabic font classifier",
    image: assets_calbotFonts,
    imageClass: classes.containerTwitgraphImage,
    link1Url: "https://calbot.hawzen.me/",
    link1Text: "Demo",
    link2Url: "https://github.com/d7miiZ/Arabic-Font-Detector",
    link2Text: "Code",
  });
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

