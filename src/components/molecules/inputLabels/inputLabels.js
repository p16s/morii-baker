import BasicAtom from "../../atoms/basicAtom";
import "./inputLabels.css";
import FormInput from "../../atoms/formInput/formInput";
import IconClose from "../../atoms/icons/close";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TagLabel from "../../atoms/tagLabel/tagLabel";


class InputLabels extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableTags: props.availableTags ?? [],
            labels: props.existingTags ?? [],
            newLabel: '',
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
                    "Input-labels"
                    + this.padIfString(className)
                }
            >
                <FormInput
                    placeholder="Add a label"
                    value={this.state.newLabel}
                    onChange={(e) => {
                        let keepNewLower = e.toLowerCase();

                        this.setState({
                            newLabel: keepNewLower,
                            highlight: -1
                        });
                    }}
                    onEnter={() => {
                        this.addNewTag();
                    }}
                />
                {/*<span className="add-tag-cta">*/}
                {/*    <IconAdd />*/}
                {/*</span>*/}

                <aside className="labels-container">
                    <TransitionGroup>
                        {this.render_added_labels()}
                    </TransitionGroup>
                </aside>

                <div>
                    {this.available_labels()}
                </div>
            </div>
        );
    }


    /**
     * already existing labels
     * @returns {unknown[]}
     */
    available_labels() {
        return (this.state.availableTags ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"available-tag-" + tag.name}
                >
                    {/*TODO make appear as a list as you type*/}
                   <span>{tag.name}, </span>
                </CSSTransition>
            );
        });
    }



    /**
     * render the labels in the array
     * @returns {unknown[]}
     */
    render_added_labels() {
        return (this.state.labels ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"tag-" + tag.name}
                >
                    <TagLabel
                        className={(this.state.highlight == index ? ' highlight' : '')}
                        onClick={(e) => {
                            this.removeTag(index);
                        }}
                    >
                        {tag.name}

                        <IconClose />
                    </TagLabel>
                </CSSTransition>
            );
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * add new tag, clear local state, pass prop for parent to consume
     */
    addNewTag() {
        //  check the tag doesn't already exist in the array
        let isPresent = this.state.labels.some((e) => {
            return e.name === this.state.newLabel
        });


        //  if already exists, change UI to show user, this is reset onChange of the input
        if (isPresent) {
            let highlightIndex = this.state.labels.findIndex(tag => tag.name === this.state.newLabel);

            this.setState({
                highlight: highlightIndex
            });
        }

        if (this.state.newLabel.length && !isPresent) {
            // make sure we clone the existing before updating state array
            let copyTags = [
                ...this.state.labels,
                {
                    'name': this.state.newLabel
                }
            ];

            //  then update state/clear down/prop
            this.setState({
                labels: copyTags
            }, () => {
                //  clear the new tag/input
                this.setState({
                    newLabel: ''
                });

                //  pass (emit) prop
                this.callbackOr(this.props.onTagsUpdate)(this.state.labels);
            });
        }
    }


    /**
     * remove tag from local state and pass prop
     * @param toRemove
     */
    removeTag(toRemove) {
        let copyTags = [...this.state.labels];

        copyTags.splice(toRemove, 1);

        this.setState({
            labels: copyTags
        }, () => {
            //  pass (emit) prop
            this.callbackOr(this.props.onTagsUpdate)(this.state.labels);
        });
    }

}


export default InputLabels;