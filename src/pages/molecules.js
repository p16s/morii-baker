import React from "react";

import InputExample from "../components/molecules/input/example/inputExample";
import InputPhoneExample from "../components/molecules/inputPhone/example/inputPhoneExample";
import TextareaExample from "../components/molecules/textarea/example/textareaExample";
import PinExample from "../components/molecules/pin/example/pinExample";
import InputFileUploadExample from "../components/molecules/inputFileUpload/example/inputFileUploadExample";
import ListExample from "../components/molecules/list/example/listExample";
import IconBarExample from "../components/molecules/iconBar/example/IconBarExample";
import TitleBarExample from "../components/molecules/titleBar/example/titleBarExample";
import BreadcrumbsExample from "../components/molecules/breadcrumbs/example/breadcrumbsExample";
import TableExample from "../components/molecules/table/example/tableExample";
import SlideOutExample from "../components/molecules/slideOut/example/slideOutExample";
import DownloadedFilesExample from "../components/molecules/downloadedFiles/example/downloadedFilesExample";


const PageMolecules = () => {
    return (
        <div className="figma-like">
            <InputExample />
            <InputPhoneExample />
            <TextareaExample />
            <PinExample />
            <InputFileUploadExample />
            <ListExample />
            <TitleBarExample />
            <IconBarExample />
            <BreadcrumbsExample />
            <TableExample />
            <SlideOutExample />
            <DownloadedFilesExample />
        </div>
    );
}


export default PageMolecules;