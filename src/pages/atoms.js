import React from "react";

import LabelExample from "../components/atoms/label/example/labelExample";
import FormInputExample from "../components/atoms/formInput/example/formInputExample";
import FormInputPhoneExample from "../components/atoms/formInputPhone/example/formInputPhoneExample";
import FormPinExample from "../components/atoms/formPin/example/formPinExample";
import FormTextareaExample from "../components/atoms/formTextarea/example/formTextareaExample";
import ButtonExample from "../components/atoms/button/example/buttonExample";
import AlertExample from "../components/atoms/alert/example/alertExample";
import TagExample from "../components/atoms/tag/example/tagExample";
import CheckboxExample from "../components/atoms/checkbox/example/checkboxExample";
import ToggleExample from "../components/atoms/toggle/example/toggleExample";
import TabExample from "../components/atoms/tab/example/tabExample";
import ListItemExample from "../components/atoms/listItem/example/listItemExample";
import IconExample from "../components/atoms/icon/example/iconExample";
import IconsExample from "../components/atoms/icons/example/iconsExample";
import UploadedFileExample from "../components/atoms/file/example/uploadedFileExample";
import TagFilterExample from "../components/atoms/tagFilter/example/tagFilterExample";


const PageAtoms = () => {
    return (
        <div className="figma-like">
            <TagFilterExample />
            <UploadedFileExample />
            <IconExample />
            <IconsExample />
            <ToggleExample />
            <ListItemExample />
            <TabExample />
            <TagExample />
            <AlertExample />
            <ButtonExample />
            <LabelExample />
            <CheckboxExample />
            <FormTextareaExample />
            <FormPinExample />
            <FormInputPhoneExample />
            <FormInputExample />
        </div>
    );
}


export default PageAtoms;