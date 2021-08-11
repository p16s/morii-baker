import React from "react";

import SideBarExample from "../components/organisms/sideBar/example/sideBarExample";
import NonMembersExample from "../components/organisms/nonMembers/example/nonMembersExample";
import LoginExample from "../components/organisms/login/example/loginExample";


const PageOrganisms = () => {
    return (
        <div className="figma-like">
            <SideBarExample />
            <NonMembersExample />
            <LoginExample />
        </div>
    );
}


export default PageOrganisms;