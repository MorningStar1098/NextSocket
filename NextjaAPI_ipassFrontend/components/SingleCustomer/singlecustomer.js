/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { MdModeEdit } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { GrFormClose } from 'react-icons/gr'
import { LIVE_URL } from '../../Hooks/envConst'
import { toast } from 'react-toastify';
import WatchlistData from '../WatchlistData/watchlistdata'
import axios from 'axios';
import LoadingIcons from 'react-loading-icons'
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsFilePdf, BsUpload } from 'react-icons/bs'
import ProgressiveImage from "react-progressive-graceful-image";
import Reject from '../../public/images/reject.png'
import Warning from '../../public/images/warning.png'
import Success from '../../public/images/success.png'
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfComponentData, GetDataComp } from '../PdfComponent/PdfComponentData'
import OcrData from '../OcrData/ocrdata'
import Cookies from 'js-cookie';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DetailAuthenticate from '../DetailAuthenticate/DetailAuthenticate'
function SingleCustomer(props) {
  const dataref = useRef(null);
  const coppyToast = () => toast.success("copied to clipboard")
  const [tabsData, setTabsData] = useState(true)
  const [loading, setLoading] = useState(true)
  const [commentButtons, setCommntButtons] = useState(false)
  const [singlecustomer, setSingleCustomer] = useState([])
  const [frntImg, setFrntImg] = useState('')
  const [backImg, setBackImg] = useState('')
  const [faceImg, setFaceImg] = useState('')
  const [frnt, setFrnt] = useState(true)
  const [back, setBack] = useState(false)
  const [liveness1, setLivness1] = useState('')
  const [liveness2, setLivness2] = useState('')
  const [liveness3, setLivness3] = useState('')
  const [liveness4, setLivness4] = useState('')
  const [liveness5, setLivness5] = useState('')
  const [liveness6, setLivness6] = useState('')
  const [livCondition, setLivCondition] = useState(0)
  const [getOcrData, setGetOcrData] = useState([])
  const [validaData, setValidaData] = useState([]);
  const [frntBackImg, setFrntBackImg] = useState([])
  const { customId, setRequest, setSingleCust } = props;
  const base64Email = Cookies.get('email');
  const email = base64Email && atob(base64Email);
  const [validaLoading, setValidaLoading] = useState(false)

  useEffect(() => {
    handlePubPriv();
  }, []);

  const ref = React.createRef();
  let key
  let doctype
  {
    singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.extraction !== undefined ? singlecustomer.capabilities.extraction.map((data) => {
      doctype = data
    }) : null
  }

  const props1 = {
    width: 400,
    height: 250,
    zoomWidth: 500,
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
  };
  //const props2 = { width: 400, height: 250, zoomWidth: 500, img: frnt
  //? `data:image/png;base64,${frntImg}` : back
  //? `data:image/png;base64,${backImg}` : `data:image/png;base64,${frntImg}` };

  if (singlecustomer && singlecustomer.workflow && singlecustomer.workflow.definitionKey !== undefined) {
    key = singlecustomer.workflow.definitionKey
  }

  const rawrequest = {
    "customerInternalReference": "1",
    "workflowDefinition": {
      "key": `${key}`,

      "capabilities": {
        "watchlistScreening": {
          "additionalProperties": "string"
        }
      }
    },
    "callbackUrl": "https://www.google.com",
    "userReference": "YOUR_USER_REFERENCE",
    "tokenLifetime": "5m",
    "web": {

      "successUrl": "https://ipassreact.csdevhub.com/success",
      "errorUrl": "https://ipassreact.csdevhub.com/error",
      "locale": "en"
    }
  }

  const notverified = <GrFormClose />

  function handlePubPriv() {
    axios.get(`${LIVE_URL}/api/v1/ipass/get/pubpriv/${customId}`, {
    }).then((response) => {
      const keys = response && response.data && response.data.data && response.data.data.pubprivkey !== undefined
        ? response.data.data.pubprivkey
        : null
      setTimeout(() => {
        handleDecesion(keys)
      }, 1000)
    })
  }

  function handleDecesion(keys) {
    const body = {
      "tokpubpriv": keys
    }
    axios.post(`${LIVE_URL}/api/v1/ipass/${customId}`, body, {})
      .then((response) => {
        const imagesForValida = [];
        // setTimeout(() => {
          const resp = response && response.data && response.data.data !== undefined ? response.data.data : null
          const iamgesresp = response?.data?.allData
          setFrntBackImg(iamgesresp)
          setSingleCustomer(resp)
          {
            response.data.allData.map((faceimg) => {
              // console.log("fff",faceimg)
              if (singlecustomer?.workflow?.definitionKey !== "10015") {
                if (faceimg.type == "FACE") {
                  setFaceImg(faceimg.image)
                }
              }
              if (faceimg.type == "FRONT") {
                setFrntImg(faceimg.image)
                // imagesForValida.push(`FRONT~${faceimg.image}`);
                imagesForValida.push(faceimg)
              }
              if (faceimg.type == 'BACK') {
                setBackImg(faceimg.image)
                // imagesForValida.push(`BACK~${faceimg.image}`);
                imagesForValida.push(faceimg)
              }

              if (singlecustomer?.workflow?.definitionKey !== "10015") {
                if (faceimg.type == "LIVENESS_1") {
                  setLivness1(faceimg.image)
                }
                if (faceimg.type == "LIVENESS_2") {
                  setLivness2(faceimg.image)
                }
                if (faceimg.type == "LIVENESS_3") {
                  setLivness3(faceimg.image)
                }
                if (faceimg.type == "LIVENESS_4") {
                  setLivness4(faceimg.image)
                }
                if (faceimg.type == "LIVENESS_5") {
                  setLivness5(faceimg.image)
                }
                if (faceimg.type == "LIVENESS_6") {
                  setLivness6(faceimg.image)
                }
              }
            })
          }
        // }, 1000)
        setTimeout(() => {
          handleValida(imagesForValida);
        }, 1000) 

      })
  }
  const tokenErrtoast = () => toast.error("The provided token has expired");

  function handleValida(data) {
    // data.forEach(element => {
      setValidaLoading(true)
    const body = {
      "image": data,
      "email": email,
      "applicationId": customId,
    }
    axios.post(`${LIVE_URL}/api/v1/ipass/detail/validity`, body, {})
      .then((response) => {

        const validaData = response?.data
        // console.log("dd",validaData);
        if(validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[0] !== undefined&&validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[1] !== undefined){
        if(validaData?.detailvalidaAppId[0]?.detail=="The provided token has expired"){
          tokenErrtoast()
        }else if(validaData?.detailvalidaAppId[1]?.detail=="The provided token has expired"){
          tokenErrtoast()
        }
      }
        setValidaData(validaData)
        // setLoading(false)
        setValidaLoading(false)
      });
  }

  function testOcrFunc(getDataOcr) {
    setGetOcrData(getDataOcr)
  }

  const isrPass = getOcrData?.document?.text?.split(/\r?\n/)
  const download = <BsUpload />
  const backIcon = <BiArrowBack />

  const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');

  };

  function handleCoppy(customId) {
    copyToClipboard(customId);
    coppyToast()
  }

  function handleBack() {
    setRequest(true)
    setSingleCust(false)
  }

  function handleRawData() {
    setTabsData(false)
  }

  function handleMainData() {
    setTabsData(true)
  }

  function handleEnter() {
    setCommntButtons(true)
  }

  function handleHideBtns() {
    setCommntButtons(false)
  }

  function handleFrntImg() {
    setFrnt(true)
    setBack(false)
  }

  function handleBackImg() {
    setBack(true)
    setFrnt(false)
  }

  function handleSelfie() {
    setLivCondition(0)
  }

  function handleliv1() {
    setLivCondition(1)
  }

  function handleliv2() {
    setLivCondition(2)
  }

  function handleliv3() {
    setLivCondition(3)
  }

  function handleliv4() {
    setLivCondition(4)
  }

  function handleliv5() {
    setLivCondition(5)
  }

  function handleliv6() {
    setLivCondition(6)
  }

  async function handleRequest() {
    const json = JSON.stringify(rawrequest);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "download" + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function handleResponse() {
    const json = JSON.stringify(singlecustomer);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "download" + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const downloadimg = e => {
    fetch(e.target.href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", 'image'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const downloadfrnt = e => {
    fetch(e.target.href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", 'image'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const downloadback = e => {
    fetch(e.target.href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", 'image'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const CheckForImgType = (imgString) => {
    //takes base 64 image string without header and
    //returns base 64 image string with proper header
    //first check for png
    if (imgString == "") {
      return "";
    }
    const subImgStringPng = imgString.substring(0, 10);
    const subImgStringJpeg = imgString.substring(0, 3);
    if (subImgStringPng == "iVBORw0KGg") {
      return `data:image/png;base64,${imgString}`;
    } else if (subImgStringJpeg == "/9j") {
      return `data:image/jpg;base64,${imgString}`
    } else {
      return `data:image/jpg;base64,${imgString}`;
    }
  }

  const coppyIcon = <MdOutlineContentCopy className='coppy-text-icon' />
  const retrivedate = singlecustomer && singlecustomer.startedAt !== undefined
    ? singlecustomer.startedAt.slice(0, 10)
    : null
  // let reversedate = retrivedate!==undefined?retrivedate.split("-").reverse().join("-"):null;
  const time = singlecustomer && singlecustomer.startedAt !== undefined
    ? singlecustomer.startedAt.slice(11, 16)
    : null;
  const verifdate = singlecustomer && singlecustomer.completedAt !== undefined
    ? singlecustomer.completedAt.slice(0, 10)
    : null
  const veriftime = singlecustomer && singlecustomer.completedAt !== undefined
    ? singlecustomer.completedAt.slice(11, 16)
    : null;

  const fullFrntImg = CheckForImgType(frntImg);
  const fullBackImg = CheckForImgType(backImg);
  const fullFaceImg = CheckForImgType(faceImg);
  GetDataComp(singlecustomer, retrivedate, time, verifdate, veriftime, fullFrntImg, fullBackImg, fullFaceImg, validaData);

  return (
    <div ref={ref} className='user-detailpage-main' >
      <header className='header-2'>
        <div className='header-leftsection-main'>
          <div className='detailpage-idsstatus-main'>
            <div className='detailpage-backarrow'>
              <span onClick={handleBack}>{backIcon}</span>
            </div>
            <div ref={dataref} className='ids-section'>
              <dl>
                <dt>Application ID</dt>
                <div className='applicat-icon'>
                  <dd >{customId}</dd>
                  <button onClick={() => handleCoppy(customId)}>{coppyIcon}</button>
                </div>
              </dl>
              <dl>
                <dt>Retrieve Date</dt>
                <dd>{retrivedate}{' '}<span className='retrive-time'>{time}</span></dd>
              </dl>
              <dl>
                <dt>Verification Date</dt>
                <dd>{verifdate}{' '}<span className='verification-time'>{veriftime}</span></dd>
              </dl>
            </div>
            <div
              ref={dataref}
              className={singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
                ? singlecustomer.decision.details.label == "WARNING"
                  ? 'detailpage-user-status'
                  : singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
                    ? singlecustomer && singlecustomer.decision && singlecustomer.decision.details.label == "PASSED"
                      ? 'detailpage-user-status-passed'
                      : 'detailpage-user-status-warning'
                    : null
                : null}
            >
              <button>
                <span>
                  {singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
                    ? singlecustomer && singlecustomer.decision && singlecustomer.decision.details.label
                    : null}
                </span>
              </button>
            </div>
          </div>
          <div class="pdf_button_div">
            <PDFDownloadLink document={<PdfComponentData />} fileName="Data.pdf">
              {({ loading }) =>
                loading ? '...' : <div><button type="button">
                  <BsFilePdf />
                </button>
                  <div class="pdf-export">Export to PDF</div></div>
              }
            </PDFDownloadLink>
            <div class="pdf-export">Export to PDF</div>
          </div>
          <div className={singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
            ? singlecustomer.decision.details.label == "WARNING"
              ? "user-img-rejected"
              : singlecustomer.decision.details.label == "PASSED"
                ? "user-img-rejected"
                : 'user-img-rejected'
            : null}>
            {singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
              ? singlecustomer.decision.details.label == "WARNING"
                ? <img src={Warning.src} />
                : singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
                  ? singlecustomer.decision.details.label == "REJECTED"
                    ? <img src={Reject.src} />
                    : singlecustomer && singlecustomer.decision && singlecustomer.decision.details !== undefined
                      ? singlecustomer.decision.details.label == "PASSED"
                        ? <img src={Success.src} />
                        : null
                      : null
                  : null
              : null}
          </div>
        </div>
      </header>
      <div className='maintab-rawdata-main'>
        <div className={'maintab-rawdata-inner'}>
          <button
            className={tabsData ? "main-dtata-tab active" : 'main-data-tab'}
            onClick={handleMainData}
          >
            Main Data
          </button>
          <button className={!tabsData ? "raw-data active" : "raw-data"} onClick={handleRawData}>
            Raw
          </button>
        </div>
      </div>
      {tabsData
        ? <div className='maindata-section-main'>
          <div className='maindata-leftimages-section'>
            <div className='images-section-inner'>
              {singlecustomer && singlecustomer.workflow && singlecustomer.workflow.definitionKey !== undefined
                ? singlecustomer.workflow.definitionKey !== "10015"
                  ? <>
                    <div className='faceand-videos-section'>
                      <h4>Face photos and videos</h4>
                      <a
                        href={`data:image/png;base64,${faceImg}`}
                        download
                        onClick={e => downloadimg(e)}
                      >
                        {download}
                      </a>
                    </div>
                    <div className='face-image-section'>
                      <div className='face-large-image'>
                        <TransformWrapper>
                          <TransformComponent>
                            {livCondition == 0
                              ? <ProgressiveImage
                                src={`data:image/png;base64,${livCondition == 0
                                  ? faceImg
                                  : livCondition == 1
                                    ? liveness1
                                    : livCondition == 2
                                      ? liveness2
                                      : livCondition == 3
                                        ? liveness3
                                        : livCondition == 4
                                          ? liveness4
                                          : livCondition == 5
                                            ? liveness5
                                            : livCondition == 6
                                              ? liveness6
                                              : faceImg}`}
                                placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                              >
                                {faceImg => <img
                                  className='img1-hover'
                                  src={livCondition == 0
                                    ? faceImg
                                    : livCondition == 1
                                      ? liveness1
                                      : livCondition == 2
                                        ? liveness2
                                        : livCondition == 3
                                          ? liveness3
                                          : livCondition == 4
                                            ? liveness4
                                            : livCondition == 5
                                              ? liveness5
                                              : livCondition == 6
                                                ? liveness6
                                                : faceImg}
                                />}
                              </ProgressiveImage>
                              : <img
                                className='img1-hover'
                                src={`data:image/png;base64,${livCondition == 0
                                  ? faceImg
                                  : livCondition == 1
                                    ? liveness1
                                    : livCondition == 2
                                      ? liveness2
                                      : livCondition == 3
                                        ? liveness3
                                        : livCondition == 4
                                          ? liveness4
                                          : livCondition == 5
                                            ? liveness5
                                            : livCondition == 6
                                              ? liveness6
                                              : faceImg}`}
                              />
                            }
                          </TransformComponent>
                        </TransformWrapper>
                      </div>
                      <div className='lower-images-main lower-small-images'>
                        <div
                          className={livCondition == 0 ? 'selfie-image1 active' : 'frnt-back-img'}
                          onClick={handleSelfie}
                        >
                          <ProgressiveImage
                            src={`data:image/png;base64,${faceImg}`}
                            placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                          >
                            {faceImg => <img src={faceImg} />}
                          </ProgressiveImage>
                          <p className='selfie-text'>selfie</p>
                          <p className='origin-text'>origin</p>
                        </div>
                        {liveness1 !== ''
                          ? <div
                            className={livCondition == 1 ? 'selfie-image1 active' : 'frnt-back-img'}
                            onClick={handleliv1}
                          >
                            <ProgressiveImage
                              src={`data:image/png;base64,${liveness1}`}
                              placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                            >
                              {liveness1 => <img src={liveness1} />}
                            </ProgressiveImage>
                            <p className='liveness-text'>liveness_1</p>
                            <p className='origin-text'>origin</p>
                          </div>
                          : null}
                        {liveness2 !== ''
                          ? <div
                            className={livCondition == 2 ? 'selfie-image1 active' : 'frnt-back-img'}
                            onClick={handleliv2}
                          >
                            <ProgressiveImage
                              src={`data:image/png;base64,${liveness2}`}
                              placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                            >
                              {liveness2 => <img src={liveness2} />}
                            </ProgressiveImage>
                            <p className='liveness-text'>liveness_2</p>
                            <p className='origin-text'>origin</p>
                          </div>
                          : null}
                        {liveness3 !== ''
                          ? <div
                            className={livCondition == 3 ? 'selfie-image1 active' : 'frnt-back-img'}
                            onClick={handleliv3}
                          >
                            <ProgressiveImage
                              src={`data:image/png;base64,${liveness3}`}
                              placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                            >
                              {liveness3 => <img src={liveness3} />}
                            </ProgressiveImage>
                            <p className='liveness-text'>liveness_3</p>
                            <p className='origin-text'>origin</p>
                          </div>
                          : null}
                        {liveness4 !== ''
                          ? <div
                            className={livCondition == 4 ? 'selfie-image1 active' : 'frnt-back-img'}
                            onClick={handleliv4}
                          >
                            <ProgressiveImage
                              src={`data:image/png;base64,${liveness4}`}
                              placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                            >
                              {liveness4 => <img src={liveness4} />}
                            </ProgressiveImage>
                            <p className='liveness-text'>liveness_4</p>
                            <p className='origin-text'>origin</p>
                          </div>
                          : null}
                        {liveness5 !== ''
                          ? <div
                            className={livCondition == 5 ? 'selfie-image1 active' : 'frnt-back-img'}
                            onClick={handleliv5}
                          >
                            <ProgressiveImage
                              src={`data:image/png;base64,${liveness5}`}
                              placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                            >
                              {liveness5 => <img src={liveness5} />}
                            </ProgressiveImage>
                            <p className='liveness-text'>liveness_5</p>
                            <p className='origin-text'>origin</p>
                          </div> : null}
                        {liveness6 !== ''
                          ? <div
                            className={livCondition == 6 ? 'selfie-image1 active' : 'frnt-back-img'}
                            onClick={handleliv6}
                          >
                            <ProgressiveImage
                              src={`data:image/png;base64,${liveness6}`}
                              placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                            >
                              {liveness6 => <img src={liveness6} />}
                            </ProgressiveImage>
                            <p className='liveness-text'>liveness_6</p>
                            <p className='origin-text'>origin</p>
                          </div>
                          : null}
                      </div>
                    </div>
                  </>
                  : null
                : null}
            </div>
            <div className='face-image-section ids-image-section'>
              <div className='faceand-videos-section'>
                <h4>ID Document visuals</h4>
                {frnt
                  ? <a
                    href={`data:image/png;base64,${frntImg}`}
                    download
                    onClick={e => downloadfrnt(e)}
                  >{download}</a>
                  : null}
                {back
                  ? <a
                    href={`data:image/png;base64,${backImg}`}
                    download
                    onClick={e => downloadback(e)}
                  >{download}</a>
                  : null}
              </div>
              <div className='face-large-image ids-largeimage'>
                <TransformWrapper>
                  <TransformComponent>
                    {frnt
                      ? <ProgressiveImage
                        src={`data:image/png;base64,${frntImg}`}
                        placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                      >
                        {frntImg => <img className='img1-hover' src={frntImg} />}
                      </ProgressiveImage>
                      : <img
                        className='img1-hover'
                        src={frnt
                          ? `data:image/png;base64,${frntImg}`
                          : back
                            ? `data:image/png;base64,${backImg}`
                            : `data:image/png;base64,${frntImg}`}
                      />}
                  </TransformComponent>
                </TransformWrapper>
              </div>
              <div className='lower-images-main lower-small-images'>
                <div
                  className={frnt ? 'selfie-image1 front-smaill-img active' : 'frnt-back-img'}
                  onClick={handleFrntImg}
                >
                  <ProgressiveImage
                    src={`data:image/png;base64,${frntImg}`}
                    placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                  >
                    {frntImg => <img src={frntImg} />}
                  </ProgressiveImage>
                  <p className='selfie-text'>front</p>
                  <p className='origin-text'>origin</p>
                </div>
                {doctype?.data?.type !== "PASSPORT"
                  ? <>
                    {doctype?.data?.type == "DRIVING_LICENSE" && doctype?.data?.issuingCountry == "JOR"
                      ? null
                      : <div
                        className={back ? 'selfie-image1 back-smaill-img active' : 'frnt-back-img'}
                        onClick={handleBackImg}
                      >
                        <ProgressiveImage
                          src={`data:image/png;base64,${backImg}`}
                          placeholder="https://miro.medium.com/max/1400/1*jJKlUDkGzezjiFPagzvnuw.gif"
                        >
                          {backImg => <img src={backImg} />}
                        </ProgressiveImage>
                        <p className='liveness-text'>back</p>
                        <p className='origin-text'>origin</p>
                      </div>

                    }
                  </>
                  : null}
              </div>
            </div>
            {doctype?.data?.issuingCountry == "JOR"
              ? <>
                {doctype?.data?.type == "PASSPORT"
                  ? <>
                    {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                      ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                        const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                          ? ocrApiData.fields
                          : null
                        return (
                          <>
                            <div className='person-mrzcode-main'>
                              <span>
                                {ocrDataPass && ocrDataPass.MRZ && ocrDataPass.MRZ.content !== undefined
                                  ? ocrDataPass.MRZ.content
                                  : null}
                              </span>
                            </div>
                          </>
                        )
                      })
                      : null}
                  </> : doctype?.data?.type == "ID_CARD"
                    ? <>
                      {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                        ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                          const ocrData = ocrApiData && ocrApiData.fields !== undefined
                            ? ocrApiData.fields
                            : null
                          return (
                            <>
                              <div className='person-mrzcode-main'>
                                <span>
                                  {ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}
                                </span>
                              </div>
                            </>
                          )
                        }) : null}
                    </>
                    : null}
              </>
              : doctype?.data?.issuingCountry == "BHR"
                ? <>
                  {doctype?.data?.type == "PASSPORT"
                    ? <>
                      {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                        ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                          const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                            ? ocrApiData.fields
                            : null
                          return (
                            <>
                              <div className='person-mrzcode-main'>
                                <span>
                                  {ocrDataPass && ocrDataPass.MRZ && ocrDataPass.MRZ.content !== undefined ? ocrDataPass.MRZ.content : null}
                                </span>
                              </div>
                            </>
                          )
                        })
                        : null}
                    </>
                    : doctype?.data?.type == "ID_CARD"
                      ?
                      <>
                        {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                          ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                            const ocrData = ocrApiData && ocrApiData.fields !== undefined
                              ? ocrApiData.fields
                              : null
                            return (
                              <>
                                <div className='person-mrzcode-main'>
                                  <span>
                                    {ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}
                                  </span>
                                </div>
                              </>
                            )
                          }) : null}
                      </>
                      : null}
                </> : doctype?.data?.issuingCountry == "EGY"
                  ? <>
                    {doctype?.data?.type == "PASSPORT"
                      ? <>
                        {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                          ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                            const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                              ? ocrApiData.fields
                              : null
                            return (
                              <>
                                <div className='person-mrzcode-main'>
                                  <span>{ocrDataPass && ocrDataPass?.["MRZ Code"] && ocrDataPass?.["MRZ Code"].content !== undefined
                                    ? ocrDataPass?.["MRZ Code"]?.content
                                    : null}</span>
                                </div>
                              </>
                            )
                          })
                          : null}
                      </>
                      : null}
                  </>
                  : doctype?.data?.issuingCountry == "ARE"
                    ? <>
                      {doctype?.data?.type == "PASSPORT"
                        ? <>
                          {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                            ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                              const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                              return (
                                <>
                                  <div className='person-mrzcode-main'>
                                    <span>
                                      {ocrDataPass && ocrDataPass?.MRZ && ocrDataPass?.MRZ.content !== undefined ? ocrDataPass?.MRZ?.content : null}
                                    </span>
                                  </div>
                                </>
                              )
                            })
                            : null}
                        </>: doctype?.data?.type == "ID_CARD"
                    ? <>
                      {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                        ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                          const ocrData = ocrApiData && ocrApiData.fields !== undefined
                            ? ocrApiData.fields
                            : null
                          return (
                            <>
                              <div className='person-mrzcode-main'>
                                <span>
                                  {ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}
                                </span>
                              </div>
                            </>
                          )
                        }) : null}
                    </>
                        : null}
                    </>
                    : doctype?.data?.issuingCountry == "OMN" ?
                      <>
                        {doctype?.data?.type == "PASSPORT"
                          ? <>
                            {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                              ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                return (
                                  <>
                                    <div className='person-mrzcode-main'>
                                      <span>{ocrDataPass && ocrDataPass["MRZ"] && ocrDataPass["MRZ"]?.content !== undefined
                                        ? ocrDataPass["MRZ"]?.content
                                        : null}</span>
                                    </div>
                                  </>
                                )
                              })
                              : null}
                          </>
                          : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType && doctype?.data?.subType
                            ? <>
                              {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                  const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                  return (
                                    <>
                                      <div className='person-mrzcode-main'>
                                        <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                      </div>
                                    </>
                                  )
                                }) : null}
                            </>
                            : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType == "RESIDENT_PERMIT_ID"
                              ? <>
                                {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                  ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                    const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                    return (
                                      <>
                                        <div className='person-mrzcode-main'>
                                          <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                        </div>
                                      </>
                                    )
                                  }) : null}
                              </>
                              : null}
                      </> : doctype?.data?.issuingCountry == "SAU" ?
                        <>{doctype?.data?.type == "PASSPORT"
                          ? <>
                            {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                              ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                return (
                                  <>
                                    <div className='person-mrzcode-main'>
                                      <span>{ocrDataPass && ocrDataPass["MRZ"] && ocrDataPass["MRZ"]?.content !== undefined
                                        ? ocrDataPass["MRZ"]?.content
                                        : null}</span>
                                    </div>
                                  </>
                                )
                              })
                              : null}
                          </>
                          : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType && doctype?.data?.subType
                            ? <>
                              {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                  const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                  return (
                                    <>
                                      <div className='person-mrzcode-main'>
                                        <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                      </div>
                                    </>
                                  )
                                }) : null}
                            </>
                            : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType == "RESIDENT_PERMIT_ID"
                              ? <>
                                {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                  ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                    const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                    return (
                                      <>
                                        <div className='person-mrzcode-main'>
                                          <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                        </div>
                                      </>
                                    )
                                  }) : null}
                              </>
                              : null}
                        </>
                        : doctype?.data?.issuingCountry == "QAT"
                          ? <>{doctype?.data?.type == "PASSPORT"
                            ? <>{getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                              ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                return (
                                  <>
                                    <div className='person-mrzcode-main'>
                                      <span>{ocrDataPass && ocrDataPass["MRZ"] && ocrDataPass["MRZ"]?.content !== undefined
                                        ? ocrDataPass["MRZ"]?.content
                                        : null}</span>
                                    </div>
                                  </>
                                )
                              })
                              : null}
                            </>
                            : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType && doctype?.data?.subType
                              ? <>
                                {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                  ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                    const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                    return (
                                      <>
                                        <div className='person-mrzcode-main'>
                                          <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                        </div>
                                      </>
                                    )
                                  })
                                  : null}
                              </>
                              : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType == "RESIDENT_PERMIT_ID"
                                ? <>
                                  {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                    ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                      const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                      return (
                                        <>
                                          <div className='person-mrzcode-main'>
                                            <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                          </div>
                                        </>
                                      )
                                    })
                                    : null}
                                </>
                                : null}
                            </> 
                          :doctype?.data?.issuingCountry == "KWT" 
                          ? <>{doctype?.data?.type == "PASSPORT"
                            ? <>{getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                              ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                                const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                return (
                                  <>
                                    <div className='person-mrzcode-main'>
                                      <span>{ocrDataPass && ocrDataPass["MRZ"] && ocrDataPass["MRZ"]?.content !== undefined
                                        ? ocrDataPass["MRZ"]?.content
                                        : null}</span>
                                    </div>
                                  </>
                                )
                              })
                              : null}
                            </>
                            : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType && doctype?.data?.subType
                              ? <>
                                {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                  ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                    const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                    return (
                                      <>
                                        <div className='person-mrzcode-main'>
                                          <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                        </div>
                                      </>
                                    )
                                  })
                                  : null}
                              </>
                              : doctype?.data?.type == "ID_CARD" && doctype?.data?.subType == "RESIDENT_PERMIT_ID"
                                ? <>
                                  {getOcrData && getOcrData[1] && getOcrData[1].analyzeResult && getOcrData[1].analyzeResult.documents !== undefined
                                    ? getOcrData[1].analyzeResult.documents.map((ocrApiData) => {
                                      const ocrData = ocrApiData && ocrApiData.fields !== undefined ? ocrApiData.fields : null
                                      return (
                                        <>
                                          <div className='person-mrzcode-main'>
                                            <span>{ocrData && ocrData.MRZ && ocrData.MRZ.content !== undefined ? ocrData.MRZ.content : null}</span>
                                          </div>
                                        </>
                                      )
                                    })
                                    : null}
                                </>
                                : null}</>
                            :doctype?.data?.issuingCountry == "IRQ"
                            ?<>
                              {doctype?.data?.type=="PASSPORT"
                              ?<>
                              {getOcrData && getOcrData.analyzeResult && getOcrData.analyzeResult.documents !== undefined
                              ? getOcrData.analyzeResult.documents.map((ocrApiData) => {
                              const ocrDataPass = ocrApiData && ocrApiData.fields !== undefined
                                ? ocrApiData.fields
                              : null
                        return (
                          <>
                            <div className='person-mrzcode-main'>
                              <span>
                                {ocrDataPass && ocrDataPass.MRZ && ocrDataPass.MRZ.content !== undefined
                                  ? ocrDataPass.MRZ.content
                                  : null}
                              </span>
                            </div>
                          </>
                        )
                      })
                              : null}</>
                              :null}
                            </>
                            : null}
          </div>
          <div className='maindata-rightdata-section'>
            <div className='maindata-rightdata-section-inner'>
              <div className='commentbox-main'>
                <label>Comment{!commentButtons ? <span className='comment-edit-btn'> <MdModeEdit /></span> : null}
                  {commentButtons ? <>
                    <span className='comment-box-close-icon' onClick={handleHideBtns} ><GrFormClose /></span>
                    <span className='comment-box-save-icon'><TiTick /></span></> : null}
                </label>
                <textarea id="w3review" name="w3review" rows="1" cols="40" onMouseDown={handleEnter} />
              </div>
              <div className='tabs-data-section-main'>
                <WatchlistData
                  singlecustomer={singlecustomer}
                  customId={customId}
                  validaData={validaData}
                />
              </div>
              {validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[0] !== undefined||validaData?.detailvalidaAppId && validaData?.detailvalidaAppId[1] !== undefined?validaData?.detailvalidaAppId[0]?.detail!=="The provided token has expired"?
              <DetailAuthenticate
                validaData={validaData}
                setFrntImg={setFrntImg}
                setBackImg={setBackImg}
                frntBackImg={frntBackImg}
                setBack={setBack}
                setFrnt={setFrnt}
                validaLoading={validaLoading}
              />:null:null}
              
              {singlecustomer && singlecustomer.capabilities && singlecustomer.capabilities.extraction !== undefined
                ? singlecustomer.capabilities.extraction.map((data) => {
                  return (
                    <>
                      {data?.data?.issuingCountry == "JOR"
                        || data?.data?.issuingCountry == "ISR"
                        || data?.data?.issuingCountry == "BHR"
                        || data?.data?.issuingCountry == "EGY"
                        || data?.data?.issuingCountry == "ARE"
                        || data?.data?.issuingCountry == "OMN"
                        || data?.data?.issuingCountry == "SAU"
                        || data?.data?.issuingCountry == "QAT"
                        || data?.data?.issuingCountry == "KWT"
                        ||data?.data?.issuingCountry == "IRQ"
                        ? <div className='id-doccheck-lower-heading'>
                          <h2>ID Document Check</h2>
                          <p>This data was extracted automatically.. Results might not clearly represent the actual datat.</p>
                        </div>
                        : null}
                      <div className={data?.data?.issuingCountry == "JOR"
                        || data?.data?.issuingCountry == "ISR"
                        || data?.data?.issuingCountry == "BHR"
                        || data?.data?.issuingCountry == "EGY"
                        || data?.data?.issuingCountry == "ARE"
                        || data?.data?.issuingCountry == "OMN"
                        || data?.data?.issuingCountry == "SAU"
                        || data?.data?.issuingCountry == "QAT"
                        || data?.data?.issuingCountry == "KWT"
                        || data?.data?.issuingCountry == "IRQ"
                        ? "idcheck-two-tables"
                        : "idcheck-single-table"}>

                        <div className='id-check-lower-main'>
                          {data?.data?.issuingCountry !== "JOR"
                            && data?.data?.issuingCountry !== "ISR"
                            && data?.data?.issuingCountry !== "BHR"
                            && data?.data?.issuingCountry !== "EGY"
                            && data?.data?.issuingCountry !== "ARE"
                            && data?.data?.issuingCountry !== "OMN"
                            && data?.data?.issuingCountry !== "SAU"
                            && data?.data?.issuingCountry !== "QAT"
                            && data?.data?.issuingCountry !== "KWT"
                            && data?.data?.issuingCountry !== "IRQ"
                            ? <div className='id-doccheck-lower-heading'>
                              <h2>ID Document Check</h2>
                              <p>This data was extracted automatically.. Results might not clearly represent the actual data.</p>
                            </div>
                            : null}
                          <table>
                            <thead>
                              <tr>
                                <th>Forms</th>
                                <th>Visual</th>
                                <th>Valid</th>
                              </tr>
                            </thead>
                            <tbody>
                              <>
                                <tr>
                                  <td>First Name</td>
                                  <td>
                                    <span>{data && data.data && data.data.firstName !== undefined ? data.data.firstName : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.firstName !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                <tr>
                                  <td>Last Name</td>
                                  <td>
                                    <span>{data && data.data && data.data.lastName !== undefined ? data.data.lastName : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.lastName !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                <tr>
                                  <td>Issuing country</td>
                                  <td>
                                    <span>{data && data.data && data.data.issuingCountry !== undefined ? data.data.issuingCountry : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.issuingCountry !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                <tr>
                                  <td>Date of birth</td>
                                  <td>
                                    <span>{data && data.data && data.data.dateOfBirth !== undefined ? data.data.dateOfBirth : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.dateOfBirth !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                <tr>
                                  <td>Document type</td>
                                  <td>
                                    <span>{data && data.data && data.data.type !== undefined ? data.data.type : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.type !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                <tr>
                                  <td>Document number</td>
                                  <td>
                                    <span>{data && data.data && data.data.documentNumber !== undefined ? data.data.documentNumber : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.documentNumber !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                <tr>
                                  <td>Nationality code</td>
                                  <td>
                                    <span>{data && data.data && data.data.issuingCountry !== undefined ? data.data.issuingCountry : null}</span>
                                  </td>
                                  <td>{data && data.data && data.data.issuingCountry !== undefined ? <TiTick /> : null}</td>
                                </tr>
                                {data && data.data && data.data.optionalMrzField1 !== undefined
                                  ? <tr>
                                    <td>National Number</td>
                                    <td><span>{data && data.data && data.data.optionalMrzField1 !== undefined ? data.data.optionalMrzField1 : null}</span></td>
                                    <td>{data && data.data && data.data.optionalMrzField1 !== undefined ? <TiTick /> : null}</td>
                                  </tr>
                                  : null}
                                {data && data.data && data.data.expiryDate
                                  ? <>
                                    {singlecustomer?.capabilities?.dataChecks.map((datchk) => {
                                      return (
                                        <tr>
                                          <td>Expiry Date</td>
                                          <td>
                                            <span>{data && data.data && data.data.expiryDate !== undefined ? data.data.expiryDate : null}</span>
                                          </td>
                                          <td>{datchk?.decision?.details?.label !== "DOCUMENT_EXPIRY_WITHIN_CONFIGURED_LIMIT"
                                            ? <TiTick />
                                            : <span className='user-wrong-icon'>{notverified}</span>}</td>
                                        </tr>
                                      )
                                    })}
                                  </>
                                  : null}
                                {data && data.data && data.data.address
                                  ? <tr>
                                    <td>Address</td>
                                    <td>
                                      <span>
                                        {data && data.data && data.data.address && data.data.address.city !== undefined ? data.data.address.city : null}
                                      </span>{' '}
                                      <span>
                                        {data && data.data && data.data.address && data.data.address.country !== undefined ? data.data.address.country : null}
                                      </span><br />
                                      <span>
                                        {data && data.data && data.data.address && data.data.address.subdivision !== undefined ? data.data.address.subdivision : null}
                                      </span><br />
                                      <span>
                                        {data && data.data && data.data.address && data.data.address.line1 !== undefined ? data.data.address.line1 : null}
                                      </span>{' '}
                                      <span>
                                        {data && data.data && data.data.address && data.data.address.line2 !== undefined ? data.data.address.line2 : null}
                                      </span><br />
                                      <span>
                                        {data && data.data && data.data.address && data.data.address.postalCode !== undefined ? data.data.address.postalCode : null}
                                      </span>
                                    </td>
                                    <td>{data && data.data && data.data.address !== undefined ? <TiTick /> : null}</td>
                                  </tr>
                                  : null}
                              </>
                            </tbody>
                          </table>
                        </div>
                        <OcrData
                          singlecustomer={singlecustomer}
                          testOcrFunc={testOcrFunc}
                        />
                      </div>
                    </>
                  )
                })
                : null}
            </div>
          </div>
        </div>
        : null}
      {/* {loading
        ? <div className="loading-request">
          <div className="loader-svg"> <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" /></div>
        </div>
        : null} */}
      {!tabsData
        ? <>
          <div className='raw-data-main'>
            <div className="rowMainBlock">
              <div className='raw-data-header'>
                <h2>Raw request</h2>
                <span className='download-option' onClick={handleRequest}>{download}</span>
              </div>
              <div className='response-data-inner'>
                <pre className="layout__item u-1/2-lap-and-up">
                  {JSON.stringify(rawrequest, null, 2)}
                </pre>
              </div>
            </div>
            <div className="rowMainBlock">
              <div className='raw-data-header'>
                <h2>Raw response</h2>
                <span className='download-option' onClick={handleResponse}>{download}</span>
              </div>
              <div className='response-data-inner'>
                <pre className="layout__item u-1/2-lap-and-up">
                  {JSON.stringify(singlecustomer, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </>
        : null}
    </div>
  )
}
export default SingleCustomer
