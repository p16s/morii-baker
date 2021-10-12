import React from "react";

import InputExample from "../components/molecules/input/example/inputExample";
import InputPhoneExample from "../components/molecules/inputPhone/example/inputPhoneExample";
import TextareaExample from "../components/molecules/textarea/example/textareaExample";
import PinExample from "../components/molecules/pin/example/pinExample";
import FileUploadExample from "../components/molecules/fileUpload/example/fileUploadExample";
import ListExample from "../components/molecules/list/example/listExample";
import IconBarExample from "../components/molecules/iconBar/example/IconBarExample";
import TitleBarExample from "../components/molecules/titleBar/example/titleBarExample";
import BreadcrumbsExample from "../components/molecules/breadcrumbs/example/breadcrumbsExample";
import TableExample from "../components/molecules/table/example/tableExample";
import SlideOutExample from "../components/molecules/slideOut/example/slideOutExample";
import FileListExample from "../components/molecules/fileList/example/fileListExample";
import RandomExample from "../components/molecules/random/example/randomExample";
import ModalCenterExample from "../components/molecules/modalCenter/example/modalCenterExample";
import ContactPreferencesExample from "../components/molecules/contactPreferences/example/contactPreferencesExample";
import TabBarExample from "../components/molecules/tabBar/example/tabBarExample";
import ToastExample from "../components/molecules/toast/example/toastExample";
import NoDataMessageExample from "../components/molecules/noDataMessage/example/noDataMessageExample";
import FiltersExample from "../components/molecules/filters/example/filtersExample";
import InputTagsExample from "../components/molecules/inputTags/example/inputTagsExample";
import TagsSelectExample from "../components/molecules/tagsSelect/example/tagsSelectExample";


const PageMolecules = () => {
    return (
        <div className="figma-like">
            <TagsSelectExample />
            <InputTagsExample />
            <FiltersExample />
            <InputExample />
            <InputPhoneExample />
            <TextareaExample />
            <PinExample />
            <FileUploadExample />
            <ListExample />
            <TitleBarExample />
            <IconBarExample />
            <BreadcrumbsExample />
            <TableExample />
            <SlideOutExample />
            <FileListExample />
            <RandomExample />
            <ModalCenterExample />
            <TabBarExample />
            <ContactPreferencesExample />
            <ToastExample />
            <NoDataMessageExample />
        </div>
    );
}


export default PageMolecules;