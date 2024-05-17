/* eslint-disable */
import React from 'react'

function Handwritten(pops) {
    const { currentImgData } = pops;
    // const fullTextAnnotation = currentImgData?.responses && currentImgData?.responses[0].fullTextAnnotation;
    const fullText = currentImgData?.responses && currentImgData?.responses[0].fullTextAnnotation?.text;
    const handArray = fullText?.split("\n");

    return (
        <div className="tabParaData handwrittenData" id="tab-textdata-id">
            {/* {fullTextAnnotation?.pages?.map((page, index) =>
                <div key={index} className="handwrittenPages paragraphMain">
                    {page?.blocks?.map((block, index2) =>
                        <div key={index2} className="handwrittenBlocks">
                            {block?.paragraphs?.map((paragraph, index3) =>
                                <div key={index3} className="paraText">
                                    <div className="paraRole">
                                        <strong>Paragraph</strong>
                                    </div>
                                    <div className="handwrittenParas">
                                        {paragraph?.words?.map((word, index4) =>
                                            <div key={index4} className="handwrittenWords">
                                                {word?.symbols?.map(s => s.text)?.join('')}
                                            </div>)}
                                    </div>
                                </div>)}
                        </div>)}
                </div>)} */}
            <div className="handwrittenPages paragraphMain">
                {handArray?.map((para, index) => {
                    return <div className="handwrittenBlocks" key={index}>
                        <div className="paraText">
                            <div className="paraRole">
                                <strong>Paragraph</strong>
                            </div>
                            <div className="handwrittenParas">
                                {para}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Handwritten