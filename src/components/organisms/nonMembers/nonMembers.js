import BasicAtom from "../../atoms/basicAtom";
import './nonMembers.css';
import SlideOut from "../../molecules/slideOut/slideOut";
import TitleBar from "../../molecules/titleBar/titleBar";
import FormInput from "../../molecules/input/input";
import Table from "../../molecules/table/table";
import Button from "../../atoms/button/button";
import ModalCenter from "../../molecules/modalCenter/modalCenter";
import Input from "../../molecules/input/input";
import IconSpinner from "../../atoms/icons/spinner";
import React from "react";
import IconAdd from "../../atoms/icons/add";


class NonMembers extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            isAddingNewUser: false,
            newUserName: '',
            newUserEmail: '',
            searchVal: '',
        });
    }
    __validateEmail(email) {
        let tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if (!email) return false;

        let emailParts = email.split('@');

        if(emailParts.length !== 2) return false

        let account = emailParts[0];
        let address = emailParts[1];

        if(account.length > 64) return false

        else if(address.length > 255) return false

        let domainParts = address.split('.');
        if (domainParts.some(function (part) {
            return part.length > 63;
        })) return false;

        return tester.test(email);
    }


    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <>
                <SlideOut
                    className={"Non-members"}
                    toggleName={"Add members"}
                >
                    {this.render_header_area()}

                    {this.render_added_members()}
                </SlideOut>

                {this.render_add_user()}
            </>
        );
    }


    /**
     * render the header
     * @returns {JSX.Element}
     */
    render_header_area() {
        return (
            <TitleBar>
                <h2>Non members</h2>
                <form>
                    <FormInput
                        inputClass={"search"}
                        placeholder={"Search for non-member"}
                        onChange={val => {
                            this.setState({
                                searchVal: val,
                            });
                        }}
                    />
                </form>
                <Button
                    className={"outline"}
                    onClick={() => {
                        this.setState({
                            isAddingNewUser: true
                        });
                    }}
                >
                    + Invite new user
                </Button>
            </TitleBar>
        );
    }


    /**
     * render the main table
     */
     render_table_data() {
        const tbody = [];

        this.props.users.forEach((user, index) => {
            if (this.state.searchVal === ''
                || (user.name ?? '').toLowerCase().includes(this.state.searchVal.toLowerCase())
                || (user.username ?? '').toLowerCase().includes(this.state.searchVal.toLowerCase())
                || (user.phone ?? '').toLowerCase().includes(this.state.searchVal.toLowerCase())
            )
            tbody.push(
                [
                    user.name,
                    user.username,
                    user.phone,
                    <span
                        className="add-non-member-to-group-cta"
                        onClick={() => {
                            this.handleAddToGroup(user);
                        }}
                    >
                        <IconAdd />
                        Add
                    </span>

                ]
            );
        });

        return tbody;
    }


    /**
     * render table of users
     * @returns {JSX.Element}
     */
    render_added_members() {
        if (this.props.users && this.props.users.length) {
            return (
                <Table
                    thead={[
                        "Name",
                        "Email",
                        "Phone number",
                        "Add to group",
                    ]}
                    tbody={this.render_table_data()}
                />
            );
        } else {
            return (
                <>
                    <Table
                        thead={[
                            "Name",
                            "Email",
                            "Phone number",
                            "Add to group",
                        ]}
                    />

                    {this.render_no_members()}
                </>
            );
        }
    }


    /**
     * empty render
     * @returns {JSX.Element}
     */
    render_no_members() {
        return (
            <div className={"no-users"}>
                <svg className={"icon"} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.0003 0.666641C16.107 0.666641 11.3337 5.43997 11.3337 11.3333C11.3337 17.2266 16.107 22 22.0003 22C27.8937 22 32.667 17.2266 32.667 11.3333C32.667 5.43997 27.8937 0.666641 22.0003 0.666641ZM27.6001 11.3334C27.6001 8.24004 25.0934 5.73337 22.0001 5.73337C18.9067 5.73337 16.4001 8.24004 16.4001 11.3334C16.4001 14.4267 18.9067 16.9334 22.0001 16.9334C25.0934 16.9334 27.6001 14.4267 27.6001 11.3334ZM38.2667 35.3334C38.2667 33.6267 29.9201 29.7334 22.0001 29.7334C14.0801 29.7334 5.7334 33.6267 5.7334 35.3334V38.2667H38.2667V35.3334ZM0.666992 35.3333C0.666992 28.24 14.8803 24.6666 22.0003 24.6666C29.1203 24.6666 43.3337 28.24 43.3337 35.3333V43.3333H0.666992V35.3333Z" fill="#E3E5EB"/>
                </svg>

                <h3>No non-members</h3>
            </div>
        );
    }


    /**
     * render add user (modal)
     */
    render_add_user() {
        return (
            <ModalCenter
                isActive={this.state.isAddingNewUser}
                onClose={() => {
                    this.setState({
                       isAddingNewUser: false
                    });
                }}
            >
                <h1 className="heading">Invite new user</h1>

                <form>
                    <Input
                        for={"name"}
                        labelText={"Name"}

                        id={"name"}
                        value={this.state.newUserName}
                        placeholder={"E.g. John Smith"}
                        onChange={(e) => {
                            this.setState({
                                newUserName: e
                            });
                        }}
                    />

                    <Input
                        for={"email"}
                        labelText={"Email"}

                        id={"email"}
                        value={this.state.newUserEmail}
                        placeholder={"E.g. johnsmith@email.com"}
                        onChange={(e) => {
                            this.setState({
                                newUserEmail: e
                            });
                        }}
                        onEnter={(e) => {
                            this.inviteNewUser(e);
                        }}
                    />

                    <aside className="ctas">
                        <Button
                            className="outline"
                            onClick={(e) => {
                                this.cancelAddingUser(e);
                            }}
                            type="button"
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={
                                this.isLoading
                                || (
                                    !this.state.newUserName.length
                                    || !this.state.newUserEmail.length
                                    || !this.__validateEmail(this.state.newUserEmail)
                                )
                            }
                            onClick={(e) => {
                                this.inviteNewUser(e);
                            }}
                            type="button"
                        >
                            Invite user

                            {this.isLoading ? <IconSpinner /> : null}
                        </Button>
                    </aside>
                </form>
            </ModalCenter>
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * cancel the add, clear the data
     * @param e
     */
    cancelAddingUser(e) {
        e.preventDefault();

        this.setState({
            isAddingNewUser: false,
            newUserName: '',
            newUserEmail: ''
        });
    }


    /**
     * invite method
     * @param e
     */
    inviteNewUser(e) {
        //  make sure requirements met then can submit
        if (
            !this.isLoading
            && (
                this.state.newUserName.length &&
                this.state.newUserEmail.length &&
                this.__validateEmail(this.state.newUserEmail)
            )
        ) {
            e.preventDefault();
            this.isLoading = true;
            let that = this;

            if (typeof this.props.onInvite !== 'undefined') {
                this.props.onInvite(
                    () => {
                        that.isLoading = false;
                        that.setState({
                            isAddingNewUser: false
                        });
                    },
                    () => {
                        that.isLoading = false;
                    },
                    this.state.newUserName,
                    this.state.newUserEmail
                );
            } else {
                setTimeout(() => {
                    console.log('FAKE add user');
                    that.isLoading = false;
                    that.setState({
                        isAddingNewUser: false
                    });
                }, 1000);
            }
        }
    }

    /**
     * add to group CTA
     * @param e
     */
    handleAddToGroup(e) {
        this.callbackOr(this.props.onAddToGroup)(e);
    }
}


export default NonMembers;