import BasicAtom from "../../atoms/basicAtom";
import "./messageLabels.css";
import IconClose from "../../atoms/icons/close";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import FormInput from "../../atoms/formInput/formInput";
import TagMessage from "../../atoms/tagMessage/tagMessage";
import TagLabel from "../../atoms/tagLabel/tagLabel";


class MessageLabels extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableLabels: props.availableLabels ?? [],
            isAvailableVisible: false,
            newLabel: '',
            addedLabels: props.alreadyAddedLabels ?? [],
            highlight: -1
        };
    }


    /**
     * main render
     */
    render(props) {
        /**
         * deconstruct some props
         */
        let { className } = this.props;

        return (
            <div
                className={
                    "Message-labels"
                    + this.padIfString(className)
                }
            >
                <div className="labels-container">
                    <TransitionGroup component={null}>
                        {this.render_added_labels()}
                    </TransitionGroup>

                    {this.render_adding_label()}
                </div>
            </div>
        );
    }


    /**
     * already added labels
     * @returns {unknown[]}
     */
    render_added_labels() {
        return (this.state.addedLabels ?? []).map((label, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"added-label-" + label.name}
                >
                    <TagLabel
                        className={this.state.highlight == index ? ' highlight' : ''}
                        onClick={() => {
                            this.removeTag(index);
                        }}
                        key={"label-" + label.name}
                    >
                        {label.name}

                        <IconClose />
                    </TagLabel>
                </CSSTransition>
            );
        });
    }


    /**
     * labels that are available to add from pre-existing list
     * @returns {JSX.Element}
     */
    render_adding_label() {
        return (
            <div className="adding-container">
                <FormInput
                    className={!this.state.addedLabels.length ? 'empty' : ''}
                    placeholder="Add labels here"
                    value={this.state.newLabel}
                    onFocus={() => {
                        this.setState({
                            isAvailableVisible: true
                        })
                    }}
                    onBlur={() => {
                        this.setState({
                            newLabel: ''
                        })

                        //  without timeout the click event on the option doesn't fire
                        setTimeout(() => {
                            this.setState({
                                isAvailableVisible: false
                            })
                        }, 100)
                }}
                    onChange={(e) => {
                        this.setState({
                            newLabel: e
                        });
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" || e.key === ',') {
                            this.addLabel(e.target.value);
                        }
                    }}
                />

                <CSSTransition
                    in={this.state.isAvailableVisible}
                    classNames="fade-and-slide-in"
                    timeout={100}
                    key={"message-label"}
                    unmountOnExit
                >
                    <aside className="available-container">
                        {this.render_available_labels()}
                    </aside>
                </CSSTransition>

            </div>
        );
    }

    /**
     * show the existing labels a user can add
     * @returns {unknown[]}
     */
    render_available_labels() {
        return (this.state.availableLabels ?? []).map((label, index) => {
            if (label.name.substr(0, (this.state.newLabel.length)) === this.state.newLabel) {
                return (
                    <span
                        onClick={() => {
                            this.addLabel(label.name);
                        }}
                        key={label.name}
                    >
                    {label.name}
                </span>
                );
            }
            return '';
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * add label to available labels
     * @param toAdd
     */
    addLabel(toAdd) {
        //  check the label doesn't already exist in the array
        let isPresent = this.state.addedLabels.some((e) => {
            return e.name === toAdd
        });

        //  if present set the index for UI
        if (isPresent) {
            let highlightIndex = this.state.addedLabels.findIndex(label => label.name === toAdd);

            this.setState({
                highlight: highlightIndex
            });
        }

        //  make sure can only be added once (UI will prevent this from happening, but safer)
        if (!isPresent && toAdd.length) {
            // make sure we clone the existing before updating state array
            let copyTags = [
                ...this.state.addedLabels,
                {
                    'name': toAdd
                }
            ];

            //  then update both selected and available and callback for api
            this.setState({
                isAvailableVisible: true,
                addedLabels: copyTags,
                newLabel: ''
            }, () => {
                //  pass (emit) prop
                this.callbackOr(this.props.onLabelsUpdate)(this.state.addedLabels);
            });
        }
    }


    /** check to see if label has been added
     *
     * @param labelName
     * @returns {boolean}
     */
    alreadyExists(labelName) {
        //  check the label doesn't already exist in the array
        let alreadyAdded = this.state.addedLabels.some((e) => {
            return e.name === labelName
        });

        return alreadyAdded;
    }


    /**
     * remove label from what's been added
     * @param toRemove
     */
    removeTag(toRemove) {
        let copyTags = [...this.state.addedLabels];

        copyTags.splice(toRemove, 1);

        this.setState({
            addedLabels: copyTags
        }, () => {
            //  pass (emit) prop
            this.callbackOr(this.props.onLabelsUpdate)(this.state.addedLabels);
        });
    }
}


export default MessageLabels;