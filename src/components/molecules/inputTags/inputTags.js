import BasicAtom from "../../atoms/basicAtom";
import "./inputTags.css";
import FormInput from "../../atoms/formInput/formInput";
import IconClose from "../../atoms/icons/close";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TagFilter from "../../atoms/tagFilter/tagFilter";
import IconAdd from "../../atoms/icons/add";


class InputTags extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            availableTags: props.availableTags ?? [],
            tags: props.existingTags ?? [],
            newTag: '',
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
                    "Input-tags"
                    + this.padIfString(className)
                }
            >
                <FormInput
                    placeholder="Add a tag"
                    value={this.state.newTag}
                    onChange={(e) => {
                        let keepNewTagLower = e.toLowerCase();

                        this.setState({
                            newTag: keepNewTagLower,
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

                <aside className="tags-container">
                    <TransitionGroup>
                        {this.render_added_tags()}
                    </TransitionGroup>
                </aside>

                <div>
                    <p>[TODO] availableTags, passed in as a prop, will only show when a user start typing matching the characters</p>
                    {this.available_tags()}
                </div>
            </div>
        );
    }


    /**
     * already existing tags
     * @returns {unknown[]}
     */
    available_tags() {
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
     * render the tags in the array
     * @returns {unknown[]}
     */
    render_added_tags() {
        return (this.state.tags ?? []).map((tag, index) => {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="fade-in"
                    key={"tag-" + tag.name}
                >
                    <TagFilter
                        className={(this.state.highlight == index ? ' highlight' : '')}
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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * add new tag, clear local state, pass prop for parent to consume
     */
    addNewTag() {
        //  check the tag doesn't already exist in the array
        let isPresent = this.state.tags.some((e) => {
            return e.name === this.state.newTag
        });


        //  if already exists, change UI to show user, this is reset onChange of the input
        if (isPresent) {
            let highlightIndex = this.state.tags.findIndex(tag => tag.name === this.state.newTag);

            this.setState({
                highlight: highlightIndex
            });
        }

        if (this.state.newTag.length && !isPresent) {
            // make sure we clone the existing before updating state array
            let copyTags = [
                ...this.state.tags,
                {
                    'name': this.state.newTag
                }
            ];

            //  then update state/clear down/prop
            this.setState({
                tags: copyTags
            }, () => {
                //  clear the new tag/input
                this.setState({
                    newTag: ''
                });

                //  pass (emit) prop
                this.callbackOr(this.props.onTagsUpdate)(this.state.tags);
            });
        }
    }


    /**
     * remove tag from local state and pass prop
     * @param toRemove
     */
    removeTag(toRemove) {
        let copyTags = [...this.state.tags];

        copyTags.splice(toRemove, 1);

        this.setState({
            tags: copyTags
        }, () => {
            //  pass (emit) prop
            this.callbackOr(this.props.onTagsUpdate)(this.state.tags);
        });
    }

}


export default InputTags;