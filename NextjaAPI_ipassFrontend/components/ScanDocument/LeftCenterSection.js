/* eslint-disable */
import FileBase64 from 'react-file-base64';
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst';
import { FiRotateCw } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Document, Page, pdfjs } from "react-pdf";
import LoadingIcons from 'react-loading-icons';
import { toast } from 'react-toastify';
import { isEmpty } from '../ipasslisting/ipasslisting';
import Cookies from 'js-cookie';
import OutsideClickHandler from 'react-outside-click-handler';

const LeftCenterSection = (props) => {
    const is_Sup = Cookies.get('issup');
    const errtoast = () => toast.error("File size is more than 20MB");
    const errtoast2 = () => toast.error("File size is more than 4MB");
    const noFileToast = () => toast.error("No file is selected");
    const wrongError = () => toast.error("Someting Went wrong with your file");
    const limitToast = () => toast.error("Scan limit exceed");
    const handPdfToast = () => toast.error("Handwritten documument can only be image");
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const router = useRouter()
    const {
        setCurrentImgData,
        currentImgData,
        dataFromDatabase,
        email,
        getAllFormData,
        pageNumber,
        setPageNumber,
        docTypeObj
    } = props;

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageInCenter, setImageInCenter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customerprofileData, setCustomerProfileData] = useState([]);
    const [rotatePdf, setRotatePdf] = useState(0);
    const [docType, setDocType] = useState(docTypeObj.printed);
    const [handOrPrinted, setHandOrPrinted] = useState("none");
    let rotation = 0;
    const angle = 90;

    useEffect(() => {
        if (is_Sup == "1") {
            handleSingCust()
        }
    }, [])

    useEffect(() => {           //selecting first image from database by default
        const imgData = dataFromDatabase && dataFromDatabase.length > 0 ? dataFromDatabase[0] : null;
        if (imgData) {
            showImageInCenter(imgData);
        }
    }, [dataFromDatabase]);

    useEffect(() => {
        const ele = document.querySelector("#uploadHandwritenImageID input");
        ele?.setAttribute("accept", "image/*");
        const ele2 = document.querySelector("#uploadPrintedImageID input");
        ele2?.setAttribute("accept", "image/*, application/pdf");
    }, [handOrPrinted])

    function handleImageUpload(data, docType) {      //when we click the image upload button
        setHandOrPrinted("none")
        if (docType == docTypeObj.handwritten && data.type == "application/pdf") {
            handPdfToast();
            return;
        }
        setDocType(docType);
        if (is_Sup == "1") {
            // if (customerprofileData?.scanLimitremain === "0") {
            //     limitToast()
            // } else {
                const str = data?.size.slice(0, -2);
                const intstr = parseInt(str);
                if (docType == docTypeObj.handwritten && intstr >= 4000) {
                    errtoast2()
                    return
                }
                if (intstr <= 20000) {
                    setSelectedImage(data);
                    showImageInCenter(data);
                } else {
                        errtoast()
                    setTimeout(() => {
                        router.reload(window.location.pathname)
                    }, 5000)
                }
            }
        // }
        else {
            const str = data?.size.slice(0, -2);
            const intstr = parseInt(str);
            if (docType == docTypeObj.handwritten && intstr >= 4000) {
                errtoast2()
                return
            }
            if (intstr <= 20000) {
                setSelectedImage(data);
                showImageInCenter(data);
            } else {
                errtoast()
                setTimeout(() => {
                    router.reload(window.location.pathname)
                }, 5000)
            }
        }
    }

    function handleDeleteImage() {  //when user click on delete icon on uploaded image
        setSelectedImage(null);
        showImageInCenter(null);
        const imgData = dataFromDatabase && dataFromDatabase.length > 0 ? dataFromDatabase[0] : null;
        if (imgData) {
            showImageInCenter(imgData);
        }
    }

    function showImageInCenter(data) {  //to show image in center on screen
        const rotated = document.getElementById('rotateImage');
        rotated.style.transform = `rotate(${0}deg)`;
        setRotatePdf(0);
        setImageInCenter(data?.base64);
        setCurrentImgData(data);
    }

    function handleRotate() {   //when we click on rotate button  // react-pdf__message--error
        const rotated = document.getElementById('rotateImage');
        const isDocMessage = document.getElementsByClassName('react-pdf__message--error');
        if (currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf") {
            setRotatePdf(rotatePdf + 90);
        } else if (isDocMessage.length > 0) {
            rotated.style.transform = `rotate(${0}deg)`;
        } else {
            rotation = (rotation + angle) % 360;
            rotated.style.transform = `rotate(${rotation}deg)`;
        }
    }

    function handleSingCust() {
        axios.get(`${LIVE_URL}/api/v1/getuser/${email}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        })
            .then((response) => {
                setCustomerProfileData(response && response.data && response.data.data !== undefined
                    ? response.data.data
                    : null)
            })

    }

    function handleUpdLimit() {
        const minusPages = currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf"
            ? numPages : 1;
        const body = JSON.stringify({
            email,
            minusPages
        });
        axios.put(`${LIVE_URL}/api/v1/update/scandoc/consumptions`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        })
    }

    let i = 0
    function handleGetFormData(url_id, data, email) {
        const pdfString = data?.base64
        const body = JSON.stringify({
            image: pdfString,
            name: data?.name,
            email,
            filetype: data?.type,
            apiurl: url_id
        });
        axios.post(`${LIVE_URL}/api/v1/ipass/get/all/formdata`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
        }).then((response) => {
            const sts = response?.data?.result
            if (sts?.status !== "succeeded") {
                i++
                if (i == 10) {
                    setLoading(false)
                    wrongError()
                    handleDeleteImage()
                    i = 0;
                } else {
                    setTimeout(() => {
                        handleGetFormData(url_id, data, email)
                    }, 2000)
                }
            }
            else if (response.status == 200) {
                setLoading(false)
                getAllFormData(email);
                if (is_Sup == "1") {
                    handleUpdLimit()
                }
                handleDeleteImage()
                i = 0;
            }
        })
    }


    function handleAnalyzeImage(data) {     //when user click on analyze image button
        if (isEmpty(data)) {
            noFileToast();
        }
        else {
            const minusPages = currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf"
                ? numPages
                : 1;
            if (is_Sup == "1") {
                // if (parseInt(customerprofileData?.scanLimitremain) > minusPages) {
                    setLoading(true)
                    const pdfString = data?.base64
                    const body = JSON.stringify({
                        image: pdfString,
                        name: data?.name,
                        email,
                        filetype: data?.type,
                        doctype: docType
                    });

                    if (docType == docTypeObj.printed) {
                        axios.post(`${LIVE_URL}/api/v1/ipass/get/formdata`, body, {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            mode: 'no-cors',
                        }).then((response) => {
                            const url_id = response?.data?.headerUrl["operation-location"]
                            handleGetFormData(url_id, data, email)
                        })
                    } else if (docType == docTypeObj.handwritten) {
                        axios.post(`${LIVE_URL}/api/v1/post/handwritten/document`, body, {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            mode: 'no-cors',
                        }).then(() => {
                            
                            setLoading(false)
                            getAllFormData(email);
                            if (is_Sup == "1") {
                                handleUpdLimit()
                            }
                            handleDeleteImage()
                            i = 0;
                        })
                    }
                // }
                // else {
                //     limitToast()
                // }
            }
            else {
                setLoading(true)
                const pdfString = data?.base64
                const body = JSON.stringify({
                    image: pdfString,
                    name: data?.name,
                    email,
                    filetype: data?.type,
                    doctype: docType
                });
                if (docType == docTypeObj.printed) {
                    axios.post(`${LIVE_URL}/api/v1/ipass/get/formdata`, body, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        mode: 'no-cors',
                    })
                        .then((response) => {
                            const url_id = response?.data?.headerUrl["operation-location"]
                            handleGetFormData(url_id, data, email)
                        })
                }
                else if (docType == docTypeObj.handwritten) {

                    axios.post(`${LIVE_URL}/api/v1/post/handwritten/document`, body, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        mode: 'no-cors',
                    })
                        .then(() => {
                            setLoading(false)
                            getAllFormData(email);
                            if (is_Sup == "1") {
                                handleUpdLimit()
                            }
                            handleDeleteImage()
                            i = 0;
                        })
                }

            }
        }
    }

    // pdf code
    const [numPages, setNumPages] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function handleSetPagenumber(e) {
        const parseNumber = parseInt(e.target.value);
        if (parseNumber > numPages) {
            return;
        }
        if (parseNumber <= 0) {
            return;
        }
        if (e.target.value.length <= 0) {
            return;
        }
        setPageNumber(parseNumber);
    }

    return (
        <div className="analyzeLeftCenterSection">
            <div className="analyzeLeftSection">
                <div className="uploadMain">
                    <div className="selectImageFile" >
                        {selectedImage
                            ? <>
                                <div onClick={() => { showImageInCenter(selectedImage) }}>
                                    {selectedImage.base64
                                        && selectedImage?.type == "application/pdf"
                                        ? <Document
                                            file={selectedImage.base64}
                                        >
                                            <Page pageNumber={1} />
                                        </Document>
                                        : <img
                                            src={selectedImage.base64}
                                        />
                                    }
                                    {selectedImage?.file?.name
                                        && <p className="imageName">{selectedImage.file.name}</p>}
                                </div>
                                <MdDeleteOutline onClick={handleDeleteImage} />
                            </>
                            : <div className='uploadHandPrinted handPrinted'>
                                {handOrPrinted === docTypeObj.handwritten
                                    ? <OutsideClickHandler onOutsideClick={() => { setHandOrPrinted("none") }}>
                                        <div className="uploadHandwritenImage uploadMain" id="uploadHandwritenImageID">
                                            <FileBase64
                                                multiple={false}
                                                onDone={(e) => handleImageUpload(e, docTypeObj.handwritten)}
                                                accept="image/*"
                                            />
                                        </div>
                                    </OutsideClickHandler>
                                    : handOrPrinted === docTypeObj.printed
                                        ? <OutsideClickHandler onOutsideClick={() => { setHandOrPrinted("none") }}>
                                            <div className="uploadPrintedImage uploadMain" id="uploadPrintedImageID">
                                                <FileBase64
                                                    multiple={false}
                                                    onDone={(e) => handleImageUpload(e, docTypeObj.printed)}
                                                    accept="image/*, application/pdf"
                                                />
                                            </div></OutsideClickHandler>
                                        : <div className='twoUploadButtons'>
                                            <img src="	https://upload.wikimedia.org/wikipedia/commons/2/27/Noun_Project_cloud_upload_icon_411593_cc.svg" alt="uploadImage" />
                                            <div className='twoUploadButtonsInside'>
                                                <button onClick={() => setHandOrPrinted(docTypeObj.handwritten)}>
                                                    Handwritten
                                                </button>
                                                <button onClick={() => setHandOrPrinted(docTypeObj.printed)}>
                                                    Printed
                                                </button>
                                            </div>
                                        </div>}
                            </div>}
                    </div>
                </div>
                <div className="imagesSection">
                    {dataFromDatabase?.map((imgData, i) => {
                        return <div
                            key={i}
                            onClick={() => { showImageInCenter(imgData) }}
                            className={`mappedImage ${imgData._id == currentImgData?._id ? "active" : ""}`}>
                            {imgData.type == "application/pdf" ?
                                <Document file={imgData.base64}>
                                    <Page pageNumber={1} />
                                </Document> :
                                <img src={imgData.base64} />}
                            <p className="mappedImagesName">{imgData.name}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className="analyzeCenterSection">
                <div className="analyzeSection">
                    <button onClick={() => { handleAnalyzeImage(currentImgData) }}>Analyze</button>
                </div>
                <div className="centerImageSection">
                    <div className="centerImage" >
                        <TransformWrapper>
                            <TransformComponent>
                                <div className='rotate-div' id="rotateImage">
                                    {currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf"
                                        ? <Document
                                            file={imageInCenter}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            rotate={rotatePdf}
                                        >
                                            <Page pageNumber={pageNumber} />
                                        </Document>
                                        : <img src={imageInCenter} />}
                                </div>
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                    {currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf"
                        ? <div className='below-pdf'>
                            <div className="pdfPages">
                                <button type="button" disabled={pageNumber <= 1} onClick={previousPage} className="prevPdfButton">
                                    <MdOutlineNavigateBefore />
                                </button>
                                <div className='page-number-textbox'>
                                    <input
                                        type="number"
                                        value={pageNumber}
                                        onChange={(e) => handleSetPagenumber(e)}
                                    /> of {numPages || "--"}
                                </div>
                                <button
                                    type="button"
                                    disabled={pageNumber >= numPages}
                                    onClick={nextPage}
                                    className="nextPdfButton"
                                >
                                    <MdOutlineNavigateNext />
                                </button>
                            </div>
                            <div className='rotate-button' onClick={handleRotate}><FiRotateCw /></div>
                        </div>
                        : null}
                    {currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf"
                        ? null
                        : <div className='belowCenterImage'>
                            <div className='rotate-button' onClick={handleRotate}><FiRotateCw /></div>
                        </div>
                    }
                </div>
            </div>
            {loading ?
                <div className="loading-request">
                    <div className="loader-svg">
                        <LoadingIcons.Circles stroke="#86afd1" fill="#86afd1" />
                    </div>
                </div>
                : null}
        </div>
    )
}
export default LeftCenterSection;