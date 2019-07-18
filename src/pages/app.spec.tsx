import React from "react";
import { shallow } from "enzyme";
import App, { ERRORS } from "./app";

describe("APP Sample Page", () => {
    let wrapper: any = null;

    function setupTestContext(): void {
        wrapper = shallow(<App />);
    }

    it("should render properly", () => {
        setupTestContext();
    });

    it("should reset to default values", () => {
        wrapper.instance().resetToDefaultState();
        const state = wrapper.state();
        expect(state.startValue).toEqual(0);
        expect(state.maxStartNumber).toEqual(999);
        expect(state.errorStartNumber).toEqual('');
        expect(state.endValue).toEqual(20);
        expect(state.minEndNumber).toEqual(1);
        expect(state.errorEndNumber).toEqual('');
        expect(state.fizzBuzzList).toHaveLength(0);
    });

    it("should change state start value", () => {
        const event: any = { target: { value: 100 } };
        wrapper.instance().onStartValueChanged(event);
        const state = wrapper.state();
        expect(state.startValue).toEqual(event.target.value);
    });

    it("should change state end value", () => {
        const event: any = { target: { value: 200 } };
        wrapper.instance().onEndValueChanged(event);
        const state = wrapper.state();
        expect(state.endValue).toEqual(event.target.value);
    });

    it("should validate correctly", () => {
        /* correct values */
        let event: any = { target: { value: 0 } };
        wrapper.instance().onStartValueChanged(event);

        event = { target: { value: 10 } };
        wrapper.instance().onEndValueChanged(event);

        let result = wrapper.instance().getValidationResult();
        expect(result.startMessage).toEqual('');
        expect(result.endMessage).toEqual('');

        /* invalid numbers */
        event = { target: { value: "abcd" } };
        wrapper.instance().onStartValueChanged(event);

        result = wrapper.instance().getValidationResult();
        expect(result.startMessage).toEqual(ERRORS.invalidNumber);

        /* Start number greater than end number */
        event = { target: { value: "100" } };
        wrapper.instance().onStartValueChanged(event);
        event = { target: { value: "10" } };
        wrapper.instance().onEndValueChanged(event);

        result = wrapper.instance().getValidationResult();
        expect(result.startMessage).toEqual(ERRORS.startNumberGreaterThanEndNumber);
    });

    it("should evaluante FizzBuzzList", () => {
        let event: any = { target: { value: 0 } };
        wrapper.instance().onStartValueChanged(event);

        event = { target: { value: 10 } };
        wrapper.instance().onEndValueChanged(event);

        wrapper.instance().evaluateFizzBuzzList();
        expect(wrapper.state().fizzBuzzList).toHaveLength(10);
    });

    it("should render title", () => {
        const titleElement = wrapper.instance().renderTitle();
        const node = shallow(titleElement);
        expect(node.find('.title').text()).toContain('Welcome to FizzBuzz App');
    });

    it("should render controls", () => {
        const controlsElement = wrapper.instance().renderTitle();
        const node = shallow(controlsElement);
        expect(wrapper.find('input')).toHaveLength(2);
        expect(wrapper.find('button')).toHaveLength(2);
    });

    it("should render main element", () => {
        expect(wrapper.find('.app')).toHaveLength(1);
        expect(wrapper.find('.appTitle')).toHaveLength(1);
        expect(wrapper.find('.appControls')).toHaveLength(1);
        expect(wrapper.find('.appFizzBuzzList')).toHaveLength(1);
    });
});