import React, { useState, useEffect, useRef } from 'react'; import './CheckboxGroup.css'; import { lines } from './linesArray.js';
import { placementConfig } from './placementConfig.js';  import { checkBoxAnswers } from './checkBoxAnswers.js'; import { toolTips } from './toolTips.js';
export default function CheckboxGroup() { const [selectedCheckboxes, setSelectedCheckboxes] = useState(
  {
    'Flat Highs/Lows, after a Stop run (15m)......': [false, false, false],                  /*  Line 1  */
    'Judas Swing Happened Liquidity Swept': [false, false, false],                    /*  Line 2  */
    'Now Power Hour': [false, false, false],                                          /*  Line 3  */
    'MTW thurs necessary......': [false, false, false],                                /*  Line 4  */
    'ES/NQ Moving Together': [false, false, false],                                    /*  Line 5  */
    'VWAP': [false, false, false],                                                     /*  Line 6  */
    'Buy/Sellside objectives taken before NY open......': [false, false, false],            /*  Line 7  */
    'London swept Asia high/low......': [false, false, false],                               /*  Line 8  */
    'NY Opened within yesterday Day Candle......': [false, false, false],                    /*  Line 9  */
    'Yesterday a Large Range Day......': [false, false, false],                               /*  Line 10 */
    'Consecutive Days Trending - over 1% SP500': [false, false, false, false, false, false],                /*  Line 11 */
    'Consecutive Days Ranging - >.50%': [false, false, false, false, false, false],                          /*  Line 12 */
    'Medium/Higher Impact Economic Calendar Event': [false, false, false,],              /*  Line 13 */
    'Seasonal Tendency......': [false, false, false],                                         /*  Line 14 */
    'ES Looking More......': [false, false, false],                                        /*  Line 15 */
    'NQ Looking More......': [false, false, false],                                        /*  Line 16 */
    'Have a Daily Bias': [false, false, false],                                         /*  Line 17 */
    'Weekly Candle Bodies small, compressed......': [false, false, false],           /* Line 18 */
    'Did Accumulation / Ranging Happen': [false, false, false],                         /*  Line 19 */
    'Discords Opinion': [false, false, false],                                          /*  Line 20 */
    'Topstep People Opinion': [false, false, false],                                     /*  Line 21 */
    'TopTech Direction': [false, false, false],                                          /*  Line 22 */
    'Think London is the Low/High of the Day': [false, false, false],                   /*  Line 23 */
    'Think London was a Reversal': [false, false, false],                                 /*  Line 24 */
    'Think NY is a continuation': [false, false, false],                                 /*  Line 25 */
    'Think NY is a Reversal': [false, false, false],                                     /*  Line 26 */
    'Weekly Prof 🔻 ......': [false, false, false, false, false, false],                                  /*  Line 27 */
    'Weekly Prof ✅ .......': [false, false, false, false, false, false],                                  /*  Line 28 */
    'Potential Daily Patterns......': [false, false, false, false, false, false],                             /*  Line 29 */
    'Monthly Bias/Direction/Targets': [false, false, false],                             /*  Line 30 */
    'Weekly Bias/Direction/Targets': [false, false, false],                              /*  Line 31 */
    'Daily Bias/Direction/Targets': [false, false, false],                               /*  Line 32 */
    '4H Bias/Direction/Targets': [false, false, false],                                  /*  Line 33 */
    'SMT Divergence Intraday/Daily': [false, false, false],                              /*  Line 34 */
    'Xray Levels- IFVG/Break Blocks/Order Blocks etc': [false, false, false],            /*  Line 35 */
    'Consecutive Weeks Trending': [false, false, false],                                 /*  Line 36 */
    'Consecutive Weekly Wicks': [false, false, false],                                   /*  Line 37 */
    'Manipulating Accumulating Trending': [false, false, false],                      /*  Line 38 */
    'Multiple NWOGs crowding same area': [false, false, false],                            /*  Line 39 */
    'Large range overnight-avoid AM, only PM......': [false, false, false],                /*  Line 40 */
    'Bank Holiday/the Day after/Half Day': [false, false, false],                         /*  Line 41 */
    'How High is ES target from bottom': [false, false, false],                           /*  Line 42 */
    'How High is ES target from VWAP': [false, false, false],                              /*  Line 43 */
    'How High % to total Daily target': [false, false, false],                              /*  Line 44 */
    'First/Last few days of month': [false, false, false],                                  /*  Line 45 */     });
const resetButtonRef = useRef(null); const [selectedNamesTopRight, setSelectedNamesTopRight] = useState([]); 
const [selectedNamesRightMiddle, setSelectedNamesRightMiddle] = useState([]); const [selectedNamesBottomRight, setSelectedNamesBottomRight]=useState([]);
const handleKeyDown = (e, index) => {if (e.key === 'Tab') {e.preventDefault();
      if (e.shiftKey) {const previousIndex = (index - 1 + lines.length) % lines.length; document.getElementById(lines[previousIndex]).focus();
      } else {const nextIndex = (index + 1) % lines.length; document.getElementById(lines[nextIndex]).focus();}
    } else if (['1', '2', '3'].includes(e.key)) {const checkboxIndex = parseInt(e.key) - 1; const line = lines[index];
        setSelectedCheckboxes((prevSelected) => ({...prevSelected,
        [line]: prevSelected[line].map((value, i) =>i === checkboxIndex ? !value : value),})); e.stopPropagation(); e.preventDefault();
    } else if (e.key === '0') {resetButtonRef.current.click();}};

const handleCheckboxChange = (line, checkboxIndex) => {setSelectedCheckboxes((prevSelected) => ({
    ...prevSelected,[line]: prevSelected[line].map((value, i) => i === checkboxIndex ? !value : value),}));

const placement = placementConfig[line][checkboxIndex];   const updatedCheckboxValue = !selectedCheckboxes[line][checkboxIndex];
  if (placement === 'rightTop') {updatePlacementList(selectedNamesTopRight, line, updatedCheckboxValue);
    } else if (placement === 'rightMiddle') {updatePlacementList(selectedNamesRightMiddle, line, updatedCheckboxValue);
    } else if (placement === 'rightBottom') {updatePlacementList(selectedNamesBottomRight, line, updatedCheckboxValue);}};
const updatePlacementList = (list, line, addLine) => {const updatedList = new Set(list);
  if (addLine) {updatedList.add(line);} else {updatedList.delete(line);} return Array.from(updatedList);};

useEffect(() => {const topRightNames = []; const bottomRightNames = []; const rightMiddleNames = [];
  lines.forEach((line) => {selectedCheckboxes[line].forEach((isChecked, checkboxIndex) => {
        if (isChecked) {const placement = placementConfig[line][checkboxIndex]; if (placement === 'rightTop') {topRightNames.push(line);
          } else if (placement === 'rightMiddle') {rightMiddleNames.push(line);
          } else if (placement === 'rightBottom') {bottomRightNames.push(line);}}});});
  setSelectedNamesTopRight(topRightNames); setSelectedNamesRightMiddle(rightMiddleNames); setSelectedNamesBottomRight(bottomRightNames);}, [selectedCheckboxes]);
useEffect(() => {document.getElementById(lines[0]).focus();}, []);
useEffect(() => { const checkboxLines = document.querySelectorAll('.checkbox-line[data-tooltip]');
    checkboxLines.forEach((line) => { line.addEventListener('mousemove', handleTooltipMouseMove);
    return () => {line.removeEventListener('mousemove', handleTooltipMouseMove);};});}, []);

const handleTooltipMouseMove = (e) => {const tooltipIndex = e.currentTarget.getAttribute('data-tooltip'); const tooltipText = toolTips[tooltipIndex];
  console.log('Tooltip Index:', tooltipIndex); console.log('Tooltip Text:', tooltipText);};
const handleReset = () => {const resetCheckboxes = {}; lines.forEach((line) => {resetCheckboxes[line] = [false, false, false];}); setSelectedCheckboxes(resetCheckboxes);};

return (<div>
<div className="topSide">
  <button onClick={handleReset} ref={resetButtonRef} className="resetButton">Reset</button>
</div>
<div className="container">
  <div className="leftSide">
    {lines.map((line, index) => (
      <div key={line} id={line} className="checkbox-line" onKeyDown={(e) => handleKeyDown(e, index)} tabIndex="0" data-tooltip={index}>
        <div className="checkboxes">
          {selectedCheckboxes[line].map((isChecked, checkboxIndex) => (
            <label key={checkboxIndex} className="checkbox-label">
              <input type="checkbox" checked={isChecked} onChange={() => handleCheckboxChange(line, checkboxIndex)} />
              <span >{checkBoxAnswers[index][checkboxIndex]}</span></label>))}</div>
        <div className="lineTitle"><p>{line}</p></div>
<div className="tooltip">
    {Array.isArray(toolTips[index]) ? (toolTips[index].map((content, contentIndex) => (
          <img key={contentIndex} src={content} alt={`tooltip-${contentIndex}`} />))
      ) : (<span>{toolTips[index]}</span>)}</div></div>))}</div>
  
  <div className="rightSide">
    <div className="rightTop"><h2>Bearish</h2>
        <ul className="no-bullets-top">{selectedNamesTopRight.map((name, index)=>(<li key={index}>{name}</li>))}</ul></div>

    <div className="rightMiddle">
        <ul className="no-bullets-middle">{selectedNamesRightMiddle.map((name, index)=>(<li key={index}>{name}</li>))}</ul></div>
        
    <div className="rightBottom"><h2>Bullish</h2>
        <ul className="no-bullets-bottom">{selectedNamesBottomRight.map((name, index)=>(<li key={index}>{name}</li>))}</ul></div>

      <div className="redCircle"></div><div className="redCircle2"></div>
      <div className="redCircle3"></div><div className="redCircle4"></div>

        
        </div></div></div>);}