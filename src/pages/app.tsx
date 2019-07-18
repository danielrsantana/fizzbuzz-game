import * as React from "react";
import FizzBuzzComponent from "../components/fizzbuzz/fizzbuzz";
import shortid from 'shortid';

export const ERRORS = {
    invalidNumber: 'Provided Number Is invalid',
    startNumberGreaterThanEndNumber: 'Start number cannot be greater than end number',
};

export interface ModalState {
    startValue: number;
    maxStartNumber: number;
    errorStartNumber: string;
    endValue: number;
    minEndNumber: number;
    errorEndNumber: string;
    fizzBuzzList: Array<React.ReactNode>;
}

export default class App extends React.Component<{}, ModalState> {
    constructor(props) {
        super(props);

        this.state = {
            startValue: 0,
            maxStartNumber: 999,
            errorStartNumber: '',
            endValue: 20,
            minEndNumber: 1,
            errorEndNumber: '',
            fizzBuzzList: [],
        };
    }

    resetToDefaultState = (): void => {
        this.setState({
            startValue: 0,
            maxStartNumber: 999,
            errorStartNumber: '',
            endValue: 20,
            minEndNumber: 1,
            errorEndNumber: '',
            fizzBuzzList: [],
        });
    }

    onStartValueChanged = (event) => {
        this.setState({
            startValue: event.target.value,
        });
    }

    onEndValueChanged = (event) => {
        this.setState({
            endValue: event.target.value,
        });
    }

    getValidationResult = (): any => {
        const { startValue, endValue } = this.state;
        let errorStartNumber: string = '';
        let errorEndNumber: string = '';

        if (isNaN(startValue)) {
            errorStartNumber = ERRORS.invalidNumber;
        } else if (isNaN(endValue)) {
            errorEndNumber = ERRORS.invalidNumber;
        } else if (startValue > endValue) {
            errorStartNumber = ERRORS.startNumberGreaterThanEndNumber;
        }

        return {
            startMessage: errorStartNumber,
            endMessage: errorEndNumber
        };
    }

    evaluateFizzBuzzList = (): void => {
        const fizzBuzzList: Array<React.ReactNode> = [];
        const { startValue, endValue } = this.state;
        const validation: any = this.getValidationResult();

        if (!validation.startMessage && !validation.endMessage) {
            for (let index = startValue; index < endValue; index++) {
                fizzBuzzList.push(<FizzBuzzComponent number={index} key={shortid.generate()} />);
            }
        }

        this.setState({
            errorStartNumber: validation.startMessage,
            errorEndNumber: validation.endMessage,
            fizzBuzzList,
        });
    }

    renderTitle = (): React.ReactNode => {
        return (
            <div className="appTitle columns is-info">
                <div className="column is-12">
                    <div className="title is-info">Welcome to FizzBuzz App</div>
                    <h3>The rule is simple: Numbers dived by 3: Fizz; Numbers Divided by 5: Buzz; Numbers divided by both, FizzBuzz</h3>
                    <h3><i>(and for the rest? Display the number)</i></h3>
                </div>
            </div>
        );
    }

    renderControls = (): React.ReactNode => {
        const {
            startValue,
            maxStartNumber,
            endValue,
            minEndNumber,
            errorStartNumber,
            errorEndNumber,
        } = this.state;

        return (
            <div className="appControls notification">
                <div className="columns">
                    <div className="column is-12 field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input is-success"
                                        type="number"
                                        placeholder="Start Number"
                                        max={maxStartNumber}
                                        value={startValue}
                                        onChange={this.onStartValueChanged} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-arrow-right"></i>
                                    </span>
                                </p>
                                <p className="help is-danger">{errorStartNumber}</p>
                            </div>
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input className="input is-success"
                                        type="number"
                                        placeholder="End Number"
                                        min={minEndNumber}
                                        value={endValue}
                                        onChange={this.onEndValueChanged} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-arrow-left"></i>
                                    </span>
                                </p>
                                <p className="help is-danger">{errorEndNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-12 field is-grouped is-grouped-right">
                        <div className="control">
                            <button className="button is-text"
                                onClick={this.resetToDefaultState}>Reset</button>
                        </div>
                        <div className="control">
                            <button className="button is-link"
                                onClick={this.evaluateFizzBuzzList}>Analyze</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        const { fizzBuzzList } = this.state;

        return (
            <div className="app container">
                {this.renderTitle()}
                {this.renderControls()}
                <div className="appFizzBuzzList notification">
                    {fizzBuzzList}
                </div>
            </div >
        );
    }
}