import React from 'react';


class BasicAtom extends React.Component {

    constructor(props, context, state) {
        super(props, context);
        this.state = state ?? {};
    }


    /**
     * Sets this._isMounted when components mount
     */
    componentDidMount() {
        this._isMounted = true;
    }


    /**
     * Sets this._isMounted when components unmount
     */
    componentWillUnmount() {
        this._isMounted = false;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * check if the element is active
     *
     * @return {boolean}
     */
    isActive() {
        return (typeof this.props.active === "boolean")
            ? this.props.active : false;
    }


    isClickable() {
        return (typeof this.props.onClick !== 'undefined');
    }


    /**
     * Is the component mounted
     *
     * @return {boolean}
     */
    isMounted() {
        return this._isMounted ?? false;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Utility
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Gets a string from the className property
     * @return {string}
     */
    getClassNameString() {
        return this.padIfString(this.props.className);
    }


    /**
     * Adds a space (or pad variable) to the start of a string, if the value passed is a string
     * @param str
     * @param pad
     * @returns {string|string}
     */
    padIfString(str, pad) {
        pad = pad ?? ' ';
        return (typeof str === 'string') ? (pad + str) : '';
    }


    /**
     * Use the callback or the or function
     *
     * @param callback
     * @param or
     * @param promise
     * @param rejectPromise
     * @return {function(): Promise<never>|Promise<unknown>|(function())|*}
     */
    callbackOr(callback, or, promise, rejectPromise) {
        promise = promise ?? false;
        rejectPromise = rejectPromise ?? false;

        return (
            callback
            ?? (()=>{
                return promise
                    ? (rejectPromise ? Promise.reject(or) : Promise.resolve(or))
                    : (or ?? (()=>{}));

            })
        );
    }
}

export default BasicAtom;