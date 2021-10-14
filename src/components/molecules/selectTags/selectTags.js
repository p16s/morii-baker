import BasicAtom from "../../atoms/basicAtom";
import "./selectTags.css";
import IconClose from "../../atoms/icons/close";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TagMessage from "../../atoms/tagMessage/tagMessage";


class SelectTags extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableTags: props.availableTags ?? [],
            selectedTags: [],
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
                    "Select-tags"
                    + this.padIfString(className)
                }
            >
                <div className="selected-tags-container">
                    <TransitionGroup component={null}>
                        {this.render_selected_tags()}

                        {
                            this.state.selectedTags.length === 0
                                ?
                                    "No tags selected"
                                : ''
                        }
                    </TransitionGroup>
                </div>

                <aside className="tags-container">
                    <TransitionGroup component={null}>
                        {this.render_available_tags()}
                    </TransitionGroup>
                </aside>
            </div>
        );
    }




    /**
     * render the tags in the array
     * @returns {unknown[]}
     */
    render_selected_tags() {
        return (this.state.selectedTags ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"selected-tag-" + tag.name}
                >
                    <TagMessage
                        className="added"
                        onClick={(e) => {
                            this.removeTag(index);
                        }}
                    >
                        {tag.name}

                        <IconClose />
                    </TagMessage>
                </CSSTransition>
            );
        });
    }

    /**
     * show the existing tags a user can add
     * @returns {unknown[]}
     */
    render_available_tags() {
        return (this.state.availableTags ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"available-tag-" + tag.name}
                >
                    <TagMessage
                        className={(this.alreadyExists(tag.name) ? " hidden" : '')}
                        onClick={() => {
                            this.addTagToSelected(tag.name);
                        }}
                        key={"tag-" + tag.name}
                    >
                        {tag.name}
                    </TagMessage>
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
    addTagToSelected(toAdd) {
        //  check the tag doesn't already exist in the array
        let isPresent = this.state.selectedTags.some((e) => {
            return e.name === toAdd
        });

        //  make sure can only be added once (UI will prevent this from happening, but safer)
        if (!isPresent) {
            // make sure we clone the existing before updating state array
            let copyTags = [
                ...this.state.selectedTags,
                {
                    'name': toAdd
                }
            ];

            //  then update both selected and available and callback for api
            this.setState({
                selectedTags: copyTags
            }, () => {
                //  following will remove the requested tag from the available array (but putting back will re-index)
                // let indexInAvailable = this.state.availableTags.findIndex(tag => tag.name === toAdd);
                // console.log("avail tag index, ", indexInAvailable);
                //
                // let removeFromExisting = [...this.state.availableTags];
                // removeFromExisting.splice(indexInAvailable, 1);
                // this.setState({
                //     availableTags: removeFromExisting
                // })

                //  pass (emit) prop
                this.callbackOr(this.props.onTagsUpdate)(this.state.selectedTags);
            });
        }
    }


    /** check to see if tag has been added, if so a class will be applied to hide
     *
     * @param tagName
     * @returns {boolean}
     */
    alreadyExists(tagName) {
        //  check the tag doesn't already exist in the array
        let alreadyAdded = this.state.selectedTags.some((e) => {
            return e.name === tagName
        });

        return alreadyAdded;
    }


    /**
     * remove tag from selected (puts back in available)
     * @param toRemove
     */
    removeTag(toRemove) {
        let copyTags = [...this.state.selectedTags];

        copyTags.splice(toRemove, 1);

        this.setState({
            selectedTags: copyTags
        }, () => {
            //  pass (emit) prop
            this.callbackOr(this.props.onTagsUpdate)(this.state.selectedTags);
        });
    }
}


export default SelectTags;