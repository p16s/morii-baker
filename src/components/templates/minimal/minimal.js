import BasicAtom from "../../atoms/basicAtom";
import './minimal.css';


class TemplateMinimal extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


    render(className, props) {
        return (
            <div
                className={
                    "Template-minimal"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                <header className="header">
                    {/*TODO update and put as icon compoennt*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="101" height="21" viewBox="0 0 101 21" fill="none">
                        <path d="M22.383 5.89502V16.9829H20.7576C20.4059 16.9829 20.1835 16.8208 20.0902 16.4966L19.9072 15.6104C19.4551 16.0715 18.9564 16.4462 18.411 16.7344C17.8656 17.0153 17.2233 17.1558 16.4842 17.1558C15.8814 17.1558 15.3468 17.055 14.8803 16.8532C14.421 16.6443 14.0335 16.3525 13.7178 15.9779C13.402 15.6032 13.1616 15.1602 12.9966 14.6486C12.8387 14.1299 12.7598 13.5607 12.7598 12.9411V5.89502H15.4185V12.9411C15.4185 13.6184 15.5728 14.1443 15.8814 14.5189C16.1971 14.8864 16.6672 15.0701 17.2915 15.0701C17.7508 15.0701 18.1813 14.9692 18.5832 14.7675C18.9851 14.5586 19.3654 14.274 19.7242 13.9138V5.89502H22.383Z" fill="black"/>
                        <path d="M27.5273 7.81865C27.8717 7.15583 28.2808 6.63709 28.7544 6.26245C29.228 5.88061 29.7878 5.68968 30.4336 5.68968C30.9431 5.68968 31.3522 5.80136 31.6607 6.0247L31.4885 8.02398C31.4526 8.15367 31.3988 8.24732 31.327 8.30496C31.2624 8.35539 31.1727 8.38061 31.0579 8.38061C30.9503 8.38061 30.7888 8.3626 30.5735 8.32658C30.3654 8.29055 30.1609 8.27254 29.96 8.27254C29.6658 8.27254 29.4038 8.31577 29.1742 8.40222C28.9446 8.48868 28.7364 8.61476 28.5499 8.78047C28.3705 8.93897 28.209 9.13349 28.0655 9.36404C27.9291 9.59459 27.8 9.85756 27.678 10.1529V16.9829H25.0192V5.89502H26.58C26.8527 5.89502 27.0429 5.94545 27.1505 6.04631C27.2582 6.13997 27.3299 6.31288 27.3658 6.56505L27.5273 7.81865Z" fill="black"/>
                        <path d="M35.7091 14.1083C36.0105 14.4757 36.337 14.7351 36.6886 14.8864C37.0474 15.0377 37.4349 15.1133 37.8512 15.1133C38.253 15.1133 38.6154 15.0377 38.9383 14.8864C39.2613 14.7351 39.534 14.5045 39.7564 14.1947C39.9861 13.8849 40.1619 13.4959 40.2839 13.0276C40.4059 12.5521 40.4669 11.9937 40.4669 11.3525C40.4669 10.7041 40.413 10.1565 40.3054 9.70986C40.2049 9.25597 40.0578 8.88854 39.8641 8.60756C39.6703 8.32658 39.4335 8.12124 39.1536 7.99156C38.8809 7.86188 38.5688 7.79704 38.2171 7.79704C37.6646 7.79704 37.1945 7.91591 36.807 8.15367C36.4195 8.38421 36.0535 8.71202 35.7091 9.1371V14.1083ZM35.5691 7.40799C36.0212 6.89646 36.5343 6.48219 37.1084 6.16519C37.6825 5.84819 38.3571 5.68968 39.1321 5.68968C39.7349 5.68968 40.2839 5.81577 40.779 6.06793C41.2814 6.32009 41.7119 6.68752 42.0707 7.17023C42.4367 7.64574 42.7166 8.23652 42.9103 8.94257C43.1113 9.64142 43.2117 10.4447 43.2117 11.3525C43.2117 12.181 43.1005 12.9483 42.878 13.6544C42.6556 14.3604 42.3363 14.9728 41.92 15.4916C41.511 16.0103 41.0123 16.4174 40.4238 16.7128C39.8425 17.0009 39.1895 17.145 38.4647 17.145C37.8476 17.145 37.3201 17.0514 36.8824 16.864C36.4446 16.6695 36.0535 16.403 35.7091 16.0643V20.6032H33.0503V5.89502H34.6757C35.0202 5.89502 35.2462 6.05712 35.3539 6.38133L35.5691 7.40799Z" fill="black"/>
                        <path d="M50.1732 5.72211C50.9912 5.72211 51.734 5.85539 52.4014 6.12196C53.0759 6.38853 53.65 6.76678 54.1236 7.25669C54.6044 7.7466 54.974 8.34459 55.2323 9.05064C55.4907 9.75669 55.6199 10.5456 55.6199 11.4174C55.6199 12.2963 55.4907 13.0888 55.2323 13.7949C54.974 14.5009 54.6044 15.1025 54.1236 15.5996C53.65 16.0968 53.0759 16.4786 52.4014 16.7452C51.734 17.0117 50.9912 17.145 50.1732 17.145C49.3479 17.145 48.598 17.0117 47.9234 16.7452C47.2489 16.4786 46.6712 16.0968 46.1904 15.5996C45.7168 15.1025 45.3472 14.5009 45.0817 13.7949C44.8233 13.0888 44.6942 12.2963 44.6942 11.4174C44.6942 10.5456 44.8233 9.75669 45.0817 9.05064C45.3472 8.34459 45.7168 7.7466 46.1904 7.25669C46.6712 6.76678 47.2489 6.38853 47.9234 6.12196C48.598 5.85539 49.3479 5.72211 50.1732 5.72211ZM50.1732 15.0917C51.0917 15.0917 51.7699 14.7819 52.2076 14.1623C52.6525 13.5427 52.875 12.6349 52.875 11.439C52.875 10.243 52.6525 9.33162 52.2076 8.70482C51.7699 8.07802 51.0917 7.76462 50.1732 7.76462C49.2403 7.76462 48.5478 8.08162 48.0957 8.71562C47.6507 9.34243 47.4283 10.2502 47.4283 11.439C47.4283 12.6277 47.6507 13.5355 48.0957 14.1623C48.5478 14.7819 49.2403 15.0917 50.1732 15.0917Z" fill="black"/>
                        <path d="M64.3866 8.0564C64.3149 8.17168 64.2395 8.25453 64.1606 8.30496C64.0817 8.34819 63.9812 8.3698 63.8592 8.3698C63.73 8.3698 63.5901 8.33378 63.4394 8.26173C63.2959 8.18969 63.1272 8.11044 62.9335 8.02398C62.7397 7.93032 62.5173 7.84747 62.2661 7.77542C62.0221 7.70338 61.7315 7.66735 61.3942 7.66735C60.8703 7.66735 60.4577 7.77902 60.1563 8.00237C59.8621 8.22571 59.715 8.5175 59.715 8.87773C59.715 9.11548 59.7903 9.31721 59.941 9.48292C60.0989 9.64142 60.3034 9.78191 60.5546 9.90439C60.8129 10.0269 61.1036 10.1385 61.4265 10.2394C61.7494 10.3331 62.0759 10.4375 62.406 10.5528C62.7433 10.6681 63.0734 10.8014 63.3963 10.9527C63.7193 11.0968 64.0063 11.2841 64.2575 11.5146C64.5158 11.738 64.7203 12.0081 64.871 12.3251C65.0289 12.6421 65.1078 13.024 65.1078 13.4707C65.1078 14.0038 65.011 14.4973 64.8172 14.9512C64.6306 15.3979 64.3508 15.787 63.9776 16.1184C63.6044 16.4426 63.1416 16.6983 62.589 16.8857C62.0436 17.0658 61.4121 17.1558 60.6945 17.1558C60.3142 17.1558 59.941 17.1198 59.575 17.0478C59.2162 16.9829 58.8682 16.8893 58.5309 16.7668C58.2008 16.6443 57.8922 16.5002 57.6052 16.3345C57.3253 16.1688 57.0777 15.9887 56.8625 15.7942L57.476 14.7783C57.555 14.6558 57.6482 14.5622 57.7559 14.4973C57.8635 14.4325 57.9999 14.4001 58.1649 14.4001C58.33 14.4001 58.4843 14.4469 58.6278 14.5406C58.7785 14.6342 58.9507 14.7351 59.1445 14.8432C59.3382 14.9512 59.5643 15.0521 59.8226 15.1457C60.0881 15.2394 60.4218 15.2862 60.8237 15.2862C61.1394 15.2862 61.4085 15.2502 61.631 15.1782C61.8606 15.0989 62.0472 14.9981 62.1907 14.8756C62.3414 14.7531 62.4491 14.6126 62.5137 14.4541C62.5854 14.2884 62.6213 14.1191 62.6213 13.9462C62.6213 13.6868 62.5424 13.4743 62.3845 13.3086C62.2338 13.1429 62.0293 12.9988 61.7709 12.8763C61.5198 12.7538 61.2291 12.6457 60.899 12.5521C60.5761 12.4512 60.2424 12.3432 59.898 12.2279C59.5607 12.1126 59.227 11.9793 58.8969 11.828C58.574 11.6695 58.2833 11.4714 58.025 11.2336C57.7738 10.9959 57.5693 10.7041 57.4114 10.3583C57.2607 10.0125 57.1854 9.59459 57.1854 9.10467C57.1854 8.65078 57.2751 8.21851 57.4545 7.80784C57.6339 7.39718 57.8958 7.04055 58.2403 6.73796C58.5919 6.42816 59.0261 6.1832 59.5427 6.00309C60.0666 5.81576 60.6694 5.72211 61.3511 5.72211C62.1118 5.72211 62.8043 5.84819 63.4286 6.10035C64.053 6.35251 64.5732 6.68392 64.9894 7.09459L64.3866 8.0564Z" fill="black"/>
                        <path d="M74.2241 10.1638C74.2241 9.81793 74.1739 9.49372 74.0734 9.19113C73.9801 8.88133 73.8366 8.61116 73.6429 8.38061C73.4491 8.15006 73.2015 7.96995 72.9001 7.84026C72.6059 7.70338 72.2615 7.63493 71.8668 7.63493C71.0989 7.63493 70.4925 7.85467 70.0476 8.29416C69.6099 8.73364 69.33 9.35684 69.208 10.1638H74.2241ZM69.1542 11.774C69.1972 12.3432 69.2977 12.8367 69.4556 13.2545C69.6135 13.6652 69.8216 14.0074 70.0799 14.2812C70.3382 14.5478 70.6432 14.7495 70.9949 14.8864C71.3537 15.0161 71.7484 15.0809 72.1789 15.0809C72.6095 15.0809 72.9791 15.0305 73.2876 14.9296C73.6034 14.8287 73.8761 14.7171 74.1057 14.5946C74.3425 14.4721 74.5471 14.3604 74.7193 14.2596C74.8987 14.1587 75.0709 14.1083 75.236 14.1083C75.4584 14.1083 75.6235 14.1911 75.7311 14.3568L76.4954 15.3295C76.2012 15.6753 75.8711 15.9671 75.5051 16.2048C75.1391 16.4354 74.7552 16.6227 74.3533 16.7668C73.9586 16.9037 73.5532 17.0009 73.1369 17.0586C72.7279 17.1162 72.3296 17.145 71.9421 17.145C71.1743 17.145 70.4602 17.0189 69.8 16.7668C69.1398 16.5074 68.5657 16.1292 68.0778 15.6321C67.5898 15.1277 67.2059 14.5081 66.926 13.7733C66.6461 13.0312 66.5062 12.1738 66.5062 11.2012C66.5062 10.4447 66.6282 9.73508 66.8722 9.07225C67.1162 8.40222 67.4642 7.82225 67.9163 7.33234C68.3756 6.83522 68.9317 6.44257 69.5847 6.15438C70.245 5.8662 70.9877 5.72211 71.8129 5.72211C72.509 5.72211 73.1513 5.83378 73.7397 6.05712C74.3282 6.28046 74.8341 6.60827 75.2575 7.04055C75.6809 7.46562 76.011 7.99156 76.2478 8.61836C76.4918 9.23796 76.6138 9.94762 76.6138 10.7473C76.6138 11.1508 76.5707 11.4246 76.4846 11.5687C76.3985 11.7055 76.2335 11.774 75.9895 11.774H69.1542Z" fill="black"/>
                        <path d="M79.2159 16.9829V7.80558L78.2579 7.65428C78.0497 7.61105 77.8811 7.539 77.7519 7.43814C77.6299 7.33007 77.5689 7.17877 77.5689 6.98425V5.89275H79.2159V5.17095C79.2159 4.53694 79.3092 3.96778 79.4957 3.46346C79.6895 2.95913 79.9622 2.53046 80.3138 2.17743C80.6726 1.82441 81.1068 1.55423 81.6163 1.36691C82.1258 1.17959 82.6999 1.08593 83.3386 1.08593C83.8481 1.08593 84.3217 1.15438 84.7594 1.29126L84.7056 2.63132C84.6984 2.73219 84.6697 2.81504 84.6195 2.87988C84.5693 2.93752 84.5011 2.98435 84.415 3.02037C84.336 3.04919 84.2428 3.0708 84.1351 3.08521C84.0275 3.09242 83.9127 3.09602 83.7907 3.09602C83.4749 3.09602 83.1915 3.13204 82.9403 3.20409C82.6963 3.26893 82.4882 3.38781 82.316 3.56072C82.1437 3.72642 82.011 3.94977 81.9177 4.23075C81.8316 4.50452 81.7885 4.84674 81.7885 5.25741V5.89275H84.6626V7.79477H81.8746V16.9829H79.2159Z" fill="black"/>
                        <path d="M95.6722 5.89502V16.9829H94.0468C93.6951 16.9829 93.4727 16.8208 93.3794 16.4966L93.1964 15.6104C92.7443 16.0715 92.2456 16.4462 91.7002 16.7344C91.1548 17.0153 90.5125 17.1558 89.7734 17.1558C89.1706 17.1558 88.636 17.055 88.1695 16.8532C87.7102 16.6443 87.3227 16.3525 87.007 15.9779C86.6912 15.6032 86.4508 15.1602 86.2858 14.6486C86.1279 14.1299 86.049 13.5607 86.049 12.9411V5.89502H88.7077V12.9411C88.7077 13.6184 88.862 14.1443 89.1706 14.5189C89.4863 14.8864 89.9564 15.0701 90.5807 15.0701C91.04 15.0701 91.4705 14.9692 91.8724 14.7675C92.2743 14.5586 92.6546 14.274 93.0134 13.9138V5.89502H95.6722Z" fill="black"/>
                        <path d="M100.999 0.923828V16.9829H98.3407V0.923828H100.999Z" fill="black"/>
                        <path d="M5.05918 9.21162C5.59022 9.21162 6.05308 9.14678 6.44777 9.0171C6.84245 8.88021 7.16897 8.68929 7.42731 8.44433C7.69283 8.19217 7.89017 7.88957 8.01934 7.53655C8.14851 7.17631 8.2131 6.77646 8.2131 6.33698C8.2131 5.91911 8.14851 5.54087 8.01934 5.20225C7.89017 4.86363 7.69642 4.57545 7.43807 4.33769C7.17973 4.09994 6.85322 3.91983 6.45853 3.79735C6.06384 3.66767 5.59739 3.60282 5.05918 3.60282H2.89557V9.21162H5.05918ZM5.05918 1.35498C6.09972 1.35498 7.00033 1.47746 7.761 1.72242C8.52167 1.96737 9.14958 2.30959 9.64474 2.74908C10.1399 3.18856 10.5059 3.71449 10.7427 4.32689C10.9867 4.93928 11.1087 5.60931 11.1087 6.33698C11.1087 7.09346 10.9831 7.78871 10.7319 8.42271C10.4808 9.04952 10.104 9.58986 9.60168 10.0438C9.09935 10.4976 8.46785 10.8507 7.70718 11.1028C6.95368 11.355 6.07102 11.4811 5.05918 11.4811H2.89557V16.9818H0V1.35498H5.05918Z" fill="black"/>
                    </svg>

                    <a
                        href="mailto:support@p16s.co?subject=Account issue"
                        title="Contact support"
                    >
                        Contact support
                    </a>
                </header>

                <main className="main">
                    {this.props.children}
                </main>
            </div>
        );
    }
}


export default TemplateMinimal;
