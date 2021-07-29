import BasicAtom from "../../atoms/basicAtom";
import './nonMembers.css';
import SlideOut from "../../molecules/slideOut/slideOut";
import TitleBar from "../../molecules/titleBar/titleBar";
import Input from "../../molecules/input/input";
import Tag from "../../atoms/tag/tag";
import Table from "../../molecules/table/table";
import Button from "../../atoms/button/button";


class NonMembers extends BasicAtom {
    constructor(props) {
        super(props);

        this.setState({
           users: null
        });
    }


    componentDidMount() {
        // fake an api response/data
        this.setState({
            users: this.state.users = [
                [
                    <strong>Ann Curtis</strong>,
                    'anncurtis@gmail.com',
                    '355-298-0908%',
                    <Button
                        className={"minimal"}
                        onClick={() => {
                            this.handleButtonClick()
                        }}
                    >
                        + Add
                    </Button>
                ],
                [
                    <strong>Ann Curtis</strong>,
                        'anncurtis@gmail.com',
                        '355-298-0908%',
                    <Button
                        className={"minimal"}
                        onClick={() => {
                            this.handleButtonClick()
                        }}
                    >
                        + Add
                    </Button>
                ]
            ],
        });
    }


    render(className, props) {
        return (
            <SlideOut
                className={"Non-members"}
                toggleName={"Non-members"}
            >
                {this.render_header_area()}

                {this.render_added_members()}
            </SlideOut>
        );
    }


    render_header_area() {
        return (
            <TitleBar>
                <h2>Non members</h2>

                <Button
                    className={"outline"}
                    onClick={() => {
                        this.inviteUser()
                    }}
                >
                    + Invite new user
                </Button>

                <form>
                    <Input
                        placeholder={"E.g. John Smith"}
                    />
                </form>
            </TitleBar>
        );
    }


    render_added_members() {
        if (this.state.users && this.state.users.length) {
            return (
                <Table
                    thead={[
                        "Name",
                        "Email",
                        "Phone number",
                        "Add to group",
                    ]}
                    tbody={this.state.users}
                />
            );
        } else {
            return (
                this.render_no_members()
            );
        }
    }

    render_no_members() {
        return (
            <div class={"no-users"}>
                <svg class={"icon"} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0003 0.666641C16.107 0.666641 11.3337 5.43997 11.3337 11.3333C11.3337 17.2266 16.107 22 22.0003 22C27.8937 22 32.667 17.2266 32.667 11.3333C32.667 5.43997 27.8937 0.666641 22.0003 0.666641ZM27.6001 11.3334C27.6001 8.24004 25.0934 5.73337 22.0001 5.73337C18.9067 5.73337 16.4001 8.24004 16.4001 11.3334C16.4001 14.4267 18.9067 16.9334 22.0001 16.9334C25.0934 16.9334 27.6001 14.4267 27.6001 11.3334ZM38.2667 35.3334C38.2667 33.6267 29.9201 29.7334 22.0001 29.7334C14.0801 29.7334 5.7334 33.6267 5.7334 35.3334V38.2667H38.2667V35.3334ZM0.666992 35.3333C0.666992 28.24 14.8803 24.6666 22.0003 24.6666C29.1203 24.6666 43.3337 28.24 43.3337 35.3333V43.3333H0.666992V35.3333Z" fill="#E3E5EB"/>
                </svg>

                <h3>No non-members</h3>
            </div>
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    inviteUser() {
        alert("inviteUser method, used to clear the users to test the UI");

        this.setState({
            users: this.state.users = null
        });
    }


    handleButtonClick() {
        alert("Add clicked");
    }

}


export default NonMembers;