/* eslint-disable */
import React from 'react'
import FileBase64 from 'react-file-base64';
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from 'axios';
import { LIVE_URL } from '../../Hooks/envConst';
import { FiRotateCw } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { Document, Page, pdfjs } from "react-pdf";
import LoadingIcons from 'react-loading-icons'
import { toast } from 'react-toastify';
import { isEmpty } from '../ipasslisting/ipasslisting';

function Leftcentersection(props) {
    let rotation = 0;
    const angle = 90;
    const {
        currentImgData,
        setCurrentImgData,
        getAllFormData,
        getCurrentValidaData,
        pageNumber,
        setPageNumber,
        email,
        dataFromDatabase,
        setImageInCenter,
        imageInCenter,
        mappedPDF
    } = props

    const [selectedImage, setSelectedImage] = useState(null);
    const [rotatePdf, setRotatePdf] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const errtoast = () => toast.error("File size is more than 14MB");
    const tokenErrtoast = () => toast.error("The provided token has expired");
    const noFileToast = () => toast.error("No file is selected");
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    useEffect(() => {           //selecting first image from database by default
        const imgData = dataFromDatabase && dataFromDatabase.length > 0 ? dataFromDatabase[0] : null;
        if (imgData) {
            showImageInCenter(imgData);
        }
    }, [dataFromDatabase]);

    function handleDeleteImage() {  //when user click on delete icon on uploaded image
        setSelectedImage(null);
        showImageInCenter(null);
        const imgData = dataFromDatabase && dataFromDatabase.length > 0 ? dataFromDatabase[0] : null;
        if (imgData) {
            showImageInCenter(imgData);
        }
    }

    function handleImageUpload(data) {      //when we click the image upload button
        data.base64 = data.base64.substring(data.base64.indexOf(",") + 1);
        const str = data?.size.slice(0, -2);
        const intstr = parseInt(str);
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

    function showImageInCenter(data) {  //to show image in center on screen
        const rotated = document.getElementById('rotateImage');
        rotated.style.transform = `rotate(${0}deg)`;
        setRotatePdf(0);
        const dataCenter = `data:application/pdf/png/jpeg;base64,${data?.base64}`;
        setImageInCenter(dataCenter);
        setCurrentImgData(data);
        getCurrentValidaData(data?._id);
    }

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
        const parseNumber = parseInt(e.target.value)
        if (parseNumber > numPages) {
            return;
        }
        if (parseNumber <= 0) {
            return;
        }
        if (e.target.value.length <= 0) {
            return;
        }
        setPageNumber(parseNumber)
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

    function handleAnalyzeImage(data) {     //when user click on analyze image button
        if (!isEmpty(data)) {
            setLoading(true)
            const stringg = data?.base64
            const pdfString = stringg.substring(stringg.indexOf(",") + 1);
            const body = JSON.stringify({
                image: pdfString,
                email,
                filetype: data.type,
                name: data?.name,
            });
            axios.post(`${LIVE_URL}/api/v1/ipass/document/validity`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors',
            }).then((response) => {
                // console.log("dd",response);
                if (response.status != 200) {
                        return;
                }
                if (response?.data?.detailvalidaAppId?.detail == "The provided token has expired") {
                    tokenErrtoast()
                }else if(response?.data?.parseBodyMan?.detail== "The provided token has expired"){
                    tokenErrtoast()   
                }
                setLoading(false)
                handleDeleteImage()
                getAllFormData(email)
            })
            return;
        }
        noFileToast();
    }

    return (
        <div className="analyzeLeftCenterSection">
            <div className="analyzeLeftSection">
                <div className="uploadMain">
                    <div className="selectImageFile auth-doc-page">
                        {selectedImage
                            ? <><div onClick={() => { showImageInCenter(selectedImage) }}>
                                {selectedImage.base64
                                    && selectedImage?.type == "application/pdf"
                                    ? <Document
                                        file={`data:application/pdf/png/jpeg;base64,${selectedImage.base64}`}
                                    >
                                        <Page pageNumber={1} />
                                    </Document> :
                                    <img
                                        src={`data:application/pdf/png/jpeg;base64,${selectedImage.base64}`}

                                    />
                                }
                                {selectedImage?.file?.name
                                    && <p className="imageName">{selectedImage.file.name}</p>}

                            </div>
                                <MdDeleteOutline onClick={handleDeleteImage} />
                            </>
                            : <FileBase64
                                multiple={false}
                                onDone={handleImageUpload}
                                accept="image/*"
                            />}
                    </div>
                </div>
                <div className="imagesSection">
                    {dataFromDatabase?.map((imgData, i) => {
                        return <div
                            key={i}
                            onClick={() => { showImageInCenter(imgData) }}
                            className={`mappedImage ${imgData._id == currentImgData?._id ? "active" : ""}`}>
                            {imgData.type == "application/pdf" ?
                                <Document file={`data:application/pdf;base64,${imgData.base64}`}>
                                    <Page pageNumber={1} />
                                </Document> :
                                <img src={`data:image/jpeg;base64,${imgData.base64}`} />}

                            <p className="mappedImagesName">{imgData.name}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className="analyzeCenterSection">
                <div className="analyzeSection">
                    <button onClick={() => { handleAnalyzeImage(currentImgData) }}>Authenticate</button>
                </div>
                <div className="centerImageSection">
                    <div className="centerImage" >
                        <TransformWrapper>
                            <TransformComponent>
                                <div className='rotate-div' id="rotateImage">
                                    {currentImgData?.type == "application/pdf" || currentImgData?.type == "application/pdf"
                                        ? <div className='pdfChangesection'>
                                            <div className='normalPDF' id="normalPDFDOC">
                                                <Document file={imageInCenter} onLoadSuccess={onDocumentLoadSuccess} rotate={rotatePdf}>
                                                    <Page pageNumber={pageNumber} />
                                                </Document>
                                            </div>
                                            <div className='mappedPDF' id="mappedPDFDOC">
                                                <Document file={mappedPDF} onLoadSuccess={onDocumentLoadSuccess} rotate={rotatePdf}>
                                                    <Page pageNumber={pageNumber} />
                                                </Document>
                                            </div>
                                        </div>
                                        : <img src={imageInCenter} />
                                    }
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
                                    />
                                    of {numPages || "--"}
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

export default Leftcentersection
