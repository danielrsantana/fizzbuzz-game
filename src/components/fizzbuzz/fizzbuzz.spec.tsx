import React from "react";
import { shallow } from "enzyme";
import FizzBuzzComponet from "./fizzbuzz";

describe("FizzBuzz Component", () => {
    function createWrapper(number: number):any {
        return shallow(<FizzBuzzComponet number={number} />);
    }

    function getComponent(number: number) {
        return createWrapper(number).find('.fizzBuzzComponent');
    }

    it("should render properly", () => {
        const wrapper = createWrapper(1234);
    });

    it("should return Fizz", () => {
        const testNumber: number = 3;
        const component = getComponent(testNumber);
        expect(component.text()).toEqual('Fizz');
    });

    it("should return Buzz", () => {
        const testNumber: number = 5;
        const component = getComponent(testNumber);
        expect(component.text()).toEqual('Buzz');
    });

    it("should return FizzBuzz", () => {
        const testNumber: number = 15;
        const component = getComponent(testNumber);
        expect(component.text()).toEqual('FizzBuzz');
    });

    it("should return the number", () => {
        const testNumber: number = 17;
        const component = getComponent(testNumber);
        expect(component.text()).toEqual(testNumber.toString());
    });

    it("should match result", () => {
        const testNumber: number = 91;// Math.floor(Math.random() * 1000) + 1;;
        const component = getComponent(testNumber);
        const componentText:string = String(component.text());

        const wrapper = createWrapper(testNumber);
        const methodResult: string = String(wrapper.instance().getFizzBuzzResult(testNumber));
        expect(methodResult).toEqual(componentText);
    });
});