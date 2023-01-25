import React from "react";

class Display extends React.Component {
    render() {
        return (
            <div id="display">{this.props.currentDisplay}</div>
        )
    }
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: "0",
            expression: "",
            calcOperation: "",
            pendingCalc: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.regularExp1 = /[+/*]$/;
        this.regularExp2 = /[+-/*][+-/*]$/;
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    handleClick(event) {
        console.log("Button Pushed: " + event.target.id);

        switch (event.target.id) {
            case "clear":
                console.log(event.target.id);
                this.setState({
                    currentDisplay: "0",
                    expression: "",
                    calcOperation: "",
                    pendingCalc: false,
                });
                break;

            case "add":
            case "multiply":
            case "divide":
                console.log("Made it to switch: " + event.target.id);
                console.log("Matches RegEx1? " + this.regularExp1.test(this.state.expression));
                console.log("Matches RegEx2? " + this.regularExp2.test(this.state.expression));

                if (this.regularExp1.test(this.state.expression)) {
                    this.setState({
                        expression: this.state.expression.slice(0, -1) + this.props.calcKeys[event.target.id],
                        calcOperation: event.target.id,
                        pendingCalc: true
                    });
                } else if (this.regularExp2.test(this.state.expression)) {
                    this.setState({
                        expression: this.state.expression.slice(0, -2) + this.props.calcKeys[event.target.id],
                        calcOperation: event.target.id,
                        pendingCalc: true
                    });
                } else {
                    this.setState({
                        expression: this.state.expression + this.props.calcKeys[event.target.id],
                        calcOperation: event.target.id,
                        pendingCalc: true
                    });
                }
                break;

            case "subtract":
                console.log(event.target.id);
                if (this.state.expression.slice(-1) == "-") {
                    this.setState({
                        expression: this.state.expression.slice(0, -1) + "-",
                        calcOperation: "subtract",
                        pendingCalc: true
                    });
                } else {
                    this.setState({
                        expression: this.state.expression + "-",
                        calcOperation: "subtract",
                        pendingCalc: true
                    });
                }
                break;

            case "equals":
                console.log(event.target.id);
                this.setState({
                    currentDisplay: eval(this.state.expression).toString(),
                    expression: eval(this.state.expression).toString(),
                    calcOperation: "",
                    pendingCalc: true
                });
                break;

            case "zero":
                console.log(event.target.id);
                if (this.state.currentDisplay != "0") {
                    if (this.state.pendingCalc) {
                        this.setState({
                            currentDisplay: this.props.calcKeys[event.target.id],
                            expression: this.state.expression + this.props.calcKeys[event.target.id]
                        });
                    } else {
                        this.setState({
                            currentDisplay: this.state.currentDisplay + this.props.calcKeys[event.target.id],
                            expression: this.state.expression + this.props.calcKeys[event.target.id]
                        });
                    }
                }
                break;

            case "decimal":
                console.log(event.target.id);
                if (!(this.state.currentDisplay.includes("."))) {
                    this.setState({
                        currentDisplay: this.state.currentDisplay + this.props.calcKeys[event.target.id],
                        expression: this.state.expression + this.props.calcKeys[event.target.id]
                    });
                }
                break;

            default:
                console.log(event.target.id);
                if (this.state.currentDisplay.length < 20) {
                    if (this.state.currentDisplay === "0") {
                        this.setState({
                            currentDisplay: this.props.calcKeys[event.target.id],
                            expression: this.props.calcKeys[event.target.id]
                        });
                    } else if (this.state.pendingCalc) {
                        this.setState({
                            currentDisplay: this.props.calcKeys[event.target.id],
                            expression: this.state.expression + this.props.calcKeys[event.target.id],
                            pendingCalc: false
                        });
                    } else {
                        this.setState({
                            currentDisplay: this.state.currentDisplay + this.props.calcKeys[event.target.id],
                            expression: this.state.expression + this.props.calcKeys[event.target.id]
                        });
                    }
                }
                break;
        }
    }

    render() {
        return (
            <div id="keyboard">
                <Display currentDisplay={this.state.currentDisplay} />
                {this.props.keyIDs.map((keyID) => (
                    <div id={keyID} className="calcKey" onClick={this.handleClick}>{this.props.calcKeys[keyID]}</div>)
                )}
            </div>
        )
    }
}

export default class App extends React.Component {
    render() {

        let keyIDs = [];
        for (let [ID, displayName] of Object.entries(KEY_IDS)) {
            keyIDs.push(ID);
        }

        //console.log(keyIDs);

        return (
            <div id="container">
                <Keyboard
                    keyIDs={keyIDs}
                    calcKeys={KEY_IDS}
                />
            </div>
        )
    }
}

const KEY_IDS = {
    "clear": "AC",
    "divide": "/",
    "multiply": "*",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "subtract": "-",
    "four": "4",
    "five": "5",
    "six": "6",
    "add": "+",
    "one": "1",
    "two": "2",
    "three": "3",
    "equals": "=",
    "zero": "0",
    "decimal": '.'
}
