import BasicAtom from "../basicAtom";
import "./pin.css";


class Pin extends BasicAtom {
    componentDidMount() {
        super.componentDidMount();

        let pins = [];
        for (let i = 0; i < this.length; i++) {
            pins[i] = '';
        }

        this.setState({
            "pins": pins,
            "show": false,
        });
    }

    get keysAllowed() {
        return ["1","2","3","4","5","6","7","8","9","0", "Backspace", ''];
    }

    handleKeyPress(e, key) {
        let value = e.key ?? e.target.value;
        let pins = this.state.pins;
        let keysAllowed = this.keysAllowed

        if (value === 'ArrowLeft' && key > 0) {
            this["input" + (key - 1)].focus();
        }

        if (value === 'ArrowRight' && key < (pins.length - 1)) {
            this["input" + (key + 1)].focus();
        }

        if (!keysAllowed.includes(value)) {
            return;
        }

        // check for backspace
        if (value === 'Backspace' || value === '') {
            if (pins[(key)] === '' && key > 0) {
                this["input" + (key - 1)].focus();
            }

            pins[(key)] = '';
        } else {
            pins[key] = value;
            if (key < (pins.length - 1)) {
                this["input" + (key + 1)].focus();
            }
        }



        this.setState({
            "pins": pins,
        });

        this.callbackOr(this.props.onChange)(pins.join(''));
        e.preventDefault();
    }

    handlePaste(e, key) {
        //@todo: handle paste
        e.preventDefault();
        let data = e.clipboardData.getData('Text').trim();
        if (data.length === 1) {
            e.key = data;
            this.handleKeyPress(e, key);
        } else {
            if (data.length === this.length) {
                let valid = true;
                let pins = this.state.pins;

                [...data].forEach(
                    (val, i) => {
                        if (!this.keysAllowed.includes(val)) {
                            valid = false;
                        }
                        pins[i] = val;
                    }
                );

                if (valid) {
                    this.setState({pins: pins});
                    this.callbackOr(this.props.onChange)(pins.join(''));
                }
            }
        }
    }

    handleToggleShow() {
        this.setState({show: !this.state.show})
    }

    render() {
        return (
            <span className={"Pin"}>
                {this.render_inputs()}
                {this.render_hide()}
            </span>
        );
    }

    render_hide() {
        return (
            <span
                className={"toggleShow"}
                onClick={() => {this.handleToggleShow()}}
            >
                <span className={"fa fa-eye" + (this.state.show ? '-slash':'')}/>
            </span>
        );
    }

    render_inputs() {
        let inputs = [];

        for(let i = 0; i < this.length; i++) {
            inputs.push(
                <input
                    className={'pin-input' + ((this.state.show) ? "" : " hiddenInput")}
                    type={"number"}
                    name={"pinNumber" + i}
                    ref={(input) => {this["input" + i] = input}}
                    key={i}
                    value={(this.state.pins ?? [])[i] ?? ''}
                    onKeyDown={(e) => {this.handleKeyPress(e, i)}}
                    onChange={(e) => {this.handleKeyPress(e, i)}}
                    autoComplete={"chrome-off"}
                    maxLength={"1"}
                    onPaste={(e) => {this.handlePaste(e, i)}}
                    required={true}
                />
            );
        }

        return inputs;
    }

    get length() {
        return (this.props.length ?? 4);
    }
}

export default Pin;