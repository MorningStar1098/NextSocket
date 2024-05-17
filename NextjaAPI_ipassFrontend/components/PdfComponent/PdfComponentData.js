/* eslint-disable */
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Svg, Link } from '@react-pdf/renderer';
import Cookies from 'js-cookie';
import { RightIcon, WrongIcon, WarnIcon, ExclamationIcon, IPassLogo, NoImage } from './Images/right';
import {
    AdobeIcon, AirbnbIcon, AmazonIcon, AppleIcon, ArchiveIcon, AtlassianIcon,
    BookingIcon, BulkapakIcon, DatabaseIcon, DiscordIcon, DisneyIcon, DomainIcon,
    EbayIcon, EnvatoIcon, EvernoteIcon, facebookIcon, FlickrIcon, FlipcartIcon,
    FolderIcon, FoursqureIcon, GithubIcon, GoogleIcon, GravatrIcon, instaIcon,
    jdid, LastfmIcon, LazadaIcon, LinkedinIcon, MailruIcon, MicrosoftIcon,
    MyspaceIcon, Netflixicon, PintrestIcon, QuoraIcon, QzoneIcon, SamsungIcon, SkypeIcon,
    SnapchatIcon, SpotifyIcon, TelegramIcon, TokopediaIcon, TwitterIcon, ViberIcon,
    VimeoIcon, WhatsaapIcon, WordpressIcon, YahooIcon, ZaloIcon, ZohoIcon, LineIcon, OkIcon
} from './Images/accounts';
import { Font } from '@react-pdf/renderer';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});
Font.register({
    family: 'Noto Naskh Arabic',
    src: 'https://fonts.gstatic.com/s/notonaskharabic/v25/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwvc5krK0z9_Mnuw.ttf'
});

const socialStyles = StyleSheet.create({
    textFontArabic: { fontFamily: 'Noto Naskh Arabic' },
    mainPage: { color: "grey" },
    firstSectionView: {
        backgroundColor: "#fff",
        paddingTop: "20px",
        marginBottom: "20px",
        borderRadius: "4px",
        border: "1px solid #000",
        paddingBottom: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
    },
    firstSectionView2: {
        backgroundColor: "#fff",
        paddingTop: "10px",
        marginBottom: "20px",
        borderRadius: "4px",
        border: "1px solid #000",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginRight: "3px",
        width: "50%"
    },
    firstSectionView2Main: { width: "50%" },
    firstSectionView2_1: {
        backgroundColor: "#fff",
        paddingTop: "10px",
        marginBottom: "20px",
        borderRadius: "4px",
        border: "1px solid #000",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginRight: "3px",
    },
    firstSectionView3: {
        backgroundColor: "#fff",
        paddingTop: "10px",
        marginBottom: "20px",
        borderRadius: "4px",
        border: "1px solid #000",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginLeft: "3px",
        width: "50%"
    },
    firstSectionValida1: {}, firstSectionValida2: {},
    firstSectionView3Main: { width: "50%" },
    firstSectionView3_1: {
        backgroundColor: "#fff",
        paddingTop: "10px",
        marginBottom: "20px",
        borderRadius: "4px",
        border: "1px solid #000",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginLeft: "3px",
    },
    firstTopSection: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid grey",
        color: "grey"
    },
    firstBottomSection: {
        display: "flex",
        flexDirection: "row",
        color: "grey"
    },
    firstTopSectionText: {
        textAlign: "left",
        fontSize: "14px",
        paddingBottom: "5px",
    },
    firstBottomSectionText: {
        textAlign: "left",
        fontSize: "12px",
        paddingTop: "10px",
    },
    firstBottomSectionTextEmail: {
        textAlign: "left",
        fontSize: "12px",
        paddingTop: "10px",
        overflow: "hidden"
    },
    fraudSection: { display: "flex", flexDirection: "row", },
    fraudSectionFirst: { width: "150px" },
    fraudSectionFirstText: { fontSize: "35px", color: "grey" },
    fraudSectionFirstTitle: {
        fontSize: "14px",
        marginTop: "25px",
        color: "grey"
    },
    fraudSectionSecond: { width: "120px" },
    fraudSectionSecondText: {
        fontSize: "18px",
        color: "grey",
        marginBottom: "5px"
    },
    fraudSectionSecondTitle: {
        fontSize: "12px",
        color: "grey",
        marginBottom: "30px"
    },
    fraudSectionThird: { width: "350px" },
    rulesTitle: {
        fontSize: "12px",
        color: "grey",
        marginBottom: "20px"
    },
    emailRules: {
        fontSize: "12px",
        color: "grey",
        marginBottom: "10px"
    },
    rulesBox: {
        display: "flex",
        flexDirection: "row",
        color: "grey",
        marginBottom: "10px"
    },
    rulesBoxText1: { width: "55px", },
    rulesBoxText2: { width: "200px", },
    rulesBoxText3: { width: "30px", color: "#fd9393" },
    socialHeadingId: {
        marginBottom: "10px",
        fontSize: "16px",
        color: "#333333"
    },
    identityRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px",
    },
    identityRowText1: { width: "100px", fontSize: "14px" },
    identityRowText2: {
        textAlign: "left",
        fontSize: "12px",
        width: "150px",
    },
    identityRowTextEmail: {
        textAlign: "left",
        fontSize: "12px",
        width: "150px",
        overflow: "hidden"
    },
    listStatusTitle: {
        fontSize: "14px",
        marginTop: "18px",
        color: "#666666"
    },
    listStatusText: {
        fontSize: "12px",
        marginTop: "18px",
        marginBottom: "10px"
    },
    phoneInformation: {
        backgroundColor: "#fff",
        borderRadius: "4px",
        paddingTop: "10px",
        width: "48%",
        paddingBottom: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRight: "1px solid #ddd"
    },
    emailInformation: {
        backgroundColor: "#fff",
        borderRadius: "4px",
        padding: "10px",
        width: "48%"
    },
    phoneResultBox: {
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        marginBottom: "10px"
    },
    phoneNumberClass: {
        color: "grey",
        fontSize: "14px",
        marginTop: "10px",
        marginBottom: "10px"
    },
    emailClass: {
        color: "grey",
        fontSize: "12px",
        marginTop: "10px",
        marginBottom: "10px",
        overflow: "hidden"
    },
    phoneResultText: { width: "85%" },
    phoneClass1: { fontSize: "14px" },
    phoneClass2: { fontSize: "12px" },
    phoneDataBox: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid #ddd",
        paddingBottom: "5px",
        marginBottom: "5px"
    },
    phoneDataBoxlast: {
        display: "flex",
        flexDirection: "row",
        paddingBottom: "5px",
        marginBottom: "5px"
    },
    phoneDataTitle: { width: "40%" },
    phoneDataText: { color: "grey", width: "60%" },
    registeredHeading: {
        fontSize: "14px",
        marginTop: "15px",
        marginBottom: "10px",
        color: "#333333",
    },
    accountIconStyle: {
        marginRight: "5px",
        marginTop: "10px",
        paddingTop: "5px",
        width: "20px"
    },
    multipleAccountsClass: {
        marginRight: "10px",
        color: "grey",
        fontSize: "12px",
        marginBottom: "10px",
        marginTop: "10px",
        width: "100px",
        lineHeight: "1px"
    },
    multipleAccountsBox2: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
    },
    textWithIcon: {
        backgroundColor: "#ddd",
        padding: "10px",
        borderRadius: "4px",
        marginBottom: "10px",
        marginTop: "15px",
    },
    accountIconStyle2: {
        marginRight: "10px",
        width: "30px",
        marginTop: "5px",
    },
    accountsClassInner1: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    emailLink: {
        fontSize: "12px",
        marginTop: "10px",
        marginBottom: "15px",
        color: "grey",
    }
});
// ====================================================================================================================================================================================
const metaData = StyleSheet.create({
    ipdataHeading: { color: "#7c7a85" },
    ipdataContent: { marginTop: "7px" },
    ipdatainnerContent: {
        display: "flex",
        flexDirection: "row",
        padding: "0 0 16px"
    },
    appRulesData: { fontSize: "12px", padding: "0 0 14px" },
    appliedRulesMail: { marginLeft: "7px" },
    appRulesBothMain: { margin: "7px" },
    ipdatasection: {
        backgroundColor: "#fff",
        border: "1px solid #000",
        borderRadius: "4px",
        padding: "15px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "spaceBetween",
    },
    metaHeadingId: {
        color: "#333333",
        marginTop: "5px",
        fontSize: "16px",
        marginBottom: "10px",
    },
    metaBoxText1: { width: "55px", fontSize: "12px", },
    metaBoxText2: { width: "200px", fontSize: "12px", },
    metaBoxText3: { width: "30px", fontSize: "12px" },
    metaBox: {
        display: "flex",
        flexDirection: "row",
        color: "grey",
        marginBottom: "10px"
    },
    metaBox1: { color: "grey", marginBottom: "10px" },
    metaRowText1: {
        width: "100px",
        fontSize: "12px",
        color: "grey"
    }, metaRowText2: {
        textAlign: "left",
        fontSize: "12px",
        width: "100px",
        color: "grey",
    },
    ipassDataViewMain: {
        color: "#333333",
        marginTop: "5px",
        fontSize: "16px",
        marginBottom: "10px",
    }
})
//==========================================================================================================================================================================

const styles = StyleSheet.create({
    pageStyle: {
        padding: "20px",
        fontSize: "12px",
        border: "2px solid #333",
        backgroundColor: "#fff",
    }, pageStyle2: {
        padding: "20px",
        fontSize: "12px",
        border: "2px solid #333",
        backgroundColor: "#fff",
    },
    viewExportedBy: {
        fontSize: "18px",
        color: "#333333",
        fontWeight: "900",
        marginTop: "10px",
        marginBottom: "10px"
    },
    textExportedBy1: {
        marginBottom: "2px",
        paddingBottom: "2px",
        fontWeight: "900",
    },
    highRiskView: {
        width: "100%",
        backgroundColor: "#ff000085",
        color: "white",
        padding: "5px",
        borderRadius: "5px"
    },
    normalRiskView: {
        width: "100%",
        backgroundColor: "rgb(53, 214, 166)",
        color: "white",
        padding: "5px",
        borderRadius: "5px"
    },
    riskText: {
        fontSize: "15px"
    },
    textExportedBy1a: { paddingRight: "10px" },
    requestDataViewMain: {
        color: "#333333",
        marginTop: "5px",
        fontSize: "16px",
        marginBottom: "10px",
    },
    requestDataView: {
        display: "flex",
        flexDirection: "row",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderBottom: "1px solid #ddd",
        fontSize: "12px",
    },
    requestDataText1: {
        color: "grey",
        width: "200px",
        textAlign: "left",
    },
    requestDataText2: {
        textAlign: "left",
        width: "400px",
        color: "grey",
    },
    viewRequestData: {
        backgroundColor: "#fff",
        border: "1px solid #000",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "20px"
    },
    imageFrontBack: {
        maxWidth: "250px",
        maxHeight: "350px",
        borderRadius: "10px",
        margin: "10px",
        width: "100%",
    },
    imageFrontBackValida: {
        maxWidth: "250px",
        maxHeight: "300px",
        borderRadius: "10px",
        // margin: "10px",
        width: "100%",
    },
    imageFace: {
        maxWidth: "200px",
        borderRadius: "10px",
        margin: "10px",
        width: "100%",
    },
    addressDataLeft: {
        width: "200px",
        textAlign: "left",
        color: "grey",
    },
    addressDataRight: {
        textAlign: "left",
        color: "grey",
        width: '400px'
    },
    docQualities: { fontWeight: "700" },
    amlFlex: { display: "flex", flexDirection: "row" },
    mainHeadingsText: {
        color: "#112f51",
        fontSize: "16px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    docImagesView: {
        marginTop: "5px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
    },
    docQualityHeading: {
        color: "#333333",
        fontSize: "14px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    docQualityHeadingText: {
        color: "grey",
        fontSize: "12px",
        marginBottom: "5px",
    },
    rightCrossImg: { marginRight: "5px", paddingRight: "5px", },
    facialLiveness: {
        display: "flex",
        flexDirection: "row",
        marginTop: "40px"
    },
    riskScore: { width: "200px", },
    viewMarginTopBottom: { marginTop: "10px", marginBottom: "10px" },
    googleLogoIcon: {
        maxWidth: "100px",
        maxHeight: "100px",
        borderRadius: "10px",
        margin: "10px",
        width: "100%",
    },
    textMarginRight: {
        marginRight: "10px",
        color: "#112f51",
        fontSize: "12px",
        marginBottom: "10px"
    },
    ipassLogoStyle: { width: "140px", height: "60px" }
});

let singlecustomer = "";
let application_status = "";
let retrieve_date = "";
let retrieve_time = "";
let verification_date = "";
let verification_time = "";
let front_image = "";
let back_image = "";
let face_image = "";
let watchlistData = "";
let socialMedia = "";
let phoneMedia = "";
let DomainData = "";
let seonfinalDat = "";
let singleCust = "";
let ipData = "";
let singlecustomerAr = "";
let ocrData = "";
let validaData;

export const GetDataComp = (singlecustomer1, retrivedate, time, verifdate, veriftime, frntImg, backImg, faceImg, valida_Data) => {
    singlecustomer = singlecustomer1;
    application_status = singlecustomer?.decision && singlecustomer.decision.details !== undefined
        ? singlecustomer.decision.details.label
        : "";
    retrieve_date = retrivedate;
    retrieve_time = time;
    verification_date = verifdate;
    verification_time = veriftime;
    front_image = frntImg;
    back_image = backImg;
    face_image = faceImg;
    validaData = valida_Data;
}

let frnt_screen
let back_screen
validaData?.detailvalidaAppId?.screening?.map((screenResp) => {
    if (screenResp?.screen_type == "BACK") {
        back_screen = screenResp
    } else {
        frnt_screen = screenResp
    }
})

export const GetOcrData = (singlecustomerocr, ocrDatas) => {
    singlecustomerAr = singlecustomerocr;
    ocrData = ocrDatas;
}
export const GetSocialData = (socialMedia1, phoneMedia1, DomainData1, seonfinalDat1, singleCust1, IpData) => {
    socialMedia = socialMedia1;
    phoneMedia = phoneMedia1;
    DomainData = DomainData1;
    seonfinalDat = seonfinalDat1;
    singleCust = singleCust1;
    ipData = IpData
}
export const GetWatchListDataComp = (watchlistData1) => {
    watchlistData = watchlistData1;
}

export const PdfComponentData = () => {
    const forZeroObj = validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[0];
    const forOneObj = validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[1];
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let baseEml = Cookies.get('email');
    let eml = atob(baseEml);
    let insdate = singlecustomer && singlecustomer.createdAt !== undefined
        ? singlecustomer.createdAt.slice(0, 10)
        : null
    let instime = singlecustomer && singlecustomer.createdAt !== undefined
        ? singlecustomer.createdAt.slice(11, 16)
        : null
    const initatedatetime = `${insdate} ${instime}`
    let date2 = singlecustomer && singlecustomer.startedAt !== undefined
        ? singlecustomer.startedAt.slice(0, 10)
        : null
    let time2 = singlecustomer && singlecustomer.startedAt !== undefined
        ? singlecustomer.startedAt.slice(11, 16) : null
    const startDateTime = `${date2} ${time2}`
    let date3 = singlecustomer && singlecustomer.completedAt !== undefined
        ? singlecustomer.completedAt.slice(0, 10)
        : null
    let time3 = singlecustomer && singlecustomer.completedAt !== undefined
        ? singlecustomer.completedAt.slice(11, 16)
        : null
    const completeDateTime = `${date3} ${time3}`
    let wfmap = 0;
    const pdfExpoBy = <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.viewExportedBy}>
            <Text style={styles.textExportedBy1}><Text style={styles.textExportedBy1a}>PDF exported </Text><Text>{date}</Text></Text>
            <Text style={styles.textExportedBy1}>by {eml}</Text>
        </View>
        <Image src={IPassLogo} style={styles.ipassLogoStyle} />
    </View>;

    const validaComponent =
        <View style={{ display: "flex", flexDirection: "row" }}>
            {forZeroObj && forZeroObj.type == "FRONT" ?
                <View style={socialStyles.firstSectionView2}>
                    <Text style={styles.requestDataViewMain}>Front Image Authentication</Text>
                    <View style={forZeroObj?.alert ? styles.highRiskView : styles.normalRiskView}>
                        {forZeroObj !== undefined ?
                            <Text style={styles.riskText}>{forZeroObj?.alert ? "High Risk" : "Normal"}</Text>
                            : null}
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Alert</Text>
                        <Text style={styles.requestDataText2}>{forZeroObj?.alert ? "true" : "false"}</Text>
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Global Traces</Text>
                        <Text style={styles.requestDataText2}>{forZeroObj?.fraud?.global_traces?.alert ? "true" : "false"}</Text>
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Local Traces</Text>
                        <Text style={styles.requestDataText2}>{forZeroObj?.fraud?.local_traces?.alert ? "true" : "false"}</Text>
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Alert</Text>
                        <Text style={styles.requestDataText2}>{frnt_screen?.alert ? "true" : "false"}</Text>
                    </View>
                    {frnt_screen?.identity?.screen?.score && <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Score</Text>
                        <Text style={styles.requestDataText2}>
                            {`${Math.round(frnt_screen?.identity?.screen?.score * 100)}%`}
                        </Text>
                    </View>}
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Print</Text>
                        <Text style={styles.requestDataText2}>{frnt_screen?.print?.alert ? "true" : "false"}</Text>
                    </View>
                    {forZeroObj !== undefined
                        ? <>
                            {forZeroObj?.fraud?.local_traces?.map && forZeroObj?.fraud?.local_traces?.map !== "" &&
                                <View style={{ marginTop: "10px" }} ><Image style={styles.imageFrontBackValida} src={`data:image/jpeg/png;base64,${forZeroObj?.fraud?.local_traces?.map}`} cache={false} /></View>

                            }
                        </>
                        : null}
                </View>
                : forZeroObj && forZeroObj.type == "BACK" ?
                    <View style={socialStyles.firstSectionView2}>
                        <Text style={styles.requestDataViewMain}>Back Image Authentication</Text>
                        <View style={forZeroObj?.alert ? styles.highRiskView : styles.normalRiskView}>
                            {forZeroObj !== undefined ?
                                <Text style={styles.riskText}>{forZeroObj?.alert ? "High Risk" : "Normal"}</Text>
                                : null}
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Alert</Text>
                            <Text style={styles.requestDataText2}>{forZeroObj?.alert ? "true" : "false"}</Text>
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Global Traces</Text>
                            <Text style={styles.requestDataText2}>{forZeroObj?.fraud?.global_traces?.alert ? "true" : "false"}</Text>
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Local Traces</Text>
                            <Text style={styles.requestDataText2}>{forZeroObj?.fraud?.local_traces?.alert ? "true" : "false"}</Text>
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Alert</Text>
                            <Text style={styles.requestDataText2}>{back_screen?.alert ? "true" : "false"}</Text>
                        </View>
                        {back_screen?.identity?.screen?.score && <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Score</Text>
                            <Text style={styles.requestDataText2}>
                                {`${Math.round(back_screen?.identity?.screen?.score * 100)}%`}
                            </Text>
                        </View>}
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Print</Text>
                            <Text style={styles.requestDataText2}>{back_screen?.print?.alert ? "true" : "false"}</Text>
                        </View>
                        {forZeroObj !== undefined ?
                            <>
                                {forZeroObj?.fraud?.local_traces?.map && forZeroObj?.fraud?.local_traces?.map !== "" &&
                                    <View style={{ marginTop: "10px" }} >
                                        <Image style={styles.imageFrontBackValida} src={`data:image/jpeg/png;base64,${forZeroObj?.fraud?.local_traces?.map}`} cache={false} />
                                    </View>
                                }
                            </>
                            : null}

                    </View>
                    : null}
            {forOneObj && forOneObj.type == "FRONT" ?
                <View style={socialStyles.firstSectionView2}>
                    <Text style={styles.requestDataViewMain}>Front Image Authentication</Text>
                    <View style={forOneObj?.alert ? styles.highRiskView : styles.normalRiskView}>
                        {forOneObj !== undefined ?
                            <Text style={styles.riskText}>{forOneObj?.alert ? "High Risk" : "Normal"}</Text>
                            : null}
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Alert</Text>
                        <Text style={styles.requestDataText2}>{forOneObj?.alert ? "true" : "false"}</Text>
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Global Traces</Text>
                        <Text style={styles.requestDataText2}>{forOneObj?.fraud?.global_traces?.alert ? "true" : "false"}</Text>
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Local Traces</Text>
                        <Text style={styles.requestDataText2}>{forOneObj?.fraud?.local_traces?.alert ? "true" : "false"}</Text>
                    </View>
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Alert</Text>
                        <Text style={styles.requestDataText2}>{frnt_screen?.alert ? "true" : "false"}</Text>
                    </View>
                    {frnt_screen?.identity?.screen?.score && <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Score</Text>
                        <Text style={styles.requestDataText2}>
                            {`${Math.round(frnt_screen?.identity?.screen?.score * 100)}%`}
                        </Text>
                    </View>}
                    <View style={styles.requestDataView}>
                        <Text style={styles.requestDataText1}>Print</Text>
                        <Text style={styles.requestDataText2}>{frnt_screen?.print?.alert ? "true" : "false"}</Text>
                    </View>
                    {forOneObj !== undefined
                        ? <>
                            {forOneObj?.fraud?.local_traces?.map && forOneObj?.fraud?.local_traces?.map !== "" &&
                                <View style={{ marginTop: "10px" }} >
                                    <Image style={styles.imageFrontBackValida} src={`data:image/jpeg/png;base64,${forOneObj?.fraud?.local_traces?.map}`} cache={false} />
                                </View>
                            }
                        </>
                        : null}
                </View>
                : forOneObj && forOneObj.type == "BACK"
                    ? <View style={socialStyles.firstSectionView2}>
                        <Text style={styles.requestDataViewMain}>Back Image Authentication</Text>
                        <View style={forOneObj?.alert ? styles.highRiskView : styles.normalRiskView}>
                            {forOneObj !== undefined ?
                                <Text style={styles.riskText}>{forOneObj?.alert ? "High Risk" : "Normal"}</Text>
                                : null}
                        </View>

                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Alert</Text>
                            <Text style={styles.requestDataText2}>{forOneObj?.alert ? "true" : "false"}</Text>
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Global Traces</Text>
                            <Text style={styles.requestDataText2}>{forOneObj?.fraud?.global_traces?.alert ? "true" : "false"}</Text>
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Local Traces</Text>
                            <Text style={styles.requestDataText2}>{forOneObj?.fraud?.local_traces?.alert ? "true" : "false"}</Text>
                        </View>
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Alert</Text>
                            <Text style={styles.requestDataText2}>{back_screen?.alert ? "true" : "false"}</Text>
                        </View>
                        {back_screen?.identity?.screen?.score && <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Score</Text>
                            <Text style={styles.requestDataText2}>
                                {`${Math.round(back_screen?.identity?.screen?.score * 100)}%`}
                            </Text>
                        </View>}
                        <View style={styles.requestDataView}>
                            <Text style={styles.requestDataText1}>Print</Text>
                            <Text style={styles.requestDataText2}>{back_screen?.print?.alert ? "true" : "false"}</Text>
                        </View>
                        {forOneObj !== undefined ?
                            <>
                                {forOneObj?.fraud?.local_traces?.map && forOneObj?.fraud?.local_traces?.map !== "" &&
                                    <View style={{ marginTop: "10px" }} >
                                        <Image style={styles.imageFrontBackValida} src={`data:image/jpeg/png;base64,${forOneObj?.fraud?.local_traces?.map}`} cache={false} />
                                    </View>
                                }
                            </>
                            : null}
                    </View>
                    : null}
        </View>

    const arabicOcrData = singlecustomerAr && singlecustomerAr.capabilities && singlecustomerAr.capabilities.extraction !== undefined
        ? singlecustomerAr.capabilities.extraction.map((data) => {
            // Arabic data start
            return (
                <>
                    {data?.data?.type == "ID_CARD"           //Jordan ID Card
                        ? <>{ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined
                            ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                return (
                                    ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined
                                        ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                            const ocrData = ocrApiData && ocrApiData.fields !== undefined
                                                ? ocrApiData.fields
                                                : null
                                            const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined
                                                ? ocrApiBackData.fields
                                                : null
                                            const idFnameArr = ocrData["First Name AR"]?.content
                                            const idSecnameArr = ocrData["Father Name AR"]?.content
                                            const idthrdnameArr = ocrData["Grand Father Name"]?.content
                                            const idfourthnameArr = ocrData["Family Name AR"]?.content
                                            const idBirthDat = ocrData["Date of Birth"]?.content
                                            const idbirthplaceArr = ocrData["Place of Birth AR"]?.content
                                            const idMothernameArr = ocrData["Mother Name AR"]?.content
                                            const idgenderArr = ocrData["Gender AR"]?.content
                                            const idNo = ocrData["ID Number"]?.content
                                            const idExpDat = ocrData1["Date of Expiry"]?.content
                                            const idIssNo = ocrData1["Registration Number"]?.content
                                            const idPlace = ocrData1["Registration Place AR"]?.content
                                            const idIssueplace = ocrData1["Place of Issuance"]?.content
                                            const idResLoc = ocrData1["Residence Location"]?.content
                                            return (data?.data?.issuingCountry == "JOR"
                                                ? <View style={socialStyles.textFontArabic}>
                                                    <View style={styles.viewRequestData}>
                                                        <View>
                                                            <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>First Name</Text>
                                                            <Text style={styles.requestDataText2}>{idFnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Father Name</Text>
                                                            <Text style={styles.requestDataText2}>{idSecnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                            <Text style={styles.requestDataText2}>{idthrdnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Last Name</Text>
                                                            <Text style={styles.requestDataText2}>{idfourthnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Mothers Name</Text>
                                                            <Text style={styles.requestDataText2}>{idMothernameArr !== undefined
                                                                ? idMothernameArr
                                                                : null}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Place of birth</Text>
                                                            <Text style={styles.requestDataText2}>{idbirthplaceArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Gender</Text>
                                                            <Text style={styles.requestDataText2}>{idgenderArr == "/ M"
                                                                ? "ذكر"
                                                                : idgenderArr == "F"
                                                                    ? "أنثى"
                                                                    : idgenderArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Document type</Text>
                                                            <Text style={styles.requestDataText2}>{data?.data?.type == "ID_CARD"
                                                                ? "بطاقة التعريف"
                                                                : null}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Issuance Number</Text>
                                                            <Text style={styles.requestDataText2}>{idIssNo}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Issuance Place</Text>
                                                            <Text style={styles.requestDataText2}>{idPlace}</Text>
                                                        </View>
                                                        {idResLoc !== undefined
                                                            ? <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Residence</Text>
                                                                <Text style={styles.requestDataText2}>{idResLoc}</Text>
                                                            </View>
                                                            : null}
                                                    </View>
                                                </View>
                                                : null)
                                        })
                                        : null)
                            })
                            : null}
                        </>
                        : data?.data?.type == "PASSPORT"            //Jordan Passport
                            ? <>{data?.data?.issuingCountry == "JOR"
                                ? <>{ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                    ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                        const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                                            ? ocrApiData.fields
                                            : null
                                        const fnameAr = ocrDataPass["First Name AR"]?.content
                                        const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                        const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                        const fourthnameArr = ocrDataPass["Family Name AR"]?.content
                                        const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                        const genderArr = ocrDataPass["Gender AR"]?.content
                                        const passNo = ocrDataPass["Passport No"]?.content
                                        const passAuth = ocrDataPass["Authority AR"]?.content
                                        const passMothernameArr = ocrDataPass["Mother Name AR"]?.content
                                        return (
                                            <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{fnameAr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Father Name</Text>
                                                        <Text style={styles.requestDataText2}>{SecnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{thrdnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{fourthnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>date of birth</Text>
                                                        <Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                                            ? data.data.dateOfBirth
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Mothers Name</Text>
                                                        <Text style={styles.requestDataText2}>{passMothernameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{birthplaceArr}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.requestDataText1}>Gender</Text>
                                                        <Text style={styles.requestDataText2}>{genderArr == "M"
                                                            ? "الذكر"
                                                            : genderArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Document Type</Text>
                                                        <Text style={styles.requestDataText2}>{data?.data?.type == "PASSPORT"
                                                            ? "جواز سفر"
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Document Number</Text>
                                                        <Text style={styles.requestDataText2}>{passNo}</Text>
                                                    </View>
                                                    {data && data.data && data.data.expiryDate
                                                        ? singlecustomerAr?.capabilities?.dataChecks.map((datchk) => {
                                                            return (
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                                    <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                        ? data.data.expiryDate
                                                                        : null}</Text>
                                                                </View>
                                                            )
                                                        })
                                                        : null}
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Authority</Text>
                                                        <Text style={styles.requestDataText2}>{passAuth}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                    : null}</>
                                : null}</>
                            : data?.data?.type == "DRIVING_LICENSE"         //Jordan Driving License
                                ? <>{data?.data?.issuingCountry == "JOR"
                                    ? <>{ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                        ? ocrData.analyzeResult.documents.map((ocrApiDataDriv) => {
                                            const ocrDataDriv = ocrApiDataDriv && ocrApiDataDriv.fields !== undefined
                                                ? ocrApiDataDriv.fields
                                                : null
                                            const drivFnameArr = ocrDataDriv["First Name AR"]?.content
                                            const drivSecnameArr = ocrDataDriv["Second Name AR"]?.content
                                            const drivThirdnameArr = ocrDataDriv["Third Name AR"]?.content
                                            const drivFourthnameArr = ocrDataDriv["Family Name AR"]?.content
                                            const drivBlodType = ocrDataDriv["Blood Type"]?.content
                                            const drivCenter = ocrDataDriv["License center AR"]?.content
                                            const drivNationality = ocrDataDriv["Nationality AR"]?.content
                                            const drivAddress = ocrDataDriv["Address AR"]?.valueString
                                            return (
                                                <View style={socialStyles.textFontArabic}>
                                                    <View style={styles.viewRequestData}>
                                                        <View>
                                                            <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>First Name</Text>
                                                            <Text style={styles.requestDataText2}>{drivFnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Father Name</Text>
                                                            <Text style={styles.requestDataText2}>{drivSecnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                            <Text style={styles.requestDataText2}>{drivThirdnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Last Name</Text>
                                                            <Text style={styles.requestDataText2}>{drivFourthnameArr}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Blood Type</Text>
                                                            <Text style={styles.requestDataText2}>{drivBlodType}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>License Center</Text>
                                                            <Text style={styles.requestDataText2}>{drivCenter}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Nationality</Text>
                                                            <Text style={styles.requestDataText2}>{drivNationality}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Address</Text>
                                                            <Text style={styles.requestDataText2}>{drivAddress}</Text>
                                                        </View>
                                                        <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Document type</Text>
                                                            <Text style={styles.requestDataText2}>{data?.data?.type == "DRIVING_LICENSE"
                                                                ? "رخصة قيادة"
                                                                : null}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                        : null}</>
                                    : null}</>
                                : null}
                    {data?.data?.issuingCountry == "ARE"
                        ? <>
                            {data?.data?.type == "PASSPORT" //UAE Passport
                                ? ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                    ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                        const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                                            ? ocrApiData.fields
                                            : null
                                        const fnameAr = ocrDataPass["First Name AR"]?.content
                                        const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                        const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                        const fourthnameArr = ocrDataPass["Family Name AR"]?.content
                                        const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                        const genderArr = ocrDataPass["Gender AR"]?.content
                                        const passNationalityArr = ocrDataPass["Nationality AR"]?.content
                                        return (
                                            <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{fnameAr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Father Name</Text>
                                                        <Text style={styles.requestDataText2}>{SecnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{thrdnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{fourthnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Nationality</Text>
                                                        <Text style={styles.requestDataText2}>{passNationalityArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{birthplaceArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Gender</Text>
                                                        <Text style={styles.requestDataText2}>{genderArr == "M"
                                                            ? "الذكر"
                                                            : genderArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Document type</Text>
                                                        <Text style={styles.requestDataText2}>{data?.data?.type == "PASSPORT"
                                                            ? "جواز سفر"
                                                            : null}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                    : null
                                : null}
                            {data?.data?.type == "ID_CARD"  //UAE ID Card
                                ? ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined
                                    ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                        return (ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined
                                            ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                const ocrDatas = ocrApiData && ocrApiData.fields !== undefined
                                                    ? ocrApiData.fields
                                                    : null
                                                const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined
                                                    ? ocrApiBackData.fields
                                                    : null
                                                const idFnameArr = ocrDatas["First Name AR"]?.content
                                                const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                const idNumber = ocrDatas["ID Number"]?.content
                                                const idnationality = ocrDatas["Nationality AR"]?.content
                                                const idOccupation = ocrData1["Occupation AR"]?.content
                                                const idIssueplace = ocrData1["Issuing place AR"]?.content
                                                return (
                                                    <View style={socialStyles.textFontArabic}>
                                                        <View style={styles.viewRequestData}>
                                                            <View>
                                                                <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>First Name</Text>
                                                                <Text style={styles.requestDataText2}>{idFnameArr}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Father Name</Text>
                                                                <Text style={styles.requestDataText2}>{idSecnameArr}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                                <Text style={styles.requestDataText2}>{idthrdnameArr}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Last Name</Text>
                                                                <Text style={styles.requestDataText2}>{idfourthnameArr}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Occupation</Text>
                                                                <Text style={styles.requestDataText2}>{idOccupation !== undefined
                                                                    ? idOccupation
                                                                    : null}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>date of birth</Text>
                                                                <Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                                                    ? data.data.dateOfBirth
                                                                    : null}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Nationality</Text>
                                                                <Text style={styles.requestDataText2}>{idnationality}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>document type</Text>
                                                                <Text style={styles.requestDataText2}>{data?.data?.type == "ID_CARD"
                                                                    ? "بطاقة التعريف"
                                                                    : null}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>document number</Text>
                                                                <Text style={styles.requestDataText2}>{data && data.data && data.data.documentNumber !== undefined
                                                                    ? data.data.documentNumber
                                                                    : null}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>National Number</Text>
                                                                <Text style={styles.requestDataText2}>{idNumber !== undefined
                                                                    ? idNumber
                                                                    : null}</Text>
                                                            </View>
                                                            {data && data.data && data.data.expiryDate
                                                                ? <View>
                                                                    <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                                    <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                        ? data.data.expiryDate
                                                                        : null}</Text>
                                                                </View>
                                                                : null}
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Issuing Place</Text>
                                                                <Text style={styles.requestDataText2}>{idIssueplace !== undefined
                                                                    ? idIssueplace
                                                                    : null}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                            : null)
                                    })
                                    : null
                                : null}
                        </>
                        : null}
                    {data?.data?.issuingCountry == "EGY"
                        ? <>
                            {data?.data?.type == "PASSPORT"             //Egypt Passport
                                ? ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                    ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                        const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                                            ? ocrApiData.fields
                                            : null
                                        const fnameAr = ocrDataPass["First Name AR"]?.content
                                        const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                        const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                        const fourthnameArr = ocrDataPass["Surname AR"]?.content
                                        const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                        const genderArr = ocrDataPass["Gender AR"]?.content
                                        const passNo = ocrDataPass["Passport No"]?.content
                                        const passJobPos = ocrDataPass["Job Position AR"]?.content
                                        const passNationalityArr = ocrDataPass["Nationality AR"]?.content
                                        const passAdd = ocrDataPass["Address AR"]?.valueString
                                        return (
                                            <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{fnameAr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Father Name</Text>
                                                        <Text style={styles.requestDataText2}>{SecnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{thrdnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{fourthnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>date of birth</Text>
                                                        <Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                                            ? data.data.dateOfBirth
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Nationality</Text>
                                                        <Text style={styles.requestDataText2}>{passNationalityArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{birthplaceArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Gender</Text>
                                                        <Text style={styles.requestDataText2}>{genderArr == "M"
                                                            ? "الذكر"
                                                            : genderArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>document type</Text>
                                                        <Text style={styles.requestDataText2}>{data?.data?.type == "PASSPORT"
                                                            ? "جواز سفر"
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>document number</Text>
                                                        <Text style={styles.requestDataText2}>{passNo}</Text>
                                                    </View>
                                                    {data && data.data && data.data.expiryDate
                                                        ? <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                            <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                ? data.data.expiryDate
                                                                : null}</Text>
                                                        </View>
                                                        : null}
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Job Position</Text>
                                                        <Text style={styles.requestDataText2}>{passJobPos}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Address</Text>
                                                        <Text style={styles.requestDataText2}>{passAdd}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                    : null
                                : null}
                            {data?.data?.type == "ID_CARD"          //Egypt Id Card
                                ? ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined
                                    ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                        return (
                                            ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined
                                                ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                    const ocrDatas = ocrApiData && ocrApiData.fields !== undefined
                                                        ? ocrApiData.fields
                                                        : null
                                                    const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined
                                                        ? ocrApiBackData.fields
                                                        : null
                                                    const idFnameArr = ocrDatas["First Name AR"]?.content
                                                    const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                    const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                    const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                    const idNationality = ocrDatas["National Number"]?.content
                                                    const idAddArr = ocrDatas["Address AR"]?.valueString
                                                    const idgenderArr = ocrData1["Gender AR"]?.content
                                                    const idMaritSta = ocrData1["Marital Status"]?.content
                                                    const idOccupation = ocrData1["occupation AR"]?.content
                                                    return (
                                                        <View style={socialStyles.textFontArabic}>
                                                            <View style={styles.viewRequestData}>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>First Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idFnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Father Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idSecnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idthrdnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Last Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idfourthnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Maritual Status</Text>
                                                                    <Text style={styles.requestDataText2}>{idMaritSta !== undefined
                                                                        ? idMaritSta
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Occupation</Text>
                                                                    <Text style={styles.requestDataText2}>{idOccupation !== undefined
                                                                        ? idOccupation
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>date of birth</Text>
                                                                    <Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                                                        ? data.data.dateOfBirth
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Gender</Text>
                                                                    <Text style={styles.requestDataText2}>{idgenderArr == "/ M"
                                                                        ? "ذكر"
                                                                        : idgenderArr == "F"
                                                                            ? "أنثى"
                                                                            : idgenderArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>document type</Text>
                                                                    <Text style={styles.requestDataText2}>{data?.data?.type == "ID_CARD"
                                                                        ? "بطاقة التعريف"
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>document number</Text>
                                                                    <Text style={styles.requestDataText2}>{data && data.data && data.data.documentNumber !== undefined
                                                                        ? data.data.documentNumber
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>National Number</Text>
                                                                    <Text style={styles.requestDataText2}>{idNationality !== undefined
                                                                        ? idNationality
                                                                        : null}</Text>
                                                                </View>
                                                                {data && data.data && data.data.expiryDate
                                                                    ? <View style={styles.requestDataView}>
                                                                        <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                                        <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                            ? data.data.expiryDate
                                                                            : null}</Text>
                                                                    </View>
                                                                    : null}
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Address</Text>
                                                                    <Text style={styles.requestDataText2}>{idAddArr !== undefined
                                                                        ? idAddArr
                                                                        : null}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                }) : null
                                        )
                                    }) : null
                                : null}
                        </>
                        : null}
                    {data?.data?.issuingCountry == "BHR"
                        ? <>
                            {data?.data?.type == "PASSPORT"         //Bahrin Passport
                                ? ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                    ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                        const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                                            ? ocrApiData.fields
                                            : null
                                        const fnameAr = ocrDataPass["First Name AR"]?.content
                                        const SecnameArr = ocrDataPass["Father Name AR"]?.content
                                        const thrdnameArr = ocrDataPass["Grand Father Name AR"]?.content
                                        const fourthnameArr = ocrDataPass["Family Name AR"]?.content
                                        const birthplaceArr = ocrDataPass["Place of Birth AR"]?.content
                                        const genderArr = ocrDataPass["Gender AR"]?.content
                                        const passNo = ocrDataPass["Passport Number"]?.content
                                        const passAuth = ocrDataPass["Occupation AR"]?.content
                                        const passNationalityArr = ocrDataPass["Nationality AR"]?.content
                                        const passPerNo = ocrDataPass["Personal Number"]?.content
                                        return (
                                            <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{fnameAr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Father Name</Text>
                                                        <Text style={styles.requestDataText2}>{SecnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{thrdnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{fourthnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>date of birth</Text>
                                                        <Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                                            ? data.data.dateOfBirth
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Nationality</Text>
                                                        <Text style={styles.requestDataText2}>{passNationalityArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{birthplaceArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Gender</Text>
                                                        <Text style={styles.requestDataText2}>{genderArr == "M"
                                                            ? "الذكر"
                                                            : genderArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>document type</Text>
                                                        <Text style={styles.requestDataText2}>{data?.data?.type == "PASSPORT"
                                                            ? "جواز سفر"
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>document number</Text>
                                                        <Text style={styles.requestDataText2}>{passNo}</Text>
                                                    </View>
                                                    {data && data.data && data.data.expiryDate
                                                        ? <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                            <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                ? data.data.expiryDate
                                                                : null}</Text>
                                                        </View>
                                                        : null}
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Occupation</Text>
                                                        <Text style={styles.requestDataText2}>{passAuth}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Personal Number</Text>
                                                        <Text style={styles.requestDataText2}>{passPerNo}</Text>
                                                    </View>
                                                </View>
                                            </View>)
                                    })
                                    : null
                                : null}
                            {data?.data?.type == "ID_CARD"          //Bahrin Id Card
                                ? ocrData && ocrData[0] && ocrData[0].analyzeResult && ocrData[0].analyzeResult.documents !== undefined
                                    ? ocrData[0].analyzeResult.documents.map((ocrApiData) => {
                                        return (
                                            ocrData && ocrData[1] && ocrData[1].analyzeResult && ocrData[1].analyzeResult.documents !== undefined
                                                ? ocrData[1].analyzeResult.documents.map((ocrApiBackData) => {
                                                    const ocrDatas = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields
                                                        : null
                                                    const ocrData1 = ocrApiBackData && ocrApiBackData.fields !== undefined ? ocrApiBackData.fields
                                                        : null
                                                    const idFnameArr = ocrDatas["First Name AR"]?.content
                                                    const idSecnameArr = ocrDatas["Father Name AR"]?.content
                                                    const idthrdnameArr = ocrDatas["Grand Father Name AR"]?.content
                                                    const idfourthnameArr = ocrDatas["Family Name AR"]?.content
                                                    const idNationality = ocrDatas["Nationality AR"]?.content
                                                    const idPerNoArr = ocrDatas["Personal Number"]?.content
                                                    const idgenderArr = ocrData1["Gender AR"]?.content
                                                    return (
                                                        <View style={socialStyles.textFontArabic}>
                                                            <View style={styles.viewRequestData}>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>First Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idFnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Father Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idSecnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idthrdnameArr} </Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Last Name</Text>
                                                                    <Text style={styles.requestDataText2}>{idfourthnameArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Personal Number</Text>
                                                                    <Text style={styles.requestDataText2}>{idPerNoArr !== undefined
                                                                        ? idPerNoArr
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>date of birth</Text>
                                                                    <Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                                                        ? data.data.dateOfBirth
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Gender</Text>
                                                                    <Text style={styles.requestDataText2}>{idgenderArr == "/ M"
                                                                        ? "ذكر"
                                                                        : idgenderArr == "F"
                                                                            ? "أنثى"
                                                                            : idgenderArr}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Document type</Text>
                                                                    <Text style={styles.requestDataText2}>{data?.data?.type == "ID_CARD"
                                                                        ? "بطاقة التعريف"
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>document number</Text>
                                                                    <Text style={styles.requestDataText2}>{data && data.data && data.data.documentNumber !== undefined
                                                                        ? data.data.documentNumber
                                                                        : null}</Text>
                                                                </View>
                                                                <View style={styles.requestDataView}>
                                                                    <Text style={styles.requestDataText1}>Nationality</Text>
                                                                    <Text style={styles.requestDataText2}>{idNationality !== undefined
                                                                        ? idNationality
                                                                        : null}</Text>
                                                                </View>
                                                                {data && data.data && data.data.expiryDate
                                                                    ? <View style={styles.requestDataView}>
                                                                        <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                                        <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                            ? data.data.expiryDate
                                                                            : null}</Text>
                                                                    </View>
                                                                    : null}
                                                            </View>
                                                        </View>
                                                    )
                                                }) : null)
                                    }) : null
                                : null}
                        </>
                        : null}
                    {data?.data?.issuingCountry == "OMN"
                        ? <>
                            {data?.data?.type == "PASSPORT"
                                ? ocrData && ocrData.analyzeResult && ocrData.analyzeResult.documents !== undefined
                                    ? ocrData.analyzeResult.documents.map((ocrApiData) => {
                                        const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                                            ? ocrApiData.fields
                                            : null
                                        const fnameAr = ocrDataPass["First Name Ar"]?.content
                                        const lastnameAr = ocrDataPass["Family Name AR"]?.content
                                        const countryReg = ocrDataPass["CountryRegion"]?.content
                                        const dobAr = ocrDataPass["DOB"]?.content
                                        const expDateArr = ocrDataPass["DateOfExpiration"]?.content
                                        const issueDateArr = ocrDataPass["Date of Issue"]?.content
                                        const passNo = ocrDataPass["ID Number"]?.content
                                        const doctype = ocrDataPass["DocumentType"]?.content
                                        const issuingAuthArr = ocrDataPass["Issuing Authority"]?.content
                                        const nationality = ocrDataPass["Nationality AR"]?.content
                                        const personalNumber = ocrDataPass["Passport Number"]?.content
                                        const birthPlace = ocrDataPass["Place of Birth AR"]?.content
                                        return (
                                            <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{fnameAr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{lastnameAr}</Text>
                                                    </View>
                                                    {/* <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{thrdnameArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{fourthnameArr}</Text>
                                                    </View> */}
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>date of birth</Text>
                                                        <Text style={styles.requestDataText2}>{dobAr !== undefined
                                                            ? dobAr
                                                            : null}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Nationality</Text>
                                                        <Text style={styles.requestDataText2}>{nationality}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{birthPlace}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Issuing Date</Text>
                                                        <Text style={styles.requestDataText2}>{issueDateArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>document type</Text>
                                                        <Text style={styles.requestDataText2}>{
                                                            "جواز سفر"
                                                        }</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>document number</Text>
                                                        <Text style={styles.requestDataText2}>{passNo}</Text>
                                                    </View>
                                                    {data && data.data && data.data.expiryDate
                                                        ? <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                            <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                ? data.data.expiryDate
                                                                : null}</Text>
                                                        </View>
                                                        : null}
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Issuing Authority</Text>
                                                        <Text style={styles.requestDataText2}>{issuingAuthArr}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Personal Number</Text>
                                                        <Text style={styles.requestDataText2}>{personalNumber}</Text>
                                                    </View>
                                                </View>
                                            </View>)
                                    })
                                    : null
                                : null}
                            {data?.data?.type == "ID_CARD"
                                ?
                                data?.data?.dateOfBirthParts && data?.data?.expiryDateParts
                                    ?
                                    <>
                                        {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                            return <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["First Name AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Father Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Father Name AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Grand Father Name AR"]?.content} </Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Family Name AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Civil number</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Civil Number"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>date of birth</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["DOB"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Place of Birth AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Document type</Text>
                                                        <Text style={styles.requestDataText2}>{ "بطاقة التعريف"
                                                            }</Text>
                                                    </View>
                                                    {ocrData && ocrData[1]?.analyzeResult?.documents?.map((ocData, ocIndex)=>{
                                                        <>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Address</Text>
                                                        <Text style={styles.requestDataText2}>{ocData?.fields?.Address?.content}</Text>
                                                    </View>
                                                    </>
                                                    })}
                                                    {/* <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Nationality</Text>
                                                        <Text style={styles.requestDataText2}>{idNationality !== undefined
                                                            ? idNationality
                                                            : null}</Text>
                                                    </View> */}
                                                    {data && data.data && data.data.expiryDate
                                                        ? <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                            <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                ? data.data.expiryDate
                                                                : null}</Text>
                                                        </View>
                                                        : null}
                                                </View>
                                            </View>
                                        })}
                                    </>
                                    : <>
                                    {ocrData && ocrData[0]?.analyzeResult?.documents?.map((doc, index) => {
                                            return <View style={socialStyles.textFontArabic}>
                                                <View style={styles.viewRequestData}>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataViewMain}>OCR Data</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>First Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["First Name AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Father Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Father Name AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>GrandFather Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Grand Father Name AR"]?.content} </Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Last Name</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Family Name AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Civil number</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Civil Number"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>date of birth</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["DOB"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Place of birth</Text>
                                                        <Text style={styles.requestDataText2}>{doc?.fields["Place of Birth AR"]?.content}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Document type</Text>
                                                        <Text style={styles.requestDataText2}>{ "بطاقة التعريف"
                                                            }</Text>
                                                    </View>
                                                    {ocrData && ocrData[1]?.analyzeResult?.documents?.map((ocData, ocIndex)=>{
                                                        <>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Address</Text>
                                                        <Text style={styles.requestDataText2}>{ocData?.fields?.Address?.content}</Text>
                                                    </View>
                                                    </>
                                                    })}
                                                    {/* <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Nationality</Text>
                                                        <Text style={styles.requestDataText2}>{idNationality !== undefined
                                                            ? idNationality
                                                            : null}</Text>
                                                    </View> */}
                                                    {data && data.data && data.data.expiryDate
                                                        ? <View style={styles.requestDataView}>
                                                            <Text style={styles.requestDataText1}>Expiry Date</Text>
                                                            <Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                                                ? data.data.expiryDate
                                                                : null}</Text>
                                                        </View>
                                                        : null}
                                                </View>
                                            </View>
                                        })}
                                    </>
                                : null}
                        </>
                        : null}
                </>)
        })
        : null
    //  Arabic Data Ends
    return (
        <Document>
            <Page style={styles.pageStyle}>         {/* Page 1 */}
                {pdfExpoBy}
                <View style={styles.viewRequestData}>
                    <Text style={styles.requestDataViewMain}>Request Data</Text>
                    <View style={styles.requestDataView}><Text style={styles.requestDataText1}>Application Status</Text> <Text style={styles.requestDataText2}>{application_status}</Text></View>
                    <View style={styles.requestDataView}><Text style={styles.requestDataText1}>Retrieve date </Text><Text style={styles.requestDataText2}>{retrieve_date}&nbsp;{retrieve_time}</Text></View>
                    <View style={styles.requestDataView}><Text style={styles.requestDataText1}>Verification date </Text><Text style={styles.requestDataText2}>{verification_date}&nbsp;{verification_time}</Text></View>
                </View>
                <View style={styles.viewRequestData}>
                    <View style={styles.docImagesView}>{front_image !== ""
                        ? <Image style={styles.imageFrontBack} src={front_image} cache={false} />
                        : null}
                        {back_image !== ""
                            ? <Image style={styles.imageFrontBack} src={back_image} cache={false} />
                            : null}
                    </View>
                </View>
            </Page>
            <Page style={styles.pageStyle}>{/*page 2 */}
                {face_image !== ""
                    ? <View style={styles.viewRequestData}>
                        <View style={{ alignItems: "center" }}>
                            <Image style={styles.imageFace} src={face_image} cache={false} />
                        </View>
                    </View>
                    : null}
                {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.extraction !== undefined
                    ? singlecustomer.capabilities.extraction.map((data) => {
                        return (
                            <View style={styles.viewRequestData}>
                                <View>
                                    <Text style={styles.requestDataViewMain}>Extracted Data</Text>
                                </View>
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>First Name</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.firstName !== undefined
                                        ? data.data.firstName
                                        : null}</Text>
                                </View>
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>Last Name</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.lastName !== undefined
                                        ? data.data.lastName
                                        : null}</Text>
                                </View>
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>Issuing country</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.issuingCountry !== undefined
                                        ? data.data.issuingCountry
                                        : null}</Text>
                                </View>
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>Date of birth</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.dateOfBirth !== undefined
                                        ? data.data.dateOfBirth
                                        : null}</Text>
                                </View>
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>Document type</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.type !== undefined
                                        ? data.data.type
                                        : null}</Text>
                                </View>
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>Document number</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.documentNumber !== undefined
                                        ? data.data.documentNumber
                                        : null}</Text>
                                </View>
                                {data && data.data && data.data.subType !== undefined ?
                                    <View style={styles.requestDataView}>
                                        <Text style={styles.requestDataText1}>Document sub type</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.subType !== undefined
                                            ? data.data.subType
                                            : null}</Text>
                                    </View> : null}
                                <View style={styles.requestDataView}>
                                    <Text style={styles.requestDataText1}>Nationality code</Text><Text style={styles.requestDataText2}>{data?.data && data.data.issuingCountry !== undefined
                                        ? data.data.issuingCountry
                                        : null}</Text>
                                </View>
                                {data && data.data && data.data.expiryDate
                                    ? <View style={styles.requestDataView}>
                                        <Text style={styles.requestDataText1}>Expiry Date</Text><Text style={styles.requestDataText2}>{data && data.data && data.data.expiryDate !== undefined
                                            ? data.data.expiryDate
                                            : null}</Text>
                                    </View>
                                    : null}
                                {data && data.data && data.data.address
                                    ? <View style={styles.requestDataView}>
                                        <Text style={styles.addressDataLeft}>Address</Text>
                                        <View style={styles.addressDataRight}>
                                            <Text>
                                                {data && data.data && data.data.address && data.data.address.city !== undefined
                                                    ? data.data.address.city
                                                    : null}{' '}
                                                {data && data.data && data.data.address && data.data.address.country !== undefined
                                                    ? data.data.address.country
                                                    : null}{' '}
                                                {data && data.data && data.data.address && data.data.address.subViewision !== undefined
                                                    ? data.data.address.subViewision
                                                    : null}{' '}
                                                {data && data.data && data.data.address && data.data.address.line1 !== undefined
                                                    ? data.data.address.line1
                                                    : null}{' '}
                                                {data && data.data && data.data.address && data.data.address.line2 !== undefined
                                                    ? data.data.address.line2
                                                    : null}{' '}
                                                {data && data.data && data.data.address && data.data.address.postalCode !== undefined
                                                    ? data.data.address.postalCode
                                                    : null}
                                            </Text>
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        )
                    })
                    : null}
                {face_image == ""
                    ? arabicOcrData
                    : null}
            </Page>
            {face_image != ""
                ? <Page style={styles.pageStyle}>{arabicOcrData}</Page>
                : null}
            <Page style={styles.pageStyle}>{/* page 3 */}
                {pdfExpoBy}
                {singlecustomer.workflow?.definitionKey == "10015"
                    ? <View style={styles.viewRequestData}>
                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.dataChecks !== undefined
                            ? singlecustomer.capabilities.dataChecks.map((ids) => {
                                return (
                                    <View>
                                        <View >
                                            <Text style={styles.requestDataViewMain}>ID Doc Check</Text>
                                        </View>
                                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.imageChecks !== undefined
                                            ? singlecustomer.capabilities.imageChecks.map((imgchk) => {
                                                return (<>{singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.usability !== undefined
                                                    ? singlecustomer.capabilities.usability.map((usability) => {
                                                        wfmap++;
                                                        return (<>
                                                            <View>
                                                                <>
                                                                    {ids && ids.decision && ids.decision.type !== undefined
                                                                        ? ids.decision.type && imgchk && imgchk.decision && imgchk.decision.type !== undefined && wfmap == 1
                                                                            ? imgchk.decision.type && usability && usability.decision && usability.decision.type !== undefined
                                                                                ? usability.decision.type == "PASSED"
                                                                                    ? <>
                                                                                        <View>
                                                                                            <Text style={styles.docQualityHeading}>Document photo quality</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; Document is supported for check.</Text>
                                                                                        </View>
                                                                                        <View>
                                                                                            <Text style={styles.docQualityHeading}>Fraud assessment</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; The document does match the expected document template.</Text>
                                                                                            <Text style={styles.docQualityHeadingText} >{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}{'  '}Picture of the face is found blur on the document.</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; Picture of the face on the document does not show signs of tampering or modification.</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>
                                                                                                {validaData && validaData?.detailvalidaAppId !== undefined
                                                                                                    ? validaData?.detailvalidaAppId[0]?.alert || validaData?.detailvalidaAppId[1]?.alert
                                                                                                        ? <><Image src={WrongIcon} /></>
                                                                                                        : <><Image src={RightIcon} /></>
                                                                                                    : null}&nbsp; Document does not show signs of digital tampering.
                                                                                            </Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; Fonts that used on a document are correct.</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{ids.decision.type !== "DIGITAL_MANIPULATION"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}{'  '}No issues with security features found.</Text>
                                                                                        </View>
                                                                                        <View >
                                                                                            <Text style={styles.docQualityHeading}>Consistency and validity of extracted data</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>
                                                                                                {ids.decision.type == "PASSED"
                                                                                                    ? <Text style={styles.rightCrossImg}>
                                                                                                        <Image src={RightIcon} style={styles.rightCrossImg} />
                                                                                                    </Text>
                                                                                                    : <Text style={styles.rightCrossImg}>
                                                                                                        <Image src={WrongIcon} style={styles.rightCrossImg} />
                                                                                                    </Text>}{'  '}Data extracted from the document is consistent and valid.</Text>

                                                                                            <Text style={styles.docQualityHeadingText}>
                                                                                                {ids.decision.type == "PASSED"
                                                                                                    ? <Text style={styles.rightCrossImg}>
                                                                                                        <Image src={RightIcon} style={styles.rightCrossImg} />
                                                                                                    </Text>
                                                                                                    : <Text style={styles.rightCrossImg}>
                                                                                                        <Image src={WrongIcon} style={styles.rightCrossImg} />
                                                                                                    </Text>}{'  '}{ids?.decision?.details?.label}</Text>
                                                                                        </View>
                                                                                        <View >
                                                                                            <Text style={styles.docQualityHeading}>Images Check</Text>
                                                                                            <Text>
                                                                                                <Text style={styles.docQualityHeadingText}>
                                                                                                    {imgchk.decision.type == "PASSED"
                                                                                                        ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                        : imgchk.decision.type == "REJECTED"
                                                                                                            ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                            : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                    {'  '}{imgchk.decision.details.label}
                                                                                                </Text>
                                                                                            </Text>
                                                                                        </View>
                                                                                        <View >
                                                                                            <Text style={styles.docQualityHeading}>Usability Check</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{usability.decision.type == "PASSED"
                                                                                                ? <Text >
                                                                                                    {usability.decision.type == "PASSED"
                                                                                                        ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                        : usability.decision.type == "REJECTED"
                                                                                                            ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                            : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                    {'  '}{usability.decision.details.label}
                                                                                                </Text>
                                                                                                : null}
                                                                                            </Text>
                                                                                        </View>
                                                                                    </>
                                                                                    : <>
                                                                                        <View>
                                                                                            <Text style={styles.docQualityHeading}>Document photo quality</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}Document is supported for check.</Text>
                                                                                        </View>
                                                                                        <View>
                                                                                            <Text style={styles.docQualityHeading}>Fraud assessment</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; The document does match the expected document template.</Text>
                                                                                            <Text style={styles.docQualityHeadingText} >{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}{'  '}&nbsp; Picture of the face is found blur on the document.</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; Picture of the face on the document does not show signs of tampering or modification.</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>
                                                                                                {validaData && validaData?.detailvalidaAppId !== undefined
                                                                                                    ? validaData?.detailvalidaAppId[0]?.alert || validaData?.detailvalidaAppId[1]?.alert
                                                                                                        ? <><Image src={WrongIcon} /></>
                                                                                                        : <><Image src={RightIcon} /></>
                                                                                                    : null}&nbsp; Document does not show signs of digital tampering.
                                                                                            </Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}&nbsp; Fonts that used on a document are correct.</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{ids.decision.type !== "DIGITAL_MANIPULATION"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}{'  '}No issues with security features found.</Text>
                                                                                        </View>
                                                                                        <View >
                                                                                            <Text style={styles.docQualityHeading}>Consistency and validity of extracted data</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{ids.decision.type == "PASSED"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}{' '}{ids.decision.details.label}</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>{ids.decision.type == "PASSED"
                                                                                                ? <><Image src={RightIcon} /></>
                                                                                                : <><Image src={WrongIcon} /></>}{'  '}Data extracted from the document is consistent and valid.</Text>

                                                                                            <Text style={styles.docQualityHeadingText}>
                                                                                                {ids.decision.type == "PASSED"
                                                                                                    ? <Text style={styles.rightCrossImg}>
                                                                                                        <Image src={RightIcon} style={styles.rightCrossImg} />
                                                                                                    </Text>
                                                                                                    : <Text style={styles.rightCrossImg}>
                                                                                                        <Image src={WrongIcon} style={styles.rightCrossImg} />
                                                                                                    </Text>}{'  '}{ids?.decision?.details?.label}</Text>
                                                                                        </View>
                                                                                        <View >
                                                                                            <Text style={styles.docQualityHeading}>Images Check</Text>
                                                                                            <Text style={styles.docQualityHeadingText}>
                                                                                                <>
                                                                                                    {imgchk.decision.type == "PASSED"
                                                                                                        ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                        : imgchk.decision.type == "REJECTED"
                                                                                                            ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                            : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                    {'  '}{imgchk.decision.details.label}
                                                                                                </>
                                                                                            </Text>
                                                                                        </View>

                                                                                        <View>
                                                                                            <Text style={styles.docQualityHeading}>Usability Check</Text>
                                                                                            <Text>
                                                                                                <Text style={styles.docQualityHeadingText}>
                                                                                                    {usability.decision.type == "PASSED"
                                                                                                        ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                        : usability.decision.type == "REJECTED"
                                                                                                            ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                            : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                    {'  '}{usability.decision.details.label}
                                                                                                </Text>
                                                                                            </Text>
                                                                                        </View>
                                                                                    </>
                                                                                : null
                                                                            : null
                                                                        : null
                                                                    }</>
                                                            </View></>)
                                                    })
                                                    : null}
                                                </>)
                                            })
                                            : null}
                                    </View>)
                            })
                            : null}
                    </View>
                    : null}
                {singlecustomer.workflow?.definitionKey !== "10015"
                    ? <View style={styles.viewRequestData}>
                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.dataChecks !== undefined
                            ? singlecustomer.capabilities.dataChecks.map((ids) => {
                                return (
                                    <View>
                                        <View >
                                            <Text style={styles.requestDataViewMain}>ID Doc Check</Text>
                                        </View>
                                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.imageChecks !== undefined
                                            ? singlecustomer.capabilities.imageChecks.map((imgchk) => {
                                                return (<>
                                                    {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.usability !== undefined
                                                        ? singlecustomer.capabilities.usability.map((usability) => {
                                                            wfmap++;
                                                            return (
                                                                <>
                                                                    <View>
                                                                        <>
                                                                            {ids && ids.decision && ids.decision.type !== undefined
                                                                                ? ids.decision.type && imgchk && imgchk.decision && imgchk.decision.type !== undefined && wfmap == 1
                                                                                    ? imgchk.decision.type && usability && usability.decision && usability.decision.type !== undefined
                                                                                        ? usability.decision.type == "PASSED"
                                                                                            ? <>
                                                                                                <View>
                                                                                                    <Text style={styles.docQualityHeading}>Document photo quality</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; Document is supported for check.</Text>
                                                                                                </View>
                                                                                                <View>
                                                                                                    <Text style={styles.docQualityHeading}>Fraud assessment</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; The document does match the expected document template.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText} >{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}{'  '}Picture of the face is found blur on the document.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; Picture of the face on the document does not show signs of tampering or modification.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        {validaData && validaData?.detailvalidaAppId !== undefined
                                                                                                            ? validaData?.detailvalidaAppId[0]?.alert || validaData?.detailvalidaAppId[1]?.alert
                                                                                                                ? <><Image src={WrongIcon} /></>
                                                                                                                : <><Image src={RightIcon} /></>
                                                                                                            : null}&nbsp; Document does not show signs of digital tampering.
                                                                                                    </Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; Fonts that used on a document are correct.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{ids.decision.type !== "DIGITAL_MANIPULATION"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}{'  '}No issues with security features found.</Text>
                                                                                                </View>
                                                                                                <View >
                                                                                                    <Text style={styles.docQualityHeading}>Consistency and validity of extracted data</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        {ids.decision.type == "PASSED"
                                                                                                            ? <Text style={styles.rightCrossImg}>
                                                                                                                <Image src={RightIcon} style={styles.rightCrossImg} />
                                                                                                            </Text>
                                                                                                            : <Text style={styles.rightCrossImg}>
                                                                                                                <Image src={WrongIcon} style={styles.rightCrossImg} />
                                                                                                            </Text>}{'  '}Data extracted from the document is consistent and valid.</Text>

                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        {ids.decision.type == "PASSED"
                                                                                                            ? <Text style={styles.rightCrossImg}>
                                                                                                                <Image src={RightIcon} style={styles.rightCrossImg} />
                                                                                                            </Text>
                                                                                                            : <Text style={styles.rightCrossImg}>
                                                                                                                <Image src={WrongIcon} style={styles.rightCrossImg} />
                                                                                                            </Text>}{'  '}{ids?.decision?.details?.label}</Text>
                                                                                                </View>
                                                                                                <View >
                                                                                                    <Text style={styles.docQualityHeading}>Images Check</Text>
                                                                                                    <Text>
                                                                                                        <Text style={styles.docQualityHeadingText}>
                                                                                                            {imgchk.decision.type == "PASSED"
                                                                                                                ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                : imgchk.decision.type == "REJECTED"
                                                                                                                    ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                    : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                            {'  '}{imgchk.decision.details.label}
                                                                                                        </Text>
                                                                                                    </Text>
                                                                                                </View>
                                                                                                <View >
                                                                                                    <Text style={styles.docQualityHeading}>Usability Check</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        <Text >
                                                                                                            {usability.decision.type == "PASSED"
                                                                                                                ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                : usability.decision.type == "REJECTED"
                                                                                                                    ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                    : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                            {'  '}{usability.decision.details.label}
                                                                                                        </Text>
                                                                                                    </Text>
                                                                                                </View>
                                                                                            </>
                                                                                            : <>
                                                                                                <View>
                                                                                                    <Text style={styles.docQualityHeading}>Document photo quality</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}Document is supported for check.</Text>
                                                                                                </View>
                                                                                                <View>
                                                                                                    <Text style={styles.docQualityHeading}>Fraud assessment</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; The document does match the expected document template.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText} >{imgchk.decision.details.label !== "PRECONDITION_NOT_FULFILLED"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}{'  '}Picture of the face is found blur on the document.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "DIGITAL_MANIPULATION"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; Picture of the face on the document does not show signs of tampering or modification.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        {validaData && validaData?.detailvalidaAppId !== undefined
                                                                                                            ? validaData?.detailvalidaAppId[0]?.alert || validaData?.detailvalidaAppId[1]?.alert
                                                                                                                ? <><Image src={WrongIcon} /></>
                                                                                                                : <><Image src={RightIcon} /></>
                                                                                                            : null}&nbsp; Document does not show signs of digital tampering.
                                                                                                    </Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{imgchk.decision.details.label !== "MANIPULATED_DOCUMENT"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}&nbsp; Fonts that used on a document are correct.</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{ids.decision.type == "DIGITAL_MANIPULATION"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}{'  '}No issues with security features found.</Text>
                                                                                                </View>
                                                                                                <View >
                                                                                                    <Text style={styles.docQualityHeading}>Consistency and validity of extracted data</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{ids.decision.type == "PASSED"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}{' '}{ids.decision.details.label}</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>{ids.decision.type == "PASSED"
                                                                                                        ? <><Image src={RightIcon} /></>
                                                                                                        : <><Image src={WrongIcon} /></>}{'  '}Data extracted from the document is consistent and valid.</Text>

                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        {ids.decision.type == "PASSED"
                                                                                                            ? <Text style={styles.rightCrossImg}>
                                                                                                                <Image src={RightIcon} style={styles.rightCrossImg} />
                                                                                                            </Text>
                                                                                                            : <Text style={styles.rightCrossImg}>
                                                                                                                <Image src={WrongIcon} style={styles.rightCrossImg} />
                                                                                                            </Text>}{'  '}{ids?.decision?.details?.label}</Text>
                                                                                                </View>
                                                                                                <View >
                                                                                                    <Text style={styles.docQualityHeading}>Images Check</Text>
                                                                                                    <Text style={styles.docQualityHeadingText}>
                                                                                                        <>
                                                                                                            {imgchk.decision.type == "PASSED"
                                                                                                                ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                : imgchk.decision.type == "REJECTED"
                                                                                                                    ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                    : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                            {'  '}{imgchk.decision.details.label}
                                                                                                        </>
                                                                                                    </Text>
                                                                                                </View>
                                                                                                <View>
                                                                                                    <Text style={styles.docQualityHeading}>Usability Check</Text>
                                                                                                    <Text>
                                                                                                        <Text style={styles.docQualityHeadingText}>
                                                                                                            {usability.decision.type == "PASSED"
                                                                                                                ? <Text style={styles.rightCrossImg}><Image src={RightIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                : usability.decision.type == "REJECTED"
                                                                                                                    ? <Text style={styles.rightCrossImg}><Image src={WrongIcon} style={styles.rightCrossImg} /></Text>
                                                                                                                    : <Text style={styles.rightCrossImg}><Image src={WarnIcon} style={styles.rightCrossImg} /></Text>}
                                                                                                            {'  '}{usability.decision.details.label}
                                                                                                        </Text>
                                                                                                    </Text>
                                                                                                </View>
                                                                                            </>
                                                                                        : null
                                                                                    : null
                                                                                : null
                                                                            }</>
                                                                    </View>
                                                                </>)
                                                        })
                                                        : null}</>)
                                            })
                                            : null}</View>)
                            }) : null}</View>
                    : null}
                {singlecustomer?.capabilities && singlecustomer.capabilities.similarity !== undefined
                    || singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.liveness !== undefined
                    ? <View style={styles.facialLiveness}>
                        {singlecustomer?.capabilities && singlecustomer.capabilities.similarity !== undefined
                            ? singlecustomer.capabilities.similarity.map((similar) => {
                                return (
                                    <View style={socialStyles.firstSectionView2Main}>
                                        <View style={socialStyles.firstSectionView2_1}>
                                            <View>
                                                <Text style={styles.requestDataViewMain}>Facial Similarity</Text>
                                            </View>
                                            <View>
                                                {singlecustomer.workflow.definitionKey !== "10015"
                                                    ? <>
                                                        {similar?.decision?.type == "PASSED"
                                                            ? <>
                                                                <View>
                                                                    <Text style={styles.docQualityHeading}>Selfie provided</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={RightIcon} />{'  '}One face at photo.</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={RightIcon} />{'  '}This is a selfie.</Text>
                                                                </View>
                                                            </>
                                                            : <>
                                                                <View>
                                                                    <Text style={styles.docQualityHeading}>Selfie provided</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={WrongIcon} />{' '}{similar?.decision?.details?.label}</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={RightIcon} />{'  '}One face at photo.</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={RightIcon} />{'  '}This is a selfie.</Text>
                                                                </View>
                                                            </>}</>
                                                    : null}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            : null}
                        {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.liveness !== undefined
                            ? singlecustomer.capabilities.liveness.map((live) => {
                                return (
                                    <View style={socialStyles.firstSectionView3Main}>
                                        <View style={socialStyles.firstSectionView3_1}>
                                            <View>
                                                <Text style={styles.requestDataViewMain}>Liveness Check</Text>
                                            </View>
                                            <View>
                                                {singlecustomer.workflow.definitionKey !== "10015"
                                                    ? <>
                                                        {live?.decision?.type == "PASSED"
                                                            ? <>
                                                                <View>
                                                                    <Text style={styles.docQualityHeading}>Identity check in live mode</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={RightIcon} />{'  '}<Text styles={{}}>Liveness service signature match</Text></Text>
                                                                    <Text style={styles.docQualityHeadingText}>{live?.decision?.type == "PASSED"
                                                                        ? <Image src={RightIcon} />
                                                                        : <Image src={WrongIcon} />}{'  '}<Text>Liveness check passed</Text></Text>
                                                                </View>
                                                            </>
                                                            : <>
                                                                <Text style={styles.docQualityHeading}>Liveness check failed</Text>
                                                                <View>
                                                                    <View><Text style={styles.docQualityHeading}>Identity check in live mode</Text></View>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={WrongIcon} />{' '}{live?.decision?.details?.label}</Text>
                                                                    <Text style={styles.docQualityHeadingText}><Image src={RightIcon} />{'  '}Liveness service signature match</Text>
                                                                    <Text style={styles.docQualityHeadingText}>{live?.decision?.type == "PASSED"
                                                                        ? <Image src={RightIcon} />
                                                                        : <Image src={WrongIcon} />}{'  '}Liveness check passed</Text>
                                                                </View>
                                                            </>
                                                        }</>
                                                    : null}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            : null}
                    </View>
                    : null
                }
            </Page>
            <Page style={styles.pageStyle}>
                {validaComponent}
            </Page>
            <Page style={styles.pageStyle}>{/* page 4 */}
                <View style={metaData.appRulesBothMain} >
                    <View style={metaData.ipdatasection}>
                        <View style={metaData.IpDataView}>
                            <View>
                                <Text style={styles.ipassDataViewMain}>Metadata</Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={metaData.metaHeadingId} >Geolocation Data </Text>
                                    {ipData
                                        ? <View style={metaData.ipdataContent} >
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Ip Address</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.ip}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Isp Name</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.isp_name}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Country</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.country}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>City</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.city}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Score</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.score}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Spam Number</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.spam_number}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>State Prov</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.state_prov}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>TimeZone</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.timezone_offset}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Type</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.type}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Customer Hits</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.history?.customer_hits}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Hits</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.history?.hits}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Harmful</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.harmful == false
                                                    ? "No"
                                                    : ipData?.harmful == true
                                                        ? "Yes"
                                                        : null}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Tor</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.tor == false
                                                    ? "No"
                                                    : ipData?.tor == true
                                                        ? "Yes"
                                                        : null}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Vpn</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.vpn == false
                                                    ? "No"
                                                    : ipData?.vpn == true
                                                        ? "Yes"
                                                        : null}</Text>
                                            </View>
                                            <View style={metaData.ipdatainnerContent}>
                                                <Text style={metaData.metaRowText1}>Web Proxy</Text>
                                                <Text style={metaData.metaRowText2}>{ipData?.web_proxy == false
                                                    ? "No"
                                                    : ipData?.web_proxy == true
                                                        ? "Yes"
                                                        : null}</Text>
                                            </View>
                                        </View>
                                        : <Text style={metaData.metaHeadingId}>No data available</Text>}
                                </View>
                            </View>
                        </View>
                        {ipData && ipData.applied_rules !== undefined
                            ? ipData.applied_rules.map((rules) => {
                                return (
                                    <View style={metaData.appliedRulesMail}>
                                        <Text style={metaData.metaHeadingId}>Applied Rules</Text>
                                        <View>
                                            <View style={metaData.metaBox}>
                                                <Text style={metaData.metaBoxText1}>{rules.id}</Text>{' '}
                                                <Text style={metaData.metaBoxText2}>{rules.name}</Text>{' '}
                                                <Text style={metaData.metaBoxText3}>{rules.operation}{' '}{rules.score}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            : null}
                        {ipData?.spam_urls?.length > 0
                            ? <View style={metaData.appliedRulesMail}>
                                <Text style={metaData.metaHeadingId}>Spam Url</Text>
                                <View style={metaData.metaBox1}>
                                    <Text style={metaData.appRulesData}>{ipData?.spam_urls[0] !== undefined
                                        ? ipData?.spam_urls[0]
                                        : null}</Text>
                                    <Text style={metaData.appRulesData}>{ipData?.spam_urls[1] !== undefined
                                        ? ipData?.spam_urls[1]
                                        : null}</Text>
                                    <Text style={metaData.appRulesData}>{ipData?.spam_urls[2] !== undefined
                                        ? ipData?.spam_urls[2]
                                        : null}</Text>
                                    <Text style={metaData.appRulesData}>{ipData?.spam_urls[3] !== undefined
                                        ? ipData?.spam_urls[3]
                                        : null}</Text>
                                    <Text style={metaData.appRulesData}>{ipData?.spam_urls[4] !== undefined
                                        ? ipData?.spam_urls[4]
                                        : null}</Text>
                                </View>
                            </View>
                            : null}
                        {ipData?.flags?.length > 0
                            ? <View style={metaData.appliedRulesMail}>
                                <Text style={metaData.metaHeadingId}>Flags</Text>
                                {ipData && ipData.flags !== undefined
                                    ? ipData.flags.map((flag) => {
                                        return (
                                            <>
                                                <View style={metaData.metaBox1}>
                                                    <Text style={metaData.appRulesData}>{flag?.industry}</Text>
                                                    <Text style={metaData.appRulesData}>{flag?.note}</Text>
                                                </View>
                                            </>
                                        )
                                    })
                                    : null}
                            </View>
                            : null}
                    </View>
                </View>
            </Page>
            {watchlistData && watchlistData !== null && watchlistData !== [] && singlecustomer && singlecustomer.workflow && singlecustomer.workflow.definitionKey !== undefined
                ? singlecustomer.workflow.definitionKey !== "10011"
                    ? <Page style={styles.pageStyle}>{/* page 5*/}
                        {pdfExpoBy}
                        <View style={styles.viewRequestData}>
                            <Text style={styles.requestDataViewMain}>AML Watchlist</Text>
                            <View>
                                <View>
                                    <View>
                                        <View>
                                            <Text style={styles.docQualityHeading}>Summary</Text>
                                        </View>
                                        <View style={styles.requestDataView}>
                                            <Text style={styles.requestDataText1}>Account id</Text>
                                            <Text style={styles.requestDataText2}>{watchlistData.account.id}</Text>
                                        </View>
                                    </View>
                                    {watchlistData.capabilities && watchlistData.capabilities.watchlistScreening !== undefined
                                        ? watchlistData.capabilities.watchlistScreening.map((watch) => {
                                            const date = watch.data.searchDate.slice(0, 10)
                                            const time = watch.data.searchDate.slice(11, 16)
                                            const datetime = `${date}${time}`
                                            return (
                                                <View>
                                                    <View>
                                                        <Text style={styles.docQualityHeading}>Screening</Text>
                                                    </View>
                                                    <View>
                                                        <View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Status</Text>
                                                                <Text style={styles.requestDataText2}>{watch.data.searchStatus}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Result URL</Text>
                                                                <Link src={watch && watch.data && watch.data.searchResultUrl !== undefined
                                                                    ? watch.data.searchResultUrl
                                                                    : "#"}><Text style={styles.requestDataText2}>Open CA Case</Text></Link>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Search Date</Text>
                                                                <Text style={styles.requestDataText2}>{datetime}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Search Reference</Text>
                                                                <Text style={styles.requestDataText2}>{watch.data.searchReference}</Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Count Of Results</Text>
                                                                <Text style={styles.requestDataText2}>{watch.data.searchResults}</Text>
                                                            </View>
                                                            <View style={styles.requestDataView}>
                                                                <Text style={styles.requestDataText1}>Search ID</Text>
                                                                <Text style={styles.requestDataText2}>{watch.data.searchId}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                        : null}
                                    <View>
                                        <View>
                                            <View style={{ marginTop: "10px" }}>
                                                <Text style={styles.docQualityHeading}>Transaction Metadata</Text>
                                            </View>
                                            <View>
                                                <View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Customer Internal Reference</Text>
                                                        <Text style={styles.requestDataText2}>{watchlistData.workflow.customerInternalReference}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>User Reference</Text>
                                                        <Text style={styles.requestDataText2}>---</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Reporting Criteria</Text>
                                                        <Text style={styles.requestDataText2}>---</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Initiated At</Text>
                                                        <Text style={styles.requestDataText2}>{initatedatetime}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Started At</Text>
                                                        <Text style={styles.requestDataText2}>{startDateTime}</Text>
                                                    </View>
                                                    <View style={styles.requestDataView}>
                                                        <Text style={styles.requestDataText1}>Completed At</Text>
                                                        <Text style={styles.requestDataText2}>{completeDateTime}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Page>
                    : null
                : null
            }
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <Page style={styles.pageStyle2}>{/* page 6*/}
                {pdfExpoBy}
                <View style={socialStyles.mainPage}>
                    <View>
                        <Text style={styles.requestDataViewMain}>Social Media</Text>
                    </View>
                    <View>
                        <View>
                            {singleCust && singleCust.data && singleCust.data.data !== undefined && singleCust && singleCust.data && singleCust.data.data !== null
                                ? <View>
                                    <View style={socialStyles.firstSectionView}>
                                        <View style={socialStyles.firstTopSection}>
                                            <Text style={[socialStyles.firstTopSectionText, { width: "180px" }]}>User ID</Text>
                                            <Text style={[socialStyles.firstTopSectionText, { width: "50px" }]}>Result</Text>
                                            <Text style={[socialStyles.firstTopSectionText, { width: '200px' }]}>Email</Text>
                                            <Text style={socialStyles.firstTopSectionText}>{'  '}Date</Text>
                                        </View>
                                        <View style={socialStyles.firstBottomSection}>
                                            <Text style={[socialStyles.firstBottomSectionText, { width: "180px" }]}>
                                                {singleCust && singleCust.data && singleCust.data._id !== undefined
                                                    ? singleCust.data._id
                                                    : null}
                                            </Text>
                                            <Text style={[socialStyles.firstBottomSectionText, { width: "50px" }]}>
                                                {singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                    ? singleCust.data.data.score
                                                    : null}
                                            </Text>
                                            <Text style={[socialStyles.firstBottomSectionTextEmail, { width: '200px' }]}>
                                                {singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                    ? singleCust.data.data.email
                                                    : null}
                                            </Text>
                                            <Text style={socialStyles.firstBottomSectionText}>
                                                {' '} {seonfinalDat}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={socialStyles.firstSectionView}>
                                        <View style={socialStyles.fraudSection}>
                                            <View style={socialStyles.fraudSectionFirst}>
                                                <Text style={socialStyles.fraudSectionFirstText}>
                                                    {singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                        ? singleCust.data.data.score
                                                        : null}.00
                                                </Text>
                                                <Text style={socialStyles.fraudSectionFirstTitle}>Degree Of Fraud</Text>
                                            </View>

                                            <View style={socialStyles.fraudSectionSecond}>
                                                <View >
                                                    <Text style={socialStyles.fraudSectionSecondText}>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                        ? singleCust.data.data.score
                                                        : null}.00</Text>
                                                    <Text style={socialStyles.fraudSectionSecondTitle} >Email Score</Text>
                                                </View>
                                                <View  >
                                                    <Text style={socialStyles.fraudSectionSecondText}>0.00</Text>
                                                    <Text style={socialStyles.fraudSectionSecondTitle}>IP score</Text>
                                                </View>
                                                <View>
                                                    <Text style={socialStyles.fraudSectionSecondText}>{singleCust && singleCust.data_phone !== undefined
                                                        ? singleCust.data_phone.score
                                                        : null}.00</Text>
                                                    <Text style={socialStyles.fraudSectionSecondTitle}>Phone class</Text>
                                                </View>
                                                <View>
                                                    <Text style={socialStyles.fraudSectionSecondText}>N/A</Text>
                                                    <Text style={socialStyles.fraudSectionSecondTitle}>Device score</Text>
                                                </View>
                                            </View>
                                            <View style={socialStyles.fraudSectionThird}>
                                                <View>
                                                    <Text style={socialStyles.rulesTitle}>Rules Applicable</Text>
                                                    <View>
                                                        <Text style={socialStyles.emailRules}><Image src={FolderIcon} />{'   '}Email Rules</Text>
                                                        {singleCust && singleCust.data && singleCust.data.data !== undefined
                                                            ? singleCust.data.data.applied_rules.map((apprul, i) => {
                                                                return (
                                                                    <View style={socialStyles.rulesBox}>
                                                                        <Text style={socialStyles.rulesBoxText1}>{apprul.id}</Text>{' '}
                                                                        <Text style={socialStyles.rulesBoxText2}>{apprul.name}</Text>{' '}
                                                                        <Text style={socialStyles.rulesBoxText3}>{apprul.operation}{' '}{apprul.score}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                            : null}
                                                    </View>
                                                    <View>
                                                        {singleCust && singleCust.data_phone && singleCust.data_phone.applied_rules !== undefined
                                                            ? singleCust.data_phone.applied_rules.map((apprul, i) => {
                                                                return (
                                                                    <View key={i}>
                                                                        <View style={styles.viewMarginTopBottom}>
                                                                            <Text style={socialStyles.emailRules}><Image src={FolderIcon} style={socialStyles.accountIconStyle} />{'   '}Phone Rules</Text>
                                                                        </View>
                                                                        <View style={socialStyles.rulesBox}>
                                                                            <Text style={socialStyles.rulesBoxText1}>{apprul.id}</Text>{' '}
                                                                            <Text style={socialStyles.rulesBoxText2}>{apprul.name}</Text>{' '}
                                                                            <Text style={socialStyles.rulesBoxText3}>{apprul.operation}{' '}{apprul.score}</Text>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            })
                                                            : null}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <View style={socialStyles.firstSectionView2}>
                                                <View>
                                                    <View>
                                                        <View >
                                                            <Text style={socialStyles.socialHeadingId}>Identity</Text>
                                                        </View>
                                                        <View style={socialStyles.identityRow}>
                                                            <Text style={socialStyles.identityRowText1}>User ID</Text>
                                                            <Text style={socialStyles.identityRowText2}>{singleCust && singleCust.data && singleCust.data._id !== undefined
                                                                ? singleCust.data._id
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.identityRow}>
                                                            <Text style={socialStyles.identityRowText1}>Email</Text>
                                                            <Text style={socialStyles.identityRowTextEmail}>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                ? singleCust.data.data.email
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.identityRow}>
                                                            <Text style={socialStyles.identityRowText1}>Total amount</Text>
                                                            <Text style={socialStyles.identityRowText2}>0EUR</Text>
                                                        </View>
                                                        <View style={socialStyles.identityRow}>
                                                            <Text style={socialStyles.identityRowText1}>Total Number of Transactions</Text>
                                                            <Text style={socialStyles.identityRowText2}></Text>
                                                        </View>
                                                        <View style={socialStyles.identityRow}>
                                                            <Text style={socialStyles.identityRowText1}>First View</Text>
                                                            <Text style={socialStyles.identityRowText2}></Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={socialStyles.firstSectionView3}>
                                                <View >
                                                    <View>
                                                        <Text style={socialStyles.socialHeadingId}>Lists Status</Text>
                                                    </View>
                                                    <View >
                                                        <View>
                                                            <Text style={socialStyles.listStatusTitle}>Blacklisted</Text>
                                                            <Text style={socialStyles.listStatusText}>No data has been blacklisted</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={socialStyles.listStatusTitle}>White Listed</Text>
                                                            <Text style={socialStyles.listStatusText}>No data has been whitelisted</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View break={true} >
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <View style={socialStyles.phoneInformation} >
                                                <View >
                                                    <Text style={socialStyles.socialHeadingId}>Phone Information</Text>
                                                    <Text style={socialStyles.phoneNumberClass}>+{singleCust && singleCust.data !== undefined
                                                        ? singleCust.data_phone.number
                                                        : null}</Text>
                                                    <View>
                                                        <View>
                                                            <View style={socialStyles.phoneResultBox}>
                                                                <Text style={socialStyles.phoneResultText}>
                                                                    <Text style={socialStyles.phoneClass1} >{singleCust && singleCust.data_phone && singleCust.data_phone.score !== undefined
                                                                        ? singleCust.data_phone.score
                                                                        : null}.00</Text>
                                                                    <Text style={socialStyles.phoneClass2}>/100</Text>
                                                                </Text>
                                                                <Text style={socialStyles}>Result</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View >
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Country</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data_phone && singleCust.data_phone.country !== undefined
                                                                ? singleCust.data_phone.country
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Valid</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data_phone && singleCust.data_phone.valid !== undefined
                                                                ? singleCust.data_phone.valid == true
                                                                    ? "Yes"
                                                                    : "No"
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Possible</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data_phone && singleCust.data_phone.disposable !== undefined
                                                                ? singleCust.data_phone.disposable == true
                                                                    ? "Yes"
                                                                    : "No"
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Write</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data_phone && singleCust.data_phone.type !== undefined
                                                                ? singleCust.data_phone.type
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Disposable</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data_phone && singleCust.data_phone.disposable !== undefined
                                                                ? singleCust.data_phone.disposable == true
                                                                    ? "Yes"
                                                                    : "No"
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Phone Company</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data_phone && singleCust.data_phone.carrier !== undefined
                                                                ? singleCust.data_phone.carrier
                                                                : null}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <View>
                                                            <View>
                                                                <Text style={socialStyles.registeredHeading}>Registered Online Profiles</Text>
                                                            </View>
                                                            {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== null && phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== false
                                                                ? <View>
                                                                    <View>
                                                                        <View>
                                                                            {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered !== null
                                                                                ? <Text style={socialStyles.textWithIcon}><Image src={SkypeIcon} style={socialStyles.accountIconStyle2} />Skype</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    <View >
                                                                        <View>
                                                                            <Image style={styles.googleLogoIcon} src={NoImage}
                                                                            />
                                                                        </View>
                                                                        <View>
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                ? phoneMedia.skype && phoneMedia.skype.name !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Name:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                            ? phoneMedia.skype && phoneMedia.skype.name
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    : null
                                                                                : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                ? phoneMedia.skype && phoneMedia.skype.id !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Skype ID:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                            ? phoneMedia.skype && phoneMedia.skype.id
                                                                                            : null}</Text></View>
                                                                                    : null
                                                                                : null}

                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined ? phoneMedia.skype && phoneMedia.skype.gender !== null
                                                                                ? <View style={socialStyles.phoneDataBox}>
                                                                                    <Text style={socialStyles.phoneDataTitle}>Gender:</Text>
                                                                                    <Text style={socialStyles.phoneDataText}>{phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                        ? phoneMedia.skype && phoneMedia.skype.gender == 2
                                                                                            ? "Female"
                                                                                            : "Male"
                                                                                        : null}</Text>
                                                                                </View>
                                                                                : null
                                                                                : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                ? phoneMedia.skype && phoneMedia.skype.age !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Age:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                            ? phoneMedia.skype && phoneMedia.skype.age
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    : null
                                                                                : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                ? phoneMedia.skype && phoneMedia.skype.language !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Language:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                            ? phoneMedia.skype && phoneMedia.skype.language
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    : null
                                                                                : null}
                                                                            {phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                ? phoneMedia.skype && phoneMedia.skype.handle !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Deals:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{phoneMedia.skype && phoneMedia.skype !== undefined
                                                                                            ? phoneMedia.skype && phoneMedia.skype.handle
                                                                                            : null}</Text></View>
                                                                                    : null
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                : null}
                                                            <View style={socialStyles}>
                                                                {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== false && phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered !== false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={GoogleIcon} style={socialStyles.accountIconStyle} />Google</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== false && phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        <View >
                                                                            {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={BulkapakIcon} style={socialStyles.accountIconStyle} />Bukalapak</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== false && phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        <View >
                                                                            {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={facebookIcon} style={socialStyles.accountIconStyle} />Facebook</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== false && phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={FlipcartIcon} style={socialStyles.accountIconStyle} />Flipkart</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.instagram && phoneMedia.instagram.registered !== undefined && phoneMedia.instagram.registered !== false && phoneMedia.zoho && phoneMedia.zoho.registered !== undefined && phoneMedia.instagram.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.zoho && phoneMedia.zoho.registered !== undefined && phoneMedia.instagram.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={instaIcon} style={socialStyles.accountIconStyle} />Instagram</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== false && phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Kakao</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== false && phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={MicrosoftIcon} style={socialStyles.accountIconStyle} />Microsoft</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== false && phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        <View >
                                                                            {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={TwitterIcon} style={socialStyles.accountIconStyle} />Twitter</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== false && phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={YahooIcon} style={socialStyles.accountIconStyle} />Yahoo</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== false && phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        <View >
                                                                            {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={SnapchatIcon} style={socialStyles.accountIconStyle} />Snapchat</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== false && phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={ZaloIcon} style={socialStyles.accountIconStyle} />Zalo</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== false && phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={WhatsaapIcon} style={socialStyles.accountIconStyle} />Whatsapp</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== false && phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        <View >
                                                                            {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={ViberIcon} style={socialStyles.accountIconStyle} />Viber</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== false && phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={TelegramIcon} style={socialStyles.accountIconStyle} />Telegram</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== false && phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== null
                                                                    ? <View style={socialStyles}>
                                                                        <View >
                                                                            {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={OkIcon} style={socialStyles.accountIconStyle} />Ok</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== false && phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={LineIcon} style={socialStyles.accountIconStyle} />Line</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== false && phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== null
                                                                    ? <View style={socialStyles} >
                                                                        <View >
                                                                            {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={jdid} style={socialStyles.accountIconStyle} />Jdid</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                            </View>
                                                        </View>
                                                        <View >
                                                            <View >
                                                                <View>
                                                                    <Text style={socialStyles.registeredHeading}>Not registered Online Profiles</Text>
                                                                </View>
                                                            </View>
                                                            <View style={socialStyles.multipleAccountsBox2}>
                                                                {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.bukalapak && phoneMedia.bukalapak.registered !== undefined && phoneMedia.bukalapak.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={BulkapakIcon} style={socialStyles.accountIconStyle} />Bukalapak</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.facebook && phoneMedia.facebook.registered !== undefined && phoneMedia.facebook.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={facebookIcon} style={socialStyles.accountIconStyle} />Facebook</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.flipkart && phoneMedia.flipkart.registered !== undefined && phoneMedia.flipkart.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={FlipcartIcon} style={socialStyles.accountIconStyle} />Flipkart</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.google && phoneMedia.google.registered !== undefined && phoneMedia.google.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={GoogleIcon} style={socialStyles.accountIconStyle} />Google</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.instagram && phoneMedia.instagram.registered !== undefined && phoneMedia.instagram.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.zoho && phoneMedia.zoho.registered !== undefined && phoneMedia.instagram.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={instaIcon} style={socialStyles.accountIconStyle} />Instagram</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.kakao && phoneMedia.kakao.registered !== undefined && phoneMedia.kakao.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Kakao</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.microsoft && phoneMedia.microsoft.registered !== undefined && phoneMedia.microsoft.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={MicrosoftIcon} style={socialStyles.accountIconStyle} />Microsoft</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered == null
                                                                    ? <View  >
                                                                        {phoneMedia.skype && phoneMedia.skype.registered !== undefined && phoneMedia.skype.registered == null
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={SkypeIcon} style={socialStyles.accountIconStyle} />Skype</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.twitter && phoneMedia.twitter.registered !== undefined && phoneMedia.twitter.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={TwitterIcon} style={socialStyles.accountIconStyle} />Twitter</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered == false
                                                                    ? <View  >
                                                                        {phoneMedia.yahoo && phoneMedia.yahoo.registered !== undefined && phoneMedia.yahoo.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={YahooIcon} style={socialStyles.accountIconStyle} />Yahoo</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== false && phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered !== null
                                                                    ? <View   >
                                                                        {phoneMedia.snapchat && phoneMedia.snapchat.registered !== undefined && phoneMedia.snapchat.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={SnapchatIcon} style={socialStyles.accountIconStyle} />Snapchat</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered == false
                                                                    ? <View   >
                                                                        {phoneMedia.zalo && phoneMedia.zalo.registered !== undefined && phoneMedia.zalo.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={ZaloIcon} style={socialStyles.accountIconStyle} />Zalo</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered == false
                                                                    ? <View   >
                                                                        {phoneMedia.whatsapp && phoneMedia.whatsapp.registered !== undefined && phoneMedia.whatsapp.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={WhatsaapIcon} style={socialStyles.accountIconStyle} />Whatsapp</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered == false && phoneMedia.viber
                                                                    ? <View   >
                                                                        {phoneMedia.viber && phoneMedia.viber.registered !== undefined && phoneMedia.viber.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={ViberIcon} style={socialStyles.accountIconStyle} />Viber</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered == false
                                                                    ? <View   >
                                                                        {phoneMedia.telegram && phoneMedia.telegram.registered !== undefined && phoneMedia.telegram.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={TelegramIcon} style={socialStyles.accountIconStyle} />Telegram</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered == false
                                                                    ? <View>
                                                                        {phoneMedia.ok && phoneMedia.ok.registered !== undefined && phoneMedia.ok.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={OkIcon} style={socialStyles.accountIconStyle} />Ok</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered == false
                                                                    ? <View   >
                                                                        {phoneMedia.line && phoneMedia.line.registered !== undefined && phoneMedia.line.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={LineIcon} style={socialStyles.accountIconStyle} />Line</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered == false
                                                                    ? <View    >
                                                                        {phoneMedia.jdid && phoneMedia.jdid.registered !== undefined && phoneMedia.jdid.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={jdid} style={socialStyles.accountIconStyle} />Jdid</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={socialStyles.emailInformation}>
                                                <View>
                                                    <View>
                                                        <Text style={socialStyles.socialHeadingId}>Email Information</Text>
                                                    </View>
                                                    <View >
                                                        <View >
                                                            <Text style={socialStyles.emailClass}>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                ? singleCust.data.data.email
                                                                : null}</Text>
                                                        </View>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneResultText}> <Text style={socialStyles.phoneClass1} >{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                ? singleCust.data.data.score
                                                                : null}.00</Text><Text style={socialStyles.phoneClass2}>/100</Text></Text>
                                                            <Text style={socialStyles}>Result</Text>
                                                        </View>
                                                        <Text style={socialStyles.emailLink}>
                                                            <Link src={`https://www.google.com/search?q=${singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                ? singleCust.data.data.email
                                                                : "#"}`}><Text style={socialStyles.emailLink}>Search on Google</Text></Link>
                                                        </Text>
                                                        <View style={socialStyles.phoneDataBox}>
                                                            <Text style={socialStyles.phoneDataTitle}>Delivery</Text>
                                                            <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data && singleCust.data.data && singleCust.data.data.deliverable !== undefined
                                                                ? singleCust.data.data.deliverable == true
                                                                    ? "Yes"
                                                                    : "No"
                                                                : null}</Text>
                                                        </View>
                                                        <View >
                                                            <Text style={socialStyles.registeredHeading}>Data breaches</Text>
                                                            <View style={socialStyles.phoneDataBox}>
                                                                <Text style={socialStyles.phoneDataTitle}>Data breaches</Text>
                                                                <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                    ? singleCust.data.data.breach_details.number_of_breaches !== 0
                                                                        ? singleCust.data.data.breach_details.number_of_breaches
                                                                        : "No Data"
                                                                    : null}</Text>
                                                            </View>
                                                            <View style={socialStyles.phoneDataBox}>
                                                                <Text style={socialStyles.phoneDataTitle}>First breach</Text>
                                                                <Text style={socialStyles.phoneDataText}>{singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                    ? singleCust.data.data.breach_details.first_breach
                                                                    : null}</Text>
                                                            </View>
                                                            <View>
                                                                {singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                    ? singleCust.data.data.breach_details.breaches !== null
                                                                        ? singleCust && singleCust.data && singleCust.data && singleCust.data.data !== undefined
                                                                            ? singleCust.data.data.breach_details.breaches.map((breach) => {
                                                                                return (
                                                                                    <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>{breach.name}</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{breach.date}</Text>
                                                                                    </View>
                                                                                )
                                                                            })
                                                                            : null
                                                                        : null
                                                                    : null}
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View >
                                                        <View >
                                                            <View>
                                                                <Text style={socialStyles.registeredHeading}>Registered Online Profiles</Text>
                                                            </View>
                                                            {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null && socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== false
                                                                ? <View>
                                                                    {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== false && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null
                                                                        ? <View>
                                                                            <Text style={socialStyles.textWithIcon}><Image src={LinkedinIcon} style={socialStyles.accountIconStyle2} />Linkedin</Text>
                                                                            {socialMedia.linkedin && socialMedia.linkedin.photo !== null && socialMedia.linkedin.photo !== undefined
                                                                                ? <View>
                                                                                    <Image src={socialMedia.linkedin.photo} style={styles.googleLogoIcon} />
                                                                                </View>
                                                                                : null}
                                                                            <View style={socialStyles.phoneDataBox}>
                                                                                <Text style={socialStyles.phoneDataTitle}>Profile Link</Text>
                                                                                <View style={socialStyles.phoneDataText}>
                                                                                    {socialMedia.linkedin.url !== null
                                                                                        ? <View>
                                                                                            <Link href={socialMedia && socialMedia.linkedin && socialMedia.linkedin.url !== undefined && socialMedia && socialMedia.linkedin && socialMedia.linkedin.url !== null
                                                                                                ? socialMedia.linkedin.url
                                                                                                : "#"}>
                                                                                                <Text style={socialStyles.phoneDataText}>View Profile</Text>
                                                                                            </Link>
                                                                                        </View>
                                                                                        : null}</View>
                                                                            </View>
                                                                        </View>
                                                                        : null}
                                                                    {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered !== null
                                                                        ? <View>
                                                                            <View>
                                                                                {socialMedia.linkedin && socialMedia.linkedin.name !== null
                                                                                    ? <><View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Name</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.linkedin && socialMedia.linkedin.name !== undefined
                                                                                            ? socialMedia.linkedin.name
                                                                                            : null}</Text>
                                                                                    </View><View style={socialStyles.phoneDataBox}>
                                                                                            <Text style={socialStyles.phoneDataTitle}>Location</Text><Text style={socialStyles.phoneDataText}>{socialMedia.linkedin && socialMedia.linkedin.location !== undefined
                                                                                                ? socialMedia.linkedin.location
                                                                                                : null}</Text>
                                                                                        </View> </>
                                                                                    : null}
                                                                            </View>
                                                                            {socialMedia.linkedin && socialMedia.linkedin.title && socialMedia.linkedin && socialMedia.linkedin.name && socialMedia.linkedin && socialMedia.linkedin.connection_count !== null
                                                                                ? <View >
                                                                                    <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Title</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.linkedin && socialMedia.linkedin.title !== undefined
                                                                                            ? socialMedia.linkedin.title
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    {socialMedia.linkedin && socialMedia.linkedin.company !== null
                                                                                        ? <><View style={socialStyles.phoneDataBox}>
                                                                                            <Text style={socialStyles.phoneDataTitle}>Company</Text><Text style={socialStyles.phoneDataText}>{socialMedia.linkedin && socialMedia.linkedin.company !== undefined
                                                                                                ? socialMedia.linkedin.company
                                                                                                : null}</Text></View></>
                                                                                        : null}
                                                                                    <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Connection Count</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.linkedin && socialMedia.linkedin.connection_count !== undefined
                                                                                            ? socialMedia.linkedin.connection_count
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                </View>
                                                                                : null}</View>
                                                                        : null}</View>
                                                                : null}
                                                            {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== null && socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== false
                                                                ? <>
                                                                    <View>
                                                                        <View>
                                                                            {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== null && socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered !== false
                                                                                ? <Text style={socialStyles.textWithIcon}><Image src={SkypeIcon} style={socialStyles.accountIconStyle2} />Skype</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    <View>
                                                                        {socialMedia.skype && socialMedia.skype !== undefined && socialMedia.skype.photo !== null
                                                                            ? <View >
                                                                                <View >
                                                                                    <Image source={NoImage} style={styles.googleLogoIcon} />
                                                                                </View>
                                                                            </View>
                                                                            : null}
                                                                        <View >
                                                                            {socialMedia.skype && socialMedia.skype !== undefined
                                                                                ? socialMedia.skype && socialMedia.skype.name !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Name:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.skype && socialMedia.skype !== undefined
                                                                                            ? socialMedia.skype && socialMedia.skype.name
                                                                                            : null}</Text></View>
                                                                                    : null
                                                                                : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined
                                                                                ? socialMedia.skype && socialMedia.skype.id !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Skype ID:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.skype && socialMedia.skype !== undefined
                                                                                            ? socialMedia.skype && socialMedia.skype.id
                                                                                            : null}</Text></View>
                                                                                    : null
                                                                                : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined
                                                                                ? socialMedia.skype && socialMedia.skype.gender !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Gender:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.skype && socialMedia.skype !== undefined
                                                                                            ? socialMedia.skype && socialMedia.skype.gender == 2
                                                                                                ? "Female"
                                                                                                : "Male"
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    : null
                                                                                : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined
                                                                                ? socialMedia.skype && socialMedia.skype.age !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Age:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.skype && socialMedia.skype !== undefined
                                                                                            ? socialMedia.skype && socialMedia.skype.age
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    : null
                                                                                : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined
                                                                                ? socialMedia.skype && socialMedia.skype.language !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Language:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.skype && socialMedia.skype !== undefined
                                                                                            ? socialMedia.skype && socialMedia.skype.language
                                                                                            : null}</Text>
                                                                                    </View>
                                                                                    : null
                                                                                : null}
                                                                            {socialMedia.skype && socialMedia.skype !== undefined
                                                                                ? socialMedia.skype && socialMedia.skype.handle !== null
                                                                                    ? <View style={socialStyles.phoneDataBox}>
                                                                                        <Text style={socialStyles.phoneDataTitle}>Deals:</Text>
                                                                                        <Text style={socialStyles.phoneDataText}>{socialMedia.skype && socialMedia.skype !== undefined
                                                                                            ? socialMedia.skype && socialMedia.skype.handle
                                                                                            : null}</Text></View>
                                                                                    : null
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                </>
                                                                : null}
                                                            {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== false && socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== null
                                                                ? <>
                                                                    <View>
                                                                        <View>
                                                                            {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered !== false
                                                                                ? <Text style={socialStyles.textWithIcon}><Image src={GoogleIcon} style={socialStyles.accountIconStyle2} />Google</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    <View >
                                                                        {socialMedia.google && socialMedia.google.photo !== null && socialMedia.google.photo !== undefined
                                                                            ? <View >
                                                                                <Image style={styles.googleLogoIcon} src={socialMedia.google.photo} />
                                                                            </View>
                                                                            : null}
                                                                    </View>
                                                                </>
                                                                : null}
                                                            {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false && socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== null
                                                                ? <View>
                                                                    <View>
                                                                        {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false
                                                                            ? <View>
                                                                                <Text style={socialStyles.textWithIcon}><Image src={GravatrIcon} style={socialStyles.accountIconStyle2} />Gravatar</Text>
                                                                                <View style={socialStyles.phoneDataBox}>
                                                                                    <Text style={socialStyles.phoneDataTitle}>Profile Link</Text>
                                                                                    <View style={socialStyles.phoneDataText}>
                                                                                        <Link src={socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false
                                                                                            ? socialMedia.gravatar && socialMedia.gravatar.profile_url
                                                                                            : "#"}>
                                                                                            <Text style={socialStyles.phoneDataText}>View profile</Text>
                                                                                        </Link>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            : null}
                                                                    </View>
                                                                    <View >
                                                                        <View style={socialStyles.phoneDataBox}>
                                                                            <Text style={socialStyles.phoneDataTitle}>Username:</Text>
                                                                            <Text style={socialStyles.phoneDataText}>{socialMedia.gravatar.registered !== false
                                                                                ? socialMedia.gravatar && socialMedia.gravatar.username
                                                                                : null}</Text>
                                                                        </View>
                                                                        {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false
                                                                            ? socialMedia.gravatar && socialMedia.gravatar.name !== null
                                                                                ? <View style={socialStyles.phoneDataBox}>
                                                                                    <Text style={socialStyles.phoneDataTitle}>Name</Text>
                                                                                    <Text style={socialStyles.phoneDataText}>{socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered !== false
                                                                                        ? socialMedia.gravatar && socialMedia.gravatar.name
                                                                                        : null}</Text>
                                                                                </View>
                                                                                : null
                                                                            : null}
                                                                    </View>
                                                                </View>
                                                                : null}
                                                            <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop: "20px", }}>
                                                                {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== false && socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== null
                                                                    ? <>
                                                                        <View>
                                                                            <View >
                                                                                {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered !== false
                                                                                    ? <Text style={socialStyles.multipleAccountsClass}><Image src={AdobeIcon} style={socialStyles.accountIconStyle} />Adobe</Text>
                                                                                    : null}
                                                                            </View>
                                                                        </View>
                                                                    </>
                                                                    : null}
                                                                {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== false && socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={AirbnbIcon} style={socialStyles.accountIconStyle} />Airbnb</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== false && socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={AmazonIcon} style={socialStyles.accountIconStyle} />Amazon</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== false && socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={AppleIcon} style={socialStyles.accountIconStyle} />Apple</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== false && socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Archiveorg</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== false && socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={BookingIcon} style={socialStyles.accountIconStyle} />Booking</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== false && socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered !== false
                                                                                ? <> <Image src={BulkapakIcon} style={socialStyles.accountIconStyle} />Bukalapak</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== false && socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered !== false
                                                                                ? <><Image src={DiscordIcon} style={socialStyles.accountIconStyle} />Discord</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false && socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered !== false
                                                                                ? <><Image src={DisneyIcon} style={socialStyles.accountIconStyle} />Disneyplus</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered !== false
                                                                                ? <><Image src={EbayIcon} style={socialStyles.accountIconStyle} />Ebay</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== false && socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered !== false
                                                                                ? <><Image src={EnvatoIcon} style={socialStyles.accountIconStyle} />Envato</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered !== false
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered !== false
                                                                                ? <><Image src={EvernoteIcon} style={socialStyles.accountIconStyle} />Evernote</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== false && socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={facebookIcon} style={socialStyles.accountIconStyle} />Facebook</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== false && socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered !== false
                                                                                ? <><Image src={FlickrIcon} style={socialStyles.accountIconStyle} />Flickr</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== false && socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={FlipcartIcon} style={socialStyles.accountIconStyle} />Flipkart</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered !== false
                                                                                ? <><Image src={FoursqureIcon} style={socialStyles.accountIconStyle} />Foursquare</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== false && socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={GithubIcon} style={socialStyles.accountIconStyle} />Github</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={instaIcon} style={socialStyles.accountIconStyle} />Instagram</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== false && socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered !== false
                                                                                ? <><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Kakao</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== false && socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered !== false
                                                                                ? <><Image src={LastfmIcon} style={socialStyles.accountIconStyle} />Lastfm</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== false && socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered !== false
                                                                                ? <><Image src={LazadaIcon} style={socialStyles.accountIconStyle} />Lazada</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered !== false && socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={MicrosoftIcon} style={socialStyles.accountIconStyle} />Microsoft</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== false && socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered !== false
                                                                                ? <><Image src={MyspaceIcon} style={socialStyles.accountIconStyle} />Myspace</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== false && socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={Netflixicon} style={socialStyles.accountIconStyle} />Netflix</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.pinterest.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.pinterest.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.pinterest.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Pinterest</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== false && socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered !== false
                                                                                ? <><Image src={QuoraIcon} style={socialStyles.accountIconStyle} />Quora</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== false && socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered !== false
                                                                                ? <><Image src={QzoneIcon} style={socialStyles.accountIconStyle} />Qzone</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== false && socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered !== false
                                                                                ? <><Image src={SamsungIcon} style={socialStyles.accountIconStyle} />Samsung</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== false && socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered !== false
                                                                                ? <><Image src={SpotifyIcon} style={socialStyles.accountIconStyle} />Spotify</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== false && socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered !== false
                                                                                ? <><Image src={TokopediaIcon} style={socialStyles.accountIconStyle} />Tokopedia</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== false && socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={TwitterIcon} style={socialStyles.accountIconStyle} />Twitter</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== false && socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={WordpressIcon} style={socialStyles.accountIconStyle} />Wordpress</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== false && socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== null
                                                                    ? <View>
                                                                        <View>
                                                                            {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered !== false
                                                                                ? <Text style={socialStyles.multipleAccountsClass}><Image src={YahooIcon} style={socialStyles.accountIconStyle} />Yahoo</Text>
                                                                                : null}
                                                                        </View>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== false && socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass} >
                                                                            {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered !== false
                                                                                ? <><Image src={ZohoIcon} style={socialStyles.accountIconStyle} />Zoho</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== false && socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== null
                                                                    ? <View>
                                                                        <Text style={socialStyles.multipleAccountsClass}>
                                                                            {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered !== false
                                                                                ? <><Image src={VimeoIcon} style={socialStyles.accountIconStyle} />Vimeo</>
                                                                                : null}
                                                                        </Text>
                                                                    </View>
                                                                    : null}
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <View>
                                                                <View>
                                                                    <Text style={socialStyles.registeredHeading}>Not registered Online Profiles</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ display: 'flex', flexWrap: "wrap", flexDirection: 'row' }}>
                                                                {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered == false
                                                                    ? <View>
                                                                        {socialMedia.adobe && socialMedia.adobe.registered !== undefined && socialMedia.adobe.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={AdobeIcon} style={socialStyles.accountIconStyle} />Adobe</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered == false
                                                                    ? <View>
                                                                        {socialMedia.airbnb && socialMedia.airbnb.registered !== undefined && socialMedia.airbnb.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={AirbnbIcon} style={socialStyles.accountIconStyle} />Airbnb</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered == false
                                                                    ? <View>
                                                                        {socialMedia.amazon && socialMedia.amazon.registered !== undefined && socialMedia.amazon.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={AmazonIcon} style={socialStyles.accountIconStyle} />Amazon</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered == false
                                                                    ? <View>
                                                                        {socialMedia.apple && socialMedia.apple.registered !== undefined && socialMedia.apple.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={AppleIcon} style={socialStyles.accountIconStyle} />Apple</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered == false
                                                                    ? <View>
                                                                        {socialMedia.archiveorg && socialMedia.archiveorg.registered !== undefined && socialMedia.archiveorg.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Archiveorg</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.atlassian && socialMedia.atlassian.registered !== undefined && socialMedia.atlassian.registered == false
                                                                    ? <View>
                                                                        {socialMedia.atlassian && socialMedia.atlassian.registered !== undefined && socialMedia.atlassian.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={AtlassianIcon} style={socialStyles.accountIconStyle} />Atlassian</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered == false
                                                                    ? <View>
                                                                        {socialMedia.booking && socialMedia.booking.registered !== undefined && socialMedia.booking.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={BookingIcon} style={socialStyles.accountIconStyle} />Booking</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered == false
                                                                    ? <View>
                                                                        {socialMedia.bukalapak && socialMedia.bukalapak.registered !== undefined && socialMedia.bukalapak.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={BulkapakIcon} style={socialStyles.accountIconStyle} />Bukalapak</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered == false
                                                                    ? <View>
                                                                        {socialMedia.discord && socialMedia.discord.registered !== undefined && socialMedia.discord.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={DiscordIcon} style={socialStyles.accountIconStyle} />Discord</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered == false
                                                                    ? <View>
                                                                        {socialMedia.disneyplus && socialMedia.disneyplus.registered !== undefined && socialMedia.disneyplus.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={DisneyIcon} style={socialStyles.accountIconStyle} />Disneyplus</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.ebay.registered == false
                                                                    ? <View>
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.ebay.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={EbayIcon} style={socialStyles.accountIconStyle} />Ebay</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.envato && socialMedia.envato.registered !== undefined && socialMedia.envato.registered == false
                                                                    ? <View>
                                                                        {socialMedia.ebay && socialMedia.ebay.registered !== undefined && socialMedia.envato.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={EnvatoIcon} style={socialStyles.accountIconStyle} />Envato</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered == false
                                                                    ? <View>
                                                                        {socialMedia.evernote && socialMedia.evernote.registered !== undefined && socialMedia.evernote.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={EvernoteIcon} style={socialStyles.accountIconStyle} />Evernote</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered == false
                                                                    ? <View>
                                                                        {socialMedia.facebook && socialMedia.facebook.registered !== undefined && socialMedia.facebook.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={facebookIcon} style={socialStyles.accountIconStyle} />Facebook</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered == false
                                                                    ? <View>
                                                                        {socialMedia.flickr && socialMedia.flickr.registered !== undefined && socialMedia.flickr.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={FlickrIcon} style={socialStyles.accountIconStyle} />Flickr</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered == false
                                                                    ? <View  >
                                                                        {socialMedia.flipkart && socialMedia.flipkart.registered !== undefined && socialMedia.flipkart.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={FlipcartIcon} style={socialStyles.accountIconStyle} />Flipkart</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.foursquare && socialMedia.foursquare.registered !== undefined && socialMedia.foursquare.registered == false
                                                                    ? <View  >
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.foursquare.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={FoursqureIcon} style={socialStyles.accountIconStyle} />Foursquare</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered == false
                                                                    ? <View>
                                                                        {socialMedia.github && socialMedia.github.registered !== undefined && socialMedia.github.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={GithubIcon} style={socialStyles.accountIconStyle} />Github</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered == false
                                                                    ? <View>
                                                                        {socialMedia.google && socialMedia.google.registered !== undefined && socialMedia.google.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={GoogleIcon} style={socialStyles.accountIconStyle} />Google</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered == false
                                                                    ? <View>
                                                                        {socialMedia.gravatar && socialMedia.gravatar.registered !== undefined && socialMedia.gravatar.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={GravatrIcon} style={socialStyles.accountIconStyle} />Gravatar</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered == false
                                                                    ? <View>
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.instagram.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={instaIcon} style={socialStyles.accountIconStyle} />Instagram</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered == false
                                                                    ? <View>
                                                                        {socialMedia.kakao && socialMedia.kakao.registered !== undefined && socialMedia.kakao.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={ArchiveIcon} style={socialStyles.accountIconStyle} />Kakao</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered == false
                                                                    ? <View>
                                                                        {socialMedia.lastfm && socialMedia.lastfm.registered !== undefined && socialMedia.lastfm.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={LastfmIcon} style={socialStyles.accountIconStyle} />Lastfm</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered == false
                                                                    ? <View>
                                                                        {socialMedia.lazada && socialMedia.lazada.registered !== undefined && socialMedia.lazada.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={LazadaIcon} style={socialStyles.accountIconStyle} />Lazada</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered == false
                                                                    ?
                                                                    <View>
                                                                        {socialMedia.linkedin && socialMedia.linkedin.registered !== undefined && socialMedia.linkedin.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={LinkedinIcon} style={socialStyles.accountIconStyle} />Linkedin</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered == false
                                                                    ? <View>
                                                                        {socialMedia.mailru && socialMedia.mailru.registered !== undefined && socialMedia.mailru.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={MailruIcon} style={socialStyles.accountIconStyle} />Mailru</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered == false
                                                                    ? <View>
                                                                        {socialMedia.microsoft && socialMedia.microsoft.registered !== undefined && socialMedia.microsoft.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={MicrosoftIcon} style={socialStyles.accountIconStyle} />Microsoft</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered == false
                                                                    ? <View>
                                                                        {socialMedia.myspace && socialMedia.myspace.registered !== undefined && socialMedia.myspace.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={MyspaceIcon} style={socialStyles.accountIconStyle} />Myspace</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered == false
                                                                    ? <View>
                                                                        {socialMedia.netflix && socialMedia.netflix.registered !== undefined && socialMedia.netflix.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={Netflixicon} style={socialStyles.accountIconStyle} />Netflix</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered == false
                                                                    ? <View  >
                                                                        {socialMedia.quora && socialMedia.quora.registered !== undefined && socialMedia.quora.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={QuoraIcon} style={socialStyles.accountIconStyle} />Quora</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered == false
                                                                    ? <View>
                                                                        {socialMedia.qzone && socialMedia.qzone.registered !== undefined && socialMedia.qzone.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={QzoneIcon} style={socialStyles.accountIconStyle} />Qzone</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered == false
                                                                    ? <View>
                                                                        {socialMedia.samsung && socialMedia.samsung.registered !== undefined && socialMedia.samsung.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={SamsungIcon} style={socialStyles.accountIconStyle} />Samsung</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered == null
                                                                    ? <View>
                                                                        {socialMedia.skype && socialMedia.skype.registered !== undefined && socialMedia.skype.registered == null
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={SkypeIcon} style={socialStyles.accountIconStyle} />Skype</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered == false
                                                                    ? <View>
                                                                        {socialMedia.spotify && socialMedia.spotify.registered !== undefined && socialMedia.spotify.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={SpotifyIcon} style={socialStyles.accountIconStyle} />Spotify</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered == false
                                                                    ? <View>
                                                                        {socialMedia.tokopedia && socialMedia.tokopedia.registered !== undefined && socialMedia.tokopedia.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={TokopediaIcon} style={socialStyles.accountIconStyle} />Tokopedia</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered == false
                                                                    ? <View>
                                                                        {socialMedia.twitter && socialMedia.twitter.registered !== undefined && socialMedia.twitter.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={TwitterIcon} style={socialStyles.accountIconStyle} />Twitter</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered == false
                                                                    ? <View>
                                                                        {socialMedia.wordpress && socialMedia.wordpress.registered !== undefined && socialMedia.wordpress.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={WordpressIcon} style={socialStyles.accountIconStyle} />Wordpress</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered == false
                                                                    ? <View>
                                                                        {socialMedia.yahoo && socialMedia.yahoo.registered !== undefined && socialMedia.yahoo.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={YahooIcon} style={socialStyles.accountIconStyle} />Yahoo</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered == false
                                                                    ? <View>
                                                                        {socialMedia.zoho && socialMedia.zoho.registered !== undefined && socialMedia.zoho.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={ZohoIcon} style={socialStyles.accountIconStyle} />Zoho</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                                {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered == false
                                                                    ? <View>
                                                                        {socialMedia.vimeo && socialMedia.vimeo.registered !== undefined && socialMedia.vimeo.registered == false
                                                                            ? <Text style={socialStyles.multipleAccountsClass}><Image src={VimeoIcon} style={socialStyles.accountIconStyle} />Vimeo</Text>
                                                                            : null}
                                                                    </View>
                                                                    : null}
                                                            </View>
                                                            <View >
                                                                <View>
                                                                    <Text style={socialStyles.registeredHeading}>About Domain</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Domain</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.free == true
                                                                        ? "Free"
                                                                        : DomainData.disposable == true
                                                                            ? "Disposable"
                                                                            : DomainData.custom == true
                                                                                ? "Custom"
                                                                                : null}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Registered</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.registered == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Professional</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.domain}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Free</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.free == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Date Created</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.created}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Update Date</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.updated}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Expiry Date</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.expires}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Registrar Name</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.registrar_name}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Registered to</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.registered_to}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>DMARC Enforced</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.dmarc_enforced == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Strict SPF</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.spf_strict == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>MX Fit</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.valid_mx == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Accept All</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.accept_all == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBox}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Suspicious TLD</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.suspicious_tld == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                                <View style={socialStyles.phoneDataBoxlast}>
                                                                    <Text style={socialStyles.phoneDataTitle}>Website exists</Text>
                                                                    <Text style={socialStyles.phoneDataText}>{DomainData.website_exists == true
                                                                        ? "Yes"
                                                                        : "No"}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                : <Text style={styles.requestDataViewMain}>No data available</Text>}
                        </View>
                    </View>
                </View>
            </Page>
        </Document >
    );
}
