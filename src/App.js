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
import { Switch, Route, Link } from "react-router-dom";

// // // // Assets
import profileImg from "./assets/profile.jpg";

import assets_logo_githubLogo from "./assets/logos/githubLogo.png";
import assets_logo_twitterLogo from "./assets/logos/twitterLogo.png";
import assets_logo_linkedInLogo from "./assets/logos/linkedinLogo.png";

import assets_distribution2 from "./assets/distribution2.png";

import assets_squareTwitgraph from "./assets/squareTwitgraph.png";

import assets_calbotFonts from "./assets/calbotFonts.png";

import assets_candyBar from "./assets/candyBar.png";

import asset_dialectPredictor from "./assets/dialectPredictor.png"

import asset_phonetics_puzzle from "./assets/phonetics_puzzle.png"

import asset_course_ranking from "./assets/course_ranking.png"

import asset_logo_with_tashkeel_nobackground from "./assets/logo_with_tashkeel_nobackground.png"
import asset_logo_with_tashkeel from "./assets/logo_with_tashkeel.png"

// // // // Costume components
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
      main: '#414d6f',
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
    marginTop: "3em",
    width: "100%",
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
    // float: "right",
    alignItems: "left",
  },
  containerTwitgraphImage: {
    float: "right",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "25em",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30em",
    },
    marginLeft: 0,
    marginRight: 0,
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
  const tabs = {
    0: ["Home", <HomeContainer/>],
    1: ["Twitgraph", <TwitgraphContainer/>],
    2: ["Whatboard", <WhatboardContainer/>],
    3: ["Calbot", <Calbot/>],
    4: ["Dialect Predictor", <DialectPredictor/>],
    5: ["Saheha Bot", <SahehaBot/>],
    6: ["Course Ranking", <CourseRanking/>],
    7: ["Symbols", <SymbolViewerContainer/>],
    8: ["Grades Animator", <CandyBar/>],
    9: ["Phonetics Puzzle", <PhoneticsPuzzle/>],
    10: ["Sketches", <TriangleCanvasContainer density={125} speed={0.03}/>],
  }

  let [activeTab, activeTabSet] = useState(
    (Object.entries(tabs).map( (v, i) => window.location.hash.replace("%20", " ") === `#/${v[1][0]}`).indexOf(true))
  );

  const displayCurrentTab = () => {
    if(activeTab in tabs)
      return tabs[activeTab]
    return <HomeContainer/>
  }

  return (
    <div style={{marginLeft: "0", marginRight: "0", paddingLeft: "0.0em", paddingRight: "1em"}}>
      <ScrollableTabsButtonAuto activeTab={activeTab} tabs={tabs} changeContent={(e, v) => activeTabSet(v)}/>
      <Suspense fallback="Waiting">
        <TriangleCanvasContainer density={125} speed={0.03}/>
        {/* {displayCurrentTab()} */}
        <Switch>
          {/* <Route exact path="/" component={HomeContainer}/> */}
          <Route path="/Whatboard" component={WhatboardContainer}/>
          <Route path="/Twitgraph" component={TwitgraphContainer}/>
          <Route path="/Calbot" component={Calbot}/>
          <Route path="/Dialect Predictor" component={DialectPredictor}/>
          <Route path="/Saheha Bot" component={SahehaBot}/>
          <Route path="/Symbols" component={SymbolViewerContainer}/>
          <Route path="/Sketches"> <TriangleCanvasContainer density={125} speed={0.03}/> </Route>
          <Route path="/Grades Animator" component={CandyBar}/>
          <Route path="/Phonetics Puzzle" component={PhoneticsPuzzle}/>
          <Route path="/Course Ranking" component={CourseRanking}/>
          <Route component={HomeContainer}/> {/* Catch all */}
        </Switch>
      </Suspense>
    </div>
  )
}

// Tabs
function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Suspense fallback="">
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
          {Object.entries(props.tabs).map( (v, i) => <Tab label={v[1][0]} key={i} component={Link} className="MaterialUiTab" to={v[1][0]}/> )}
          </Tabs>
        </AppBar>
      </Suspense>
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
    <div>
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
    </div>
  );
}

function ShowcaseContents(props){
  const classes = useStyles();

  const button2 = props.button2 == undefined ?
                <Button style={{marginLeft: "1em"}} variant="contained" color="secondary" href={props.link2Url} target="_blank">
                  {props.link2Text}
                </Button> : <div/>
  return (
    <Container style={{paddingTop: "3em", paddingBottom: "1em"}} className={classes.generalContainer}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="left">
        <Grid item xs={12} sm={12} md={12} xl={7} style={{marginLeft: "0", marginRight: "0", paddingLeft: "0.0em", paddingRight: "1em"}}>
            <img
              className={props.imageClass}
              style={{borderRadius: "0.5em", boxShadow: "0 0 10px #000000"}}
              src={props.image}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={4}>
            <Container style={{marginTop: "1em"}}>
              <h1 style={{marginBottom: "0"}}>{props.title},</h1> 
              <h2 style={{marginTop: ".4em", marginBottom: ".9em"}}>
                {props.description}
              </h2>
              <Button variant="contained" color="primary" href={props.link1Url} target="_blank">
                {props.link1Text}
              </Button> 
              {button2}

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
    link1Url: "https://github.com/Hawzen/Twitgraph",
    link1Text: "Code",
    button2: false,
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

function SahehaBot(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Saheha",
    description: "Sasheha is an automated correction and shaping bot",
    image: asset_logo_with_tashkeel,
    imageClass: classes.containerWhatboardImage,
    link1Url: "https://twitter.com/saheha_bot",
    link1Text: "Visit",
    link2Url: "https://github.com/Hawzen/Whatboard",
    link2Text: "Code",
    button2: false,
  });
}


function CandyBar(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Grades Animator",
    description: "Animates cumulative changes to a weighted average!",
    image: assets_candyBar,
    imageClass: classes.containerTwitgraphImage,
    link1Url: "https://candy.hawzen.me/",
    link1Text: "Visit",
    link2Url: "https://github.com/Hawzen/Grades-Animator",
    link2Text: "Code",
  });
}

function DialectPredictor(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Dialect Predictor",
    description: "Predicts Arabic dialects using Machine Learning!",
    image: asset_dialectPredictor,
    imageClass: classes.containerWhatboardImage,
    link1Url: "https://arabic.hawzen.me/",
    link1Text: "Visit",
    button2: false,
  });
}

function PhoneticsPuzzle(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Phonetics Puzzle",
    description: "A puzzle about maximizing an anonymous function",
    image: asset_phonetics_puzzle,
    imageClass: classes.containerTwitgraphImage,
    link1Url: "https://phonetics.hawzen.me/",
    link1Text: "Visit",
    link2Url: "https://github.com/Hawzen/Phonetics-Puzzle",
    link2Text: "Code",
  });
}

function CourseRanking(){
  const classes = useStyles();
  return ShowcaseContents({
    title: "Course Ranking",
    description: "Analyzing King Saud University Computer Science Curriculum",
    image: asset_course_ranking,
    imageClass: classes.containerTwitgraphImage,
    link1Url: "https://courses.hawzen.me/",
    link1Text: "Visit",
    link2Url: "https://github.com/Hawzen/Course-Ranking",
    link2Text: "Code",
  });
}

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

