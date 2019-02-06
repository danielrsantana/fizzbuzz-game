import * as React from "react";

export interface FizzBuzzComponentProps {
    number: number;
}

export default class FizzBuzzComponent extends React.Component<FizzBuzzComponentProps, {}> {
    getFizzBuzzResult(number): string {
        return (number % 3 ? '' : 'Fizz') + (number % 5 ? '' : 'Buzz') || number;
    }

    render() {
        const { number } = this.props;

        return (
            <div className="fizzBuzzComponent columns">
                {this.getFizzBuzzResult(number)}
            </div>
        );
    }
}