import React from "react"
import "./die.css";

const Pip = () => <span className="pip"/>;

const Face = ({ children , style}) => <div className="face" style={style}>{children}</div>;

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#e7e7e7",
        boxShadow: props.isHeld ? 'inset 0 5px #59E391, inset 0 -5px #59E391, inset 5px 0 #59E391,inset -5px 0 #59E391' : 'inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7,inset -5px 0 #d7d7d7' 
    }

    let pips = Number.isInteger(props.value)
		? Array(props.value)
				.fill(0)
				.map((_, i) => <Pip key={i} />)
		: null;
    return (
        <div 
            className="die-face" 
            onClick={props.holdDice}
        >
            <Face style={styles}>{pips}</Face>
        </div>
    )
}