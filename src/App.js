import React from "react"
import "./App.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [countTurns, setCountTurns] = React.useState(0)
    const [bestScore, setBestScore] = React.useState(
        parseInt(JSON.parse(localStorage.getItem("best-score"))) || 0
    )

    const [firstGame, setFirstGame] = React.useState(true)
    
    React.useEffect(() => {
        const result = dice.every(die => {
          if(die.isHeld && (die.value === dice[0].value)){
            return true
          }
        })
        setTenzies(result)
    }, [dice])

    React.useEffect(() => {
        if(countTurns && firstGame){
            setBestScore(countTurns)
        }
    }, [countTurns])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(tenzies) {
          setTenzies(false)
          setDice(allNewDice())
          setCountTurns(0)
          setFirstGame(false)
          if(countTurns < bestScore){
            localStorage.setItem("best-score", JSON.stringify(countTurns))
            setBestScore(countTurns)
          }
        } else {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
          setCountTurns(countTurns + 1)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <div className="stats-div">
                <p>High Score: {bestScore}</p>
                <p>Number of rolls: {countTurns}</p>
            </div>
        </main>
    )
}