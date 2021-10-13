import BasicAtom from "../../atoms/basicAtom";
import "./senderTags.css";
import IconClose from "../../atoms/icons/close";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import FormInput from "../../atoms/formInput/formInput";


class SenderTags extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableTags: props.availableTags ?? [],
            isAvailableTagsVisible: false,
            newTag: '',
            addedTags: [
                {
                    "name": "added_tag1"
                },
                {
                    "name": "added_tag2"
                }
            ],
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
                    "Select-tags"
                    + this.padIfString(className)
                }
            >
                <div className="tags-container">
                    <TransitionGroup component={null}>
                        {this.render_added_tags()}
                    </TransitionGroup>

                    {this.render_adding_tag()}
                </div>
            </div>
        );
    }


    /**
     * already added tags
     * @returns {unknown[]}
     */
    render_added_tags() {
        return (this.state.addedTags ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"added-tag-" + tag.name}
                >
                    <span
                        className={
                            "tag"
                            + (this.state.highlight == index ? ' highlight' : '')
                        }
                        onClick={() => {
                            this.removeTag(index);
                        }}
                        key={"tag-" + tag.name}
                    >
                        {tag.name}

                        <IconClose />
                    </span>
                </CSSTransition>
            );
        });
    }


    /**
     * tags that are available to add from pre-existing list
     * @returns {JSX.Element}
     */
    render_adding_tag() {
        return (
            <div className="adding-container">
                <FormInput
                    placeholder="Type your tag here"
                    value={this.state.newTag}
                    onFocus={() => {
                        this.setState({
                            isAvailableTagsVisible: true
                        })
                    }}
                    onBlur={() => {
                        this.setState({
                            newTag: ''
                        })

                        //  without timeout the click event on the option doesn't fire
                        setTimeout(() => {
                            this.setState({
                                isAvailableTagsVisible: false
                            })
                        }, 100)
                }}
                    onChange={(e) => {
                        this.setState({
                            newTag: e
                        });
                    }}
                    onKeyPress={(e) => {
                        this.startFiltering(e.target.value);

                        e.key === 'Enter' || e.key === ','? this.addTag(e.target.value) : ''
                    }}
                />

                <CSSTransition
                    in={this.state.isAvailableTagsVisible}
                    timeout={100}
                    classNames="fade-and-slide-in"
                    key={"available-tag-sdasdas"}
                    unmountOnExit
                >
                    <aside className="available-container">
                        {this.render_available_tags()}
                    </aside>
                </CSSTransition>

            </div>
        );
    }


    /**
     * show the existing tags a user can add
     * @returns {unknown[]}
     */
    render_available_tags() {
        return (this.state.availableTags ?? []).map((tag, index) => {
            return (
                <span
                    onClick={() => {
                        this.addTag(tag.name);
                    }}
                >
                    {tag.name}
                </span>
            );
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * filter the available tags as user types
     * @param e
     */
    startFiltering(e) {
        this.setState({
            isAvailableTagsVisible: true
        });

        //  TODO not clear on how to filter/sort
    }


    /**
     * add tag to available tags
     * @param toAdd
     */
    addTag(toAdd) {
        //  check the tag doesn't already exist in the array
        let isPresent = this.state.addedTags.some((e) => {
            return e.name === toAdd
        });

        //  if present set the index for UI
        if (isPresent) {
            let highlightIndex = this.state.addedTags.findIndex(tag => tag.name === toAdd);

            this.setState({
                highlight: highlightIndex
            });
        }

        //  make sure can only be added once (UI will prevent this from happening, but safer)
        if (!isPresent) {
            // make sure we clone the existing before updating state array
            let copyTags = [
                ...this.state.addedTags,
                {
                    'name': toAdd
                }
            ];

            //  then update both selected and available and callback for api
            this.setState({
                isAvailableTagsVisible: false,
                addedTags: copyTags,
                newTag: ''
            }, () => {
                //  pass (emit) prop
                this.callbackOr(this.props.onTagsUpdate)(this.state.addedTags);
            });
        }
    }


    /** check to see if tag has been added
     *
     * @param tagName
     * @returns {boolean}
     */
    alreadyExists(tagName) {
        //  check the tag doesn't already exist in the array
        let alreadyAdded = this.state.addedTags.some((e) => {
            return e.name === tagName
        });

        return alreadyAdded;
    }


    /**
     * remove tag from what's been added
     * @param toRemove
     */
    removeTag(toRemove) {
        let copyTags = [...this.state.addedTags];

        copyTags.splice(toRemove, 1);

        this.setState({
            addedTags: copyTags
        }, () => {
            //  pass (emit) prop
            // this.callbackOr(this.props.onTagsUpdate)(this.state.addedTags);
        });
    }
}


export default SenderTags;