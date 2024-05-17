/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
// import countryList from 'react-select-country-list'
import FileBase64 from 'react-file-base64';
import { MdDeleteOutline, MdOutlineArrowBack } from 'react-icons/md';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { FiRotateCw } from 'react-icons/fi';
import axios from 'axios';
import { LIVE_URL } from "../../Hooks/envConst"
import LoadingIcons from 'react-loading-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function LeftCenterSection(props) {
  const { setCurrentImgData,
    currentImgData, email, dataFromDatabase, getAllFormData } = props
  const isEmpty = (value) => {
    // console.log("val",value);
    return (value == null || value.length === 0 || value == undefined);
  }
  const [value, setValue] = useState('')
  const [idType, setIdType] = useState('')
  const [showHideCondition, setShowHideCondition] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageInCenter, setImageInCenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const noFileToast = () => toast.error("No file is selected");
  const errtoast = () => toast.error("File size is more than 20MB");
  const router = useRouter()
  // const options = useMemo(() => countryList().getData(), [])
  // console.log("dd", imageInCenter);
  const optionsCountry = [
    // {
    //   label: "Jordan",
    //   value: "JOR"
    // },
    // {
    //   label: "Kuwait",
    //   value: "KWT"
    // },
    // {
    //   label: "Bahrin",
    //   value: "BHR"
    // },
    // {
    //   label: "Oman",
    //   value: "OMN"
    // },
    // {
    //   label: "Qatar",
    //   value: "QAT"
    // },
    // {
    //   label: "Egypt",
    //   value: "EGY"
    // },
    // {
    //   label: "United Arab Emirates",
    //   value: "ARE"
    // },
    {
      label: "SaudiArabia",
      value: "SAU"
    }
    // {
    //   label: "Iraq",
    //   value: "IQ"
    // }
  ]
  const optionDocType = [
    {
      label: "Registration Certificate"
    }
    // {
    //   label: "ID_CARD"
    // },
    // {
    //   label: "PASSPORT"
    // }
  ]
  useEffect(() => {           //selecting first image from database by default
    const imgData = dataFromDatabase && dataFromDatabase.length > 0 ? dataFromDatabase[0] : null;
    if (imgData) {
      showImageInCenter(imgData);
    }
  }, [dataFromDatabase]);

  const changeHandler = value => {
    setValue(value.value)
    setShowHideCondition(2)
  }
  const changeIdType = value => {
    setIdType(value.label)
    setShowHideCondition(3)
  }
  function handleImageUpload(data) {
    const str = data?.size.slice(0, -2);
    const intstr = parseInt(str);
    if (intstr <= 20000) {
    setSelectedImage(data)
    showImageInCenter(data);
    }else{
      errtoast()
      setTimeout(() => {
          router.reload(window.location.pathname)
      }, 5000)
    }
    // console.log("data", data);
  }
  function handleDeleteImage() {
    setSelectedImage(null)
    showImageInCenter(null);
    setShowHideCondition(1)
    const imgData = dataFromDatabase && dataFromDatabase.length > 0 ? dataFromDatabase[0] : null;
    if (imgData) {
      showImageInCenter(imgData);
    }
  }
  function handleAnalyzeImage(data) {
    if (isEmpty(data)) {
      noFileToast();
    } else {
      setLoading(true)
      const body = JSON.stringify({
        baseImage: data?.base64,
        selected_country: value,
        selected_idtype: idType
      });
      //  console.log("bbb",data?.base64);

      axios.post(`${LIVE_URL}/api/v1/post/document/image`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'no-cors',
      }).then((response) => {
        const url = response?.data?.allData?.["operation-location"]
        handleGetImageData(url, data, email)
        console.log("resp", url);
      })
    }

  }
  let i = 0
  function handleGetImageData(url, data, email) {
    const body = JSON.stringify({
      image: data?.base64,
      name: data?.name,
      email,
      filetype: data?.type,
      apiurl: url
    });
    axios.post(`${LIVE_URL}/api/v1/get/document/data`, body, {
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
          // wrongError()
          handleDeleteImage()
          i = 0;
        } else {
          setTimeout(() => {
            handleGetImageData(url, data, email)
          }, 2000)
        }
      } else if (response.status == 200) {
        setLoading(false)
        getAllFormData(email);
        handleDeleteImage()
        i = 0;
      }
    })
  }

  function showImageInCenter(data) {  //to show image in center on screen
    // const rotated = document.getElementById('rotateImage');
    // rotated.style.transform = `rotate(${0}deg)`;
    // setRotatePdf(0);
    setImageInCenter(data?.base64);
    setCurrentImgData(data);
  }
  let rotation = 0;
  const angle = 90;
  function handleRotate() {   //when we click on rotate button  // react-pdf__message--error
    const rotated = document.getElementById('rotateImage');
    // const isDocMessage = document.getElementsByClassName('react-pdf__message--error');
    rotation = (rotation + angle) % 360;
    rotated.style.transform = `rotate(${rotation}deg)`;
  }
  function handleBack() {
    if (showHideCondition == 3) {
      setShowHideCondition(2)
    } else if (showHideCondition == 2) {
      setShowHideCondition(1)
    }
  }

  return (
    <>
      <div className="analyzeLeftCenterSection">
        <div className="analyzeLeftSection dropdown-upload-main">
          {showHideCondition !== 1 ?
            <div className='back-button-tds'>
              <span onClick={handleBack}><MdOutlineArrowBack /></span>
            </div> : null}
          {showHideCondition == 1 ?
            <>
              <div className='label-dropdownMain'>
                <span className='country-text'>Please select country</span>
                {/* <div className='country-dropdown'> */}
                <Select options={optionsCountry} value={value} onChange={changeHandler} />
                {/* </div> */}
              </div>
            </>
            : showHideCondition == 2 ?
              <>
                <div className='label-dropdownMain'>
                  <span className='country-text'>Please select id type</span>
                  <Select options={optionDocType} value={value} onChange={changeIdType} />
                </div>
              </>
              : showHideCondition == 3 ?
                <div className="uploadMain">
                  <div className="selectImageFile" >
                    {selectedImage
                      ? <>
                        <div onClick={() => { showImageInCenter(selectedImage) }}>
                          <img
                            src={selectedImage.base64}
                          />
                          {selectedImage?.file?.name
                            && <p className="imageName">{selectedImage.file.name}</p>}

                        </div>
                        <MdDeleteOutline onClick={handleDeleteImage} />
                      </> :
                      <div className='uploadHandPrinted handPrinted'>
                        <div className="uploadHandwritenImage uploadMain" id="uploadHandwritenImageID">
                          <FileBase64
                            multiple={false}
                            onDone={(e) => handleImageUpload(e)}
                            accept="image/*"
                          />
                        </div>
                      </div>}

                  </div>
                </div>

                : null}
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
          <div className='centerImageSection'>
            <div className="centerImage" >
              <TransformWrapper>
                <TransformComponent>
                  <div className='rotate-div' id="rotateImage">
                    <img src={imageInCenter} />
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
            {imageInCenter && imageInCenter !== null ?
              <div className='belowCenterImage'>
                <div className='rotate-button' onClick={handleRotate}><FiRotateCw /></div>
              </div> : null}
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
    </>
  )
}

export default LeftCenterSection