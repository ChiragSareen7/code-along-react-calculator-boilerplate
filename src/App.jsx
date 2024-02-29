import { useReducer } from 'react'
import './App.css'
import Button from './Components/Button';
import Oprator from './Components/Oprator';

export const ACTIONS = {
  ADD_DIGIT: 'ADD_DIGIT',
  ADD_OPERATOR: 'ADD_OPERATOR',
  EVAL: 'EVAL',
  ALL_CLEAR: 'ALL_CLEAR',
  DELETE: 'DEL'
};


function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overWrite){
        return {currentOperand: action.payload.digit,
                overWrite: false}
      }
    if(action.payload.digit === "0" && state.currentOperand === "0"){
      return state
    }

    if(action.payload.digit == "." && (state.currentOperand || "").includes(".")){
      return state
    }
    return{
      ...state,
      currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
    }
  case ACTIONS.ADD_OPERATOR:
    if(state.currentOperand == null && state.previousOperand == null){
      return state
    }
 if(state.currentOperand == null){
      return {
        ...state,
        operator: action.payload.operator
      }
    }

    if(state.previousOperand == null){
      return {
        ...state,
        previousOperand: state.currentOperand,
        currentOperand: null,
        operator: action.payload.operator
      }
    }
    return {
      ...state,
      previousOperand: answer(state),
      operator: action.payload.operator,
      currentOperand: null
    }

case ACTIONS.DELETE:
    if(state.overWrite){
      return{
        ...state,
        overWrite:false,
        currentOperand: null
      }
    }
    if (state.currentOperand == null) return state
    if (state.currentOperand.length == 1) {
      return {...state, currentOperand: null}
    }
    return {
      ...state,
      currentOperand: state.currentOperand.slice(0, -1)
    }
case ACTIONS.EVAL:
    if(
      state.operator == null ||state.currentOperand == null ||state.previousOperand == null 
    ){
      return state
    } return {
      ...state,
      overWrite: true,
      previousOperand:null,
      operator : null,
      currentOperand :answer(state)
    }
case ACTIONS.ALL_CLEAR:
    return {
      ...state,
      currentOperand:null,
      previousOperand:null,
      operator:null
    }}
}


const format = new Intl.NumberFormat("en-us", {
   maximumFractionDigits: 0,
})

function options (operand){
if (operand == null) return
const [integer, decimal] = operand.split(".")
if (decimal == null) return format.format(integer)
return `${format.format(integer)}.${decimal}`
}

function answer(state){
  const {previousOperand, currentOperand, operator} = state
  const [previous, current] = [
    parseFloat(previousOperand) || 0, parseFloat(currentOperand) || 0
  ];
  
  let sign = ""
  switch(operator){
    case "+":
    sign =  previous + current
    break
    case "-":
      sign =  previous - current
   break
      case "*":
      sign =  previous * current
    break
      case "/":
      sign =  previous / current
   break
  }
  return sign.toString() 
}

function App() {

  const [state, dispatch] = useReducer(reducer, {previousOperand: null, currentOperand: null, operator: null, overWrite: false})


  return (

    <div className='container'>
      <div className='display'>
        <div>{options(state.previousOperand)} {state.operator}</div>
        <div>{options(state.currentOperand)} </div>
      </div>
      <div className='functioning-coontainer'>
      <div className='calculation'>
      <button className='action'
        onClick={() => dispatch({type: ACTIONS.ALL_CLEAR})}
        >
        clear all
    </button>
    <button className='items'
    onClick={() => dispatch({type: ACTIONS.DELETE})}
        >
        Delete
    </button>
      <Oprator operator="+" dispatch={dispatch} />
      <Button digit="1" dispatch={dispatch} />
      <Button digit="2" dispatch={dispatch} />
      <Button digit="3" dispatch={dispatch} />
      <Oprator operator="-" dispatch={dispatch} />
      <Button digit="4" dispatch={dispatch} />
      <Button digit="5" dispatch={dispatch} />
      <Button digit="6" dispatch={dispatch} />
      <Oprator operator="*" dispatch={dispatch} />
      <Button digit="7" dispatch={dispatch} />
      <Button digit="8" dispatch={dispatch} />
      <Button digit="9" dispatch={dispatch} />
      <Oprator operator="/" dispatch={dispatch} />
      <Button digit="0" dispatch={dispatch} />
      <Button digit="." dispatch={dispatch} />
      <button className='number span_two'
        onClick={() => dispatch({type: ACTIONS.EVAL})}
        >
        =
    </button>
      </div>
      </div>
    </div>
  )
}

export default App