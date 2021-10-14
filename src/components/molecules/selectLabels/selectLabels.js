import BasicAtom from "../../atoms/basicAtom";
import "./selectLabels.css";
import IconClose from "../../atoms/icons/close";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TagFilter from "../../atoms/tagFilter/tagFilter";


class SelectLabels extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableLabels: props.availableLabels ?? [],
            selectedLabels: [],
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
                    "Select-labels"
                    + this.padIfString(className)
                }
            >
                <div className="selected-container">
                    <TransitionGroup>
                        {this.render_selected_labels()}

                        {
                            this.state.selectedLabels.length === 0
                                ?
                                    "No labels selected"
                                : ''
                        }
                    </TransitionGroup>
                </div>

                <aside className="labels-container">
                    <TransitionGroup>
                        {this.render_available_labels()}
                    </TransitionGroup>
                </aside>
            </div>
        );
    }




    /**
     * render the tags in the array
     * @returns {unknown[]}
     */
    render_selected_labels() {
        return (this.state.selectedLabels ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"selected-tag-" + tag.name}
                >
                    <TagFilter
                        className="added"
                        onClick={(e) => {
                            this.removeTag(index);
                        }}
                    >
                        {tag.name}

                        <IconClose />
                    </TagFilter>
                </CSSTransition>
            );
        });
    }

    /**
     * show the existing tags a user can add
     * @returns {unknown[]}
     */
    render_available_labels() {
        return (this.state.availableLabels ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"available-tag-" + tag.name}
                >
                    <TagFilter
                        className={(this.alreadyExists(tag.name) ? " hidden" : '')}
                        onClick={() => {
                            this.addLabelToSelected(tag.name);
                        }}
                        key={"tag-" + tag.name}
                    >
                        {tag.name}
                    </TagFilter>
                </CSSTransition>
            );
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * add an existing tag to the selected
     * @param toAdd
     */
    addLabelToSelected(toAdd) {
        //  check the tag doesn't already exist in the array
        let isPresent = this.state.selectedLabels.some((e) => {
            return e.name === toAdd
        });

        //  make sure can only be added once (UI will prevent this from happening, but safer)
        if (!isPresent) {
            // make sure we clone the existing before updating state array
            let copyLabels = [
                ...this.state.selectedLabels,
                {
                    'name': toAdd
                }
            ];

            //  then update both selected and available and callback for api
            this.setState({
                selectedLabels: copyLabels
            }, () => {
                //  following will remove the requested tag from the available array (but putting back will re-index)
                // let indexInAvailable = this.state.availableLabels.findIndex(tag => tag.name === toAdd);
                // console.log("avail tag index, ", indexInAvailable);
                //
                // let removeFromExisting = [...this.state.availableLabels];
                // removeFromExisting.splice(indexInAvailable, 1);
                // this.setState({
                //     availableLabels: removeFromExisting
                // })

                //  pass (emit) prop
                this.callbackOr(this.props.onTagsUpdate)(this.state.selectedLabels);
            });
        }
    }


    /** check to see if tag has been added, if so a class will be applied to hide
     *
     * @param filterName
     * @returns {boolean}
     */
    alreadyExists(filterName) {
        //  check the tag doesn't already exist in the array
        let alreadyAdded = this.state.selectedLabels.some((e) => {
            return e.name === filterName
        });

        return alreadyAdded;
    }


    /**
     * remove tag from selected (puts back in available)
     * @param toRemove
     */
    removeTag(toRemove) {
        let copyLabels = [...this.state.selectedLabels];

        copyLabels.splice(toRemove, 1);

        this.setState({
            selectedLabels: copyLabels
        }, () => {
            //  pass (emit) prop
            this.callbackOr(this.props.onTagsUpdate)(this.state.selectedLabels);
        });
    }
}


export default SelectLabels;