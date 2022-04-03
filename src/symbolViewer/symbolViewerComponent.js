import { useState, lazy } from "react";
import { 
    Grid, 
    makeStyles, 
    useMediaQuery, 
    useTheme, 
    Slider, 
    Typography, 
    Container, 
    Collapse,
    Button,
    Switch,
    Select,
    MenuItem,
    FormControl,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import useInterval from 'react-useinterval';

import {naming_ranges, BLOCKS} from "./rangesAndBlocks.js";
import unicode from "unicode/category/";

let fullUnicode = {}
for(const [, vals] of Object.entries(unicode)){
    Object.assign(fullUnicode, vals)
}
let fullUnicodeKeys = Object.keys(fullUnicode)

export default function SymbolViewerContainer(){
    let [delay, setDelay] = useState(500); // Miliseconds
    let [lastDelay, setLastDelay] = useState(0);
    let startingPoint = 65;
    let [cursor, setCursor] = useState(startingPoint); // Decimal number, represents char code 
    let [keyCursor, setKeyCursor] = useState(startingPoint); // Tracks the current key in fullUnicode
    let [plusMinus, setPlusMinus] = useState(1);
    let [symbol, setSymbol] = useState("");

    const classes = useStyles();

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    
    const justifyQurey = () => {
        return sm ? "center" : "space-between"
    };

    const updateSymbol = () => {
        let charData = parseUnicodeDecimal(cursor)
        setSymbol(charData)
    }

    useInterval(() => {
        updateSymbol()
        setCursor(prev => prev + plusMinus);
    }, delay)

    
    const parseUnicodeDecimal = (decimal) => {
        /**
         * 1- Check if symbol exists in fullunicode, if it does serve it and remember the key
         * 2- If not search if its in the ranges specified by naming_ranges, if it does then serve it
         * 3- If you're at step 3, that means the code hasn't been assigned, use the key you saved from last serve of 
         *  step 1, and jump one index from that
         */
        let charData = fullUnicode[decimal];
        if (charData !== undefined){
            setKeyCursor(decimal)
            return {
                char: charData["symbol"],
                code: charData["value"],
                name: charData["name"],
                generalCategory: abbrivationToCategory[[charData.category]],
                upperCase: charData["uppercase_mapping"] ? String.fromCharCode(parseInt(charData["uppercase_mapping"], 16)) : undefined,
                lowerCase: charData["lowercase_mapping"] ? String.fromCharCode(parseInt(charData["lowercase_mapping"], 16)) : undefined,
            };
        }
        
        for(let range of naming_ranges){
            if(range.start < decimal && decimal <= range.end){
                const hex = decimal.toString(16);
                return {
                    char: String.fromCharCode(decimal),
                    code: hex,
                    name: `${range.name}${hex}`,
                    generalCategory: abbrivationToCategory[[range.category]]
                };        
            }
        }
        
        let lastIndex = fullUnicodeKeys.indexOf(String(keyCursor)) + 1
        let nextKey = parseInt(fullUnicodeKeys[lastIndex])
        setCursor(nextKey);
        return parseUnicodeDecimal(nextKey);
    }

    const toggleDelay = () => {
        if(delay === 1000000000){
            setDelay(lastDelay);
        }
        else {
            setLastDelay(delay);
            setDelay(1000000000);
        }
    }
    
    return <Grid container justify={justifyQurey()} alignItems="center" className={classes.symbolViewer}> 
                <Grid item xs={8} sm={7} md={6}>
                    <DisplayContainer toggleDelay={toggleDelay} symbol={symbol}/>
                </Grid>
                <Grid item xs={8} sm={7} md={6}>
                    <InfoContainer symbol={symbol} cursor={cursor} setCursor={setCursor} 
                        updateSymbol={updateSymbol} toggleDelay={toggleDelay} setDelay={setDelay}
                        setPlusMinus={setPlusMinus}
                        />
                </Grid>
            </Grid>;
}

function IncrementDecrementCursor(props){
    let setCursor = props.setCursor;
    let updateSymbol = props.updateSymbol;
    let toggleDelay = props.toggleDelay;

    const classes = useStyles();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.only("xs"));
    const sm = useMediaQuery(theme.breakpoints.only("sm"));
    const md = useMediaQuery(theme.breakpoints.only("md"));
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    
    const spacingQurey = () => {
        if(xs) return 0
        if(sm) return 3
        if(md) return 6
        if(lg) return 10
    };

    const sizeQuery = () => {
        if(xs) return "small"
        else
            return "large"
    };

    const incrementCursor = (n) => {
        setCursor(props.cursor + n);
        updateSymbol(props.cursor);
    }

    return (
        <Grid container spacing={spacingQurey()}>
            <Grid item>
                <Button 
                className={classes.IncrementDecrementButtons}
                size={sizeQuery()} 
                color="primary" 
                variant="contained" 
                onClick={() => incrementCursor(-1)}>
                    <Typography variant="subtitle1" color="secondary" style={{fontSize: sizeQuery()}}>
                        {"<<"}
                    </Typography>
                </Button>
            </Grid>
            <Grid item>
            <Button 
                className={classes.IncrementDecrementButtons}
                size={sizeQuery()} 
                color="primary" 
                variant="contained" 
                onClick={() => toggleDelay()}>
                    <Typography variant="subtitle1" color="secondary" style={{fontSize: sizeQuery()}}>
                        =
                    </Typography>
                </Button>
            </Grid>
            <Grid item>
            <Button 
                className={classes.IncrementDecrementButtons}
                size={sizeQuery()} 
                color="primary" 
                variant="contained" 
                onClick={() => incrementCursor(1)}>
                    <Typography variant="subtitle1" color="secondary" style={{fontSize: "1em"}}>
                        {">>"}
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

// Display
function DisplayContainer(props){
    // let toggleDelay = props.toggleDelay;

    let classes = useStyles();

    return (
        <Grid container direction="row" justify="center" className={classes.displayContainer}>
            <Grid item className={classes.displayFont}>
                {props.symbol.char}
            </Grid>
        </Grid>
    );
}

// Info
function InfoContainer(props){
    let [isOpen, setIsOpen] = useState(true);
    const classes = useStyles();
    const symbol = props.symbol;
    
    return (
        <Container>
            <Collapse collapsedHeight="7px" className={classes.infoCollapse} in={isOpen}> 

                    <Grid container className={classes.infoContainer} alignItems="center" justify="space-evenly" >
                        <Container disableGutters={true}>
                            {
                                Object.entries({
                                    Name: symbol.name, 
                                    Category: symbol.generalCategory, 
                                    Decompostion: symbol.decompostion, 
                                    Value: symbol.numeric,
                                    Lower: symbol.lowerCase,
                                    Upper: symbol.upperCase,
                                }).map(([key, val]) => {
                                    if(val)
                                        return  (
                                            <Grid item xs={12} key={key} style={{width: "100%", margin: "0"}}>
                                                <Grid container spacing={0} direction="row" justify="space-between" style={{textOverflow: "hidden"}}>
                                                    <Grid item>
                                                        <code className={classes.infoFontKey}>
                                                            {key}
                                                        </code>
                                                    </Grid>
                                                    <Grid item>
                                                        <code className={classes.infoFontVal}>
                                                            {val}
                                                        </code>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    return <div key={key}/>
                                    }
                                )
                            }
                        </Container>
                        <Grid item style={{marginTop: "1em"}}>
                            <IncrementDecrementCursor 
                                cursor={props.cursor} 
                                setCursor={props.setCursor} 
                                updateSymbol={props.updateSymbol}
                                toggleDelay={props.toggleDelay}    
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop: "0.4em"}}>
                            <Grid container style={{MozOutlineColor: "green"}} direction="row" justify="space-between">
                                <Grid item>
                                    <code className={classes.infoFontKey}>
                                        Speed
                                    </code>
                                </Grid>
                                <Grid item xs={10}>
                                
                                    <Slider
                                        color="secondary"
                                        marks
                                        defaultValue={10}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(n => Math.round(n / 10))}
                                        min={1}
                                        max={100}
                                        step={10}
                                        onChange={(e, n) => {
                                            if(props.cursor < 0)
                                                return;
                                            props.setDelay(1/n * 10000);
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{marginTop: "0.5em"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox color="secondary"
                                            onChange={e => e.target.checked ? props.setPlusMinus(-1) : props.setPlusMinus(1)}
                                            />}
                                        label="Reversed"
                                    />
                                </Grid>
                                <Grid item xs={12} style={{marginTop: "0.5em", justify: "start  "}}>
                                    <BlockSelect setCursor={props.setCursor}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </Collapse>
            <Grid container >
                <Grid item className={classes.infoBottomBar}>
                    <Typography variant="inherit" color="secondary" style={{}}>
                        {symbol.code}/10FFFF
                    </Typography>
                </Grid>
                <Grid item className={classes.infoBottomBar}>
                    <Switch onChange={() => setIsOpen(!isOpen)}/>
                </Grid>
            </Grid>
        </Container>
    )
}

function BlockSelect(props){

    let [selectVal, setSelectVal] = useState(0);

    const handleSelect = (e) => {
        const decimal = e.target.value
        props.setCursor(decimal);
        setSelectVal(decimal);
    }

    return (
        <FormControl>
            <Select 
            color="secondary"
            variant="filled"
            value={selectVal}
            onChange={handleSelect}>
                {BLOCKS.map(block => <MenuItem value={block.start} key={block.name}>{block.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

// Theme
const useStyles = makeStyles((theme) => ({
    symbolViewer: {
        
        [theme.breakpoints.down("sm")]: {
            paddingTop: "5em", 
        },
        [theme.breakpoints.up("md")]: {
            paddingTop: "7em", 
        }
    },
    displayContainer: {
        margin: "auto",
        [theme.breakpoints.only("xs")]: {
            width: "15em",
            maxWidth: "15em",
            padding: "3em",
        },
        [theme.breakpoints.only("sm")]: {
            width: "15em",
            maxWidth: "15em",
        },
        [theme.breakpoints.up("md")]: {
            width: "15em",
            maxWidth: "15em",
            marginBottom: "12em",
            height: "7em",
            maxHeight: "10em"
        }
    },
    displayFont: {
        textShadow: "3px 1px 12px black",
        [theme.breakpoints.only("xs")]: {
            fontSize: "7em"
        },
        [theme.breakpoints.only("sm")]: {
            fontSize: "7em"
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "10em",
        }
    },
    infoContainer: {
        padding: "1em",
        backgroundColor:  "#434C5E", //"#4C566A",
        textAlign: "center",
        [theme.breakpoints.only("xs")]: {
            overflow: "auto",
            height: "12em",
        },
        [theme.breakpoints.only("sm")]: {
            overflow: "auto",
            height: "10em",
        },
        [theme.breakpoints.only("md")]: {
            overflow: "auto",
            height: "10em",
            maxHeight: "10em",
        },
        [theme.breakpoints.up("lg")]: {
            overflow: "auto",
            width: "20em",
            maxWidth: "20em",
            height: "13em",
            maxHeight: "13em",
        }
    },
    infoCollapse: {
        boxShadow: "0 0 8px black",
        margin: "auto",
        [theme.breakpoints.only("xs")]: {
            marginTop: "1em",
            width: "12.2em",
            maxWidth: "12.2em",
            marginRight: "1.5em",
            overflow: "auto",
            height: "auto",
        },
        [theme.breakpoints.only("sm")]: {
            width: "15em",
            maxWidth: "15em",
            marginTop: "1.5em",
            overflow: "auto",
            height: "auto",
        },
        [theme.breakpoints.only("md")]: {
            width: "15em",
            maxWidth: "15em",
            height: "auto",
            overflow: "auto"
        },
        [theme.breakpoints.up("lg")]: {
            width: "20em",
            maxWidth: "20em",
            height: "auto",
        }
    },
    infoFontKey: {
        fontFamily: "monospace",
        fontStyle: "italic",
        color: "white",
        fontSize: "0.5em",
    },
    infoFontVal: {
        position: "static",
        fontFamily: "monospace",
        color: "white",
        fontSize: "0.5em",
        overflow: "hidden",
        width: "100%",
        margin: "0",
    },
    infoSettings: {
        padding: "0",
        width: "100%",
    },
    IncrementDecrementButtons: {
        [theme.breakpoints.only("xs")]: {
            maxWidth: '40px', 
            minWidth: '40px', 
        },
    },
    infoBottomBar: {
        margin: "auto", 
        padding: "auto",
        right: 0,
        [theme.breakpoints.down("sm")]:{
            paddingLeft: "1em"
        },
        [theme.breakpoints.down("xs")]:{
            paddingLeft: "5em"
        },
    },
}));


let abbrivationToCategory = {
    Lu:	"Uppercase Letter",
    Ll:	"Lowercase Letter",
    Lt:	"Titlecase Letter",
    Lm:	"Modifier Letter",
    Lo:	"Other Letter",
    Mn:	"Nonspacing Mark",
    Mc:	"Spacing Mark",
    Me:	"Enclosing Mark",
    Nd:	"Decimal Number",
    Nl:	"Letter Number",
    No:	"Other Number",
    Pc:	"Connector Punctuation",
    Pd:	"Dash Punctuation",
    Ps:	"Open Punctuation",
    Pe:	"Close Punctuation",
    Pi:	"Initial Punctuation",
    Pf:	"Final Punctuation",
    Po:	"Other Punctuation",
    Sm:	"Math Symbol",
    Sc:	"Currency Symbol",
    Sk:	"Modifier Symbol",
    So:	"Other Symbol",
    Zs:	"Space Separator",
    Zl:	"Line Separator",
    Zp:	"Paragraph Separator",
    Cc:	"Control",
    Cf:	"Format",
    Cs:	"Surrogate",
    Co:	"Private_Use",
    Cn:	"Unassigned",
}
