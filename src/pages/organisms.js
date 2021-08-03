import React from "react";

import SideBarExample from "../components/organisms/sideBar/example/sideBarExample";
import NonMembersExample from "../components/organisms/nonMembers/example/nonMembersExample";


const PageOrganisms = () => {
    return (
        <div className="figma-like">
            <SideBarExample />
            <NonMembersExample />
        </div>
    );
}


export default PageOrganisms;