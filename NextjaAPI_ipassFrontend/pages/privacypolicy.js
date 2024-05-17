/* eslint-disable */
import React, { useRef } from "react";
import Link from 'next/link'
import Logo from '../public/images/logo.png'

function PrivacyPolicy() {
    if (typeof window !== "undefined") {
        document.body.classList.remove('dashboard-custom-body')
        }
    const nutRef = useRef(null)
    const defRef = useRef(null)
    const PrinciplesRef = useRef(null)
    const PersonalRef = useRef(null)
    const ProcessingRef = useRef(null)
    const ProvisionRef = useRef(null)
    const RelationRef = useRef(null)
    const DisclosureRef = useRef(null)
    const SecurityRef = useRef(null)
    const RetentionRef = useRef(null)
    const ChildrenRef = useRef(null)
    const JurisdictionRef = useRef(null)
    const ipassRef = useRef(null)
    const ImportantRef = useRef(null)
    const ContactRef = useRef(null)
    const AvailabilityRef = useRef(null)

    const handelNutshell = () => nutRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelDefination = () => defRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelPrinciples = () => PrinciplesRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelPersonal = () => PersonalRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelProcessing = () => ProcessingRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelProvision = () => ProvisionRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelRelation = () => RelationRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelDisclosure = () => DisclosureRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelSecurity = () => SecurityRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelRetention = () => RetentionRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelChildren = () => ChildrenRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelJurisdiction = () => JurisdictionRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelipass = () => ipassRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelImportant = () => ImportantRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelContact = () => ContactRef.current.scrollIntoView({ behavior: 'smooth' })
    const handelAvailability = () => AvailabilityRef.current.scrollIntoView({ behavior: 'smooth' })
    return (
        <div className="privacypolicy-main">
            <header>
                <div className="headerAdmin">
                    <img src={Logo.src} />
                </div>
            </header>
            <div className="privacypolicy-main-inner">
                <div className="privacypolicy-points-left">
                    <div className="privpol-points-inner">
                        <ul>
                            <li>Privacy Policy</li>
                            <li onClick={handelNutshell}>1. In short, our privacy policy</li>
                            <li onClick={handelDefination}>2. Definitions</li>
                            <li onClick={handelPrinciples}>3. Our Key Privacy Principles</li>
                            <li onClick={handelPersonal}>4. Content of Personal Data We Process</li>
                            <li onClick={handelProcessing}>5. Legal bases and purposes of processing </li>
                            <li onClick={handelProvision}>6. Service and process development and provision (automated processing and decision making)</li>
                            <li onClick={handelRelation}>7.Rights of the data subject in relation to personal data</li>
                            <li onClick={handelDisclosure}>8. Disclosure and transfer of personal data</li>
                            <li onClick={handelSecurity}>9. Personal data security</li>
                            <li onClick={handelRetention}>10. Retention of personal data</li>
                            <li onClick={handelChildren}>11.Children's Personal Data</li>
                            <li onClick={handelJurisdiction}>12. Jurisdiction-Specific Notices</li>
                            <li onClick={handelipass}>13. Demo application I passed and session flow test I succeeded</li>
                            <li onClick={handelImportant}>14. Important Documents, Guidelines and Procedures</li>
                            <li onClick={handelContact}>15. Details and contact information</li>
                            <li onClick={handelAvailability}>16.Availability and Privacy Policy Changes</li>
                        </ul>
                    </div>
                </div>
                <div className="privpol-right-info">
                    <div className="privpol-right-inner">
                        <h1>Privacy Policy</h1>
                        <p>Spent learning about our policy on
                            Privacy (Privacy Policy). I succeeded as a specialist in providing online services
                            Identification services. We consider ourselves the new standard in
                            Identity verification, we allow our contractual parties to verify
                            Your identity document, for example a driver's license, passport or ID card
                            (defined below).</p>
                    </div>
                    <h2 ref={nutRef}>1. In short, our privacy policy</h2>
                    <h4>Here's information about this policy in a nutshell.</h4>
                    <p> These, we explain how and on what basis we collect,
                        Storage and processing of personal data of data subjects, i.e. our customers
                        Representatives, Users, Visitors and Visitors to the Office
                        (See definitions below). We also explain the rights of data subjects
                        It is our obligations and responsibilities.</p>
                    <p>Basic users' information as directed by our customers for
                        Provide our services. Our customers are the data controllers who determine
                        Purpose of processing personal data, and accordingly, I have succeeded
                        It is a data processor
                        User information in connection with those services. In other cases, I succeeded
                        is data
                        Controller of user information (eg in relation to visitors to a web page I have succeeded).
                        We may also process certain information about data subjects in an anonymous form to
                        Develop and improve our services and other stated forms and purposes
                        in this privacy policy.</p>
                    <p>1.3 To fully understand how personal data is processed, the data subject
                        The privacy notices shared with users must be reviewed by the privacy policies and I succeeded
                        From those clients whose services have been verified.</p>
                    <p>1.4 Please review this Privacy Policy carefully and contact us
                        Protection Officer (DPO) in
                        If you have any comments, questions or concerns. Contact details are in Chapter 15. </p>
                    <p>1.5 Privacy Policy Content:</p>
                    <p>1.5.1 Our Privacy Policy in a nutshell</p>
                    <p>1.5.2 Definitions</p>
                    <p>1.5.3 Our Key Privacy Principles</p>
                    <p>1.5.4 Content of Personal Data We Process</p>
                    <p>1.5.5 Purpose of processing and legal basis for processing to provide services</p>
                    <p>1.5.6 Service Process (Automated Processing)</p>
                    <p>1.5.7 Rights of the data subject in relation to personal data</p>
                    <p>1.5.8 Disclosure and Transfer of Personal Data</p>
                    <p>1.5.9 Personal Data Security</p>
                    <p>1.5.10 Retention of personal data</p>
                    <p>1.5.11 Children's Personal Data</p>
                    <p>1.5.12 Jurisdiction-Specific Notices</p>
                    <p>1.5.13 I Passed Demo Application and Test Flow Session I Passed</p>
                    <p>1.5.14 Important Documents, Guidelines and Procedures</p>
                    <p>1.5.15 Details and contact information</p>
                    <p>1.5.16 Availability and Privacy Policy Changes</p>
                    <p>---------------------------------------------------</p>
                    <h2 ref={defRef}>2. Definitions</h2>
                    <h4>Here you can find the meanings of the most important terms in this Privacy Policy
                        A policy to help you understand how and why we process your personal data
                        Data</h4>
                    <ul>
                        <li><strong>Agreement</strong>
                            &#45;Service agreement with the customer, including service agreements for trials
                        </li>
                        <li><strong>Data Providers</strong>
                            &#45; These are the third party service providers or public authorities we use
                            Gather additional information for verification. For example, we may check
                            Information provided by the user against the official public record or any other fraud
                            prevention services.
                        </li>
                        <li><strong>Data Controller</strong>
                            &#45;
                        </li>
                        <li><strong></strong>
                            &#45; A legal person, public authority, agency or other body, alone or
                            Together with others, it defines the purposes and means of processing
                            personal data and give instructions regarding processing activities to I succeeded,
                            Unless I succeeded as a data controller.
                        </li>
                        <li><strong>Data Wizard</strong>
                            &#45;I have handled personal data on behalf of the data controller, unless I have succeeded acting as a data controller.
                        </li>
                        <li><strong>Data Subject/You</strong>
                            &#45; A natural person for whom we have information or data that enables
                            Identification of a natural person. Data subjects are our clients' representatives,
                            Users, our (potential) employees, visitors, office visitors, natural persons who
                            Provide us with comments (including other data related to research and inquiries) and others
                            Natural persons whose personal data we may process (within the limits of such natural persons
                            is aware of or is aware of such processing).
                        </li>
                        <li><strong>Beta App</strong>
                            &#45;The I Passed owned app, which can be downloaded in the App Store or Google Play, which allows testing of the I Passed verification flows
                            as a normal person.
                        </li>
                        <li><strong>European Economic Area</strong>
                            &#45;European Economic Area (EU member states, Norway, Iceland and Liechtenstein).
                        </li>
                        <li><strong>General Data Protection Regulation</strong>
                            &#45;EU General Data Protection Regulation No. 2016/679.
                        </li>
                        <li><strong>Customer</strong>
                            &#45; The legal entity to whom we provide our services under the Agreement, a client I succeeded
                            .
                        </li>
                        <li><strong>Personal Data</strong>
                            &#45; any information relating to an identified or identifiable natural person (the data subject); An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more specific factors of physical, physiological, genetic, identity mental, economic, cultural or social status of that natural person.
                        </li>
                        <li><strong>Privacy Policy</strong>
                            &#45; This Privacy Policy.

                        </li>
                        <li><strong>Treat</strong>
                            &#45; Any operation or combination of operations performed on personal data or
                            on collections of personal data, whether by automated means or not, such as collection,
                            Recording, organizing, structuring, storing, adapting or changing, retrieval
                            or consultation, use or disclosure by transmission, posting or in any other way
                            Available, align or combine, restrict, erase or destroy.
                            Processing can be done manually or using automated systems.
                        </li>
                        <li><strong>Therapist / our / us / we</strong>
                            &#45; I succeeded
                            OÜ, registration code 12932944, Nyen 11, Tallinn, 10414, e-mail:
                           
                            Our data protection officer                            
                        </li>
                        <li><strong>Services</strong>
                            &#45;Personal identity verification and related services we provide (such as fraud prevention and persistent authentication).
                        </li>
                        <li><strong>User</strong>
                            &#45;The natural person for whom we provide the service upon request
                            The customer and the natural person who contacts us as the customer's representative
                            before concluding the agreement.
                        </li>
                        <li><strong>visitor</strong>
                            &#45; Is anyone using the site I succeeded.
                        </li>
                        <li><strong>Office Visitor</strong>
                            &#45; - Is anyone visiting office buildings I succeeded.
                        </li>
                        <li><strong>Political Exposed Person (PEP)</strong>
                            &#45; Politically exposed person, including family members and close associates
                            Partners in accordance with applicable legal procedures in connection with the ban
                            Money laundering or terrorist financing (such as a natural person who is or
                            who has been assigned prominent public functions, for example Member of Parliament
                            or from a similar legislative body, a member of a political management body
                            party, member of the Supreme Court).
                        </li>
                        <li><strong>Website</strong>
                            &#45;
                        </li>
                    </ul>
                    <h2 ref={PrinciplesRef}>3. Our Key Privacy Principles</h2>
                    <h4>Here you can find the privacy principles we follow when processing personal data.</h4>
                    <p>We follow what we call the Six Fundamentals, i.e. six principles relating to I have succeeded data processing activities
                        : </p>
                    <p> (1) First, we process personal data <strong> in a reliable and confidential manner</strong>
                        . We respect each person's right to protect their personal data and will do everything we can to ensure that the personal data we collect is well protected. We regularly assess the risks associated with the processing of personal data and will apply appropriate mitigation strategies to hedge the risks.
                    </p>
                    <p> (2) Second, <strong> data protection is an integral part of our service</strong>
                        . All our services are developed and published by dedicating principles
                        Privacy by design and privacy by default overseen by our data protection
                        officer. Privacy Policy compliance is built into our daily business
                        Activities, services, operations and our development efforts. We understand
                        Data protection rules are complied with by our employees.
                        Therefore, we consider it important and we must make sure that our employees know about it
                        and adherence to its requirements. We expect, guide and train
                        Staff to respect our privacy requirements.
                    </p>
                    <p>(3) Third, <strong> We process personal data lawfully and purposefully</strong>
                        . We set clear objectives for the processing of personal data and the processing of personal data
                        The data is for these purposes only. We do not collect or process the data that we do
                        no need. I succeeded
                        Has the right to delete / obliterate or make other methods unreadable
                        Statements/documents presented at the session which are not necessary for the I succeeded protocol
                        The provision of services. It also means that we never sell personal data and all transfers
                        of personal data must have a valid legal basis.
                    </p>
                    <p> (4) Fourth, <strong> we process personal data in a transparent and fair manner</strong>
                        . We guarantee an appropriate, safe, honest and legal method of processing
                        Personal data to prevent unauthorized disclosure or inappropriate use of it
                        Personal Data. We also work to eliminate the possibility of discrimination or
                        Bias in our service.
                    </p>.
                    <p> (5) Fifthly, <strong> We only store personal data for as long as
                        Data retention required </strong>
                        By law, contract, or necessary to provide our Services or
                        It is required to protect us from legal claims. At the end of keep
                        period, we will permanently erase or anonymize personal data.
                    </p>
                    <p>(6) Sixth, <strong> We are doing our best to make sure that
                        The personal data we process is accurate </strong>
                        It is limited to what is necessary.
                    </p>
                    <h2 ref={PersonalRef}> 4. Content of the personal data we process </h2>
                    <h4> Here you can find the personal data we process about users and customers
                        Representatives, visitors and visitors to the office. </h4>
                    <p> <strong> 4.1 Personal data we process about Users. </strong> We offer
                        Personal identity verification services for clients. This means we are checking
                        Therefore, you (i.e. the user) acknowledge that the data has been processed
                        In accordance with the customer privacy policy and data processing by us at
                        in accordance with this Privacy Policy. We may collect and process, among others
                        Other data, the following personal data: </p>
                    <p> (2) Document details, such as document name, country of issue, number, expiration date, information contained in document barcodes (may vary depending on the document) and security features; </p>
                    <p>(3) Verification data, such as <strong>, </strong> photos, videos, audio recordings, photos taken from you, document, videos and audio recordings of the verification process; </p>
                    <p>(4) contact details, such as address, email address, phone numbers, IP address and, if appropriate, the type of document submitted (such as a utility bill); </p>
                    <p> (5) technical data <strong> </strong> (<em>device signature</em>) <strong>,  </strong> including but not limited to information regarding the date and time, your activity on the Services, IP address, domain name, software and hardware characteristics as well as your general geographic location (<em> as </em> city, state, country); </p>
                    <p> (6) Biometric data, such as face scans and other measurements, extracted from user photos and videos and used for user authentication or comparison of the user's face with images of identity documents; </p>
                    <p> (7) relevant publicly available data, for example information about him being a prominent political person (Tallinn) and verification of public sanctions lists; </p>
                    <p> (8) personal information provided by the User, for example data from communications with us, feedback data; </p>
                    <p> (9) Personal information provided by natural persons who have participated in our products and market research initiatives; </p>
                    <p> (10) personal information we have received from the customer, for example contact details; </p>
                    <p> 4.2 How do we obtain personal user data. We may obtain personal data directly from you and the customer. We will also look at identifying signs of fraud based on an internal fraud framework and advanced fraud prevention and detection techniques. Based on the authorization we receive from the customer, we also collect your personal data independently of the data providers, for example. To provide our services in a trust-based relationship and to prevent fraud. For example, if we need to validate
                        We may inquire about additional information from the appropriate registrar or from other customer-directed fraud prevention services. </p>
                    <p> 4.3 In some cases, we may also check whether we have previously verified a user on behalf of the same client or a different client by comparing the session to the previous session. This not only helps our customers verify identities, but also gives them and their users more protection by helping them understand when a user might create multiple identities, tamper with documents, or tamper with device or network information. To do all this, we closely examine user-supplied information, including machine-readable data, metadata, and device and network information. </p>
                    <p>4.4 Likewise, for fraud prevention and detection purposes, we may also collect information about compromised identities, for example photos, device or network information that has been leaked, or used to commit repeated fraud via the I Success Service
                        .</p>
                    <p>4.5 We also provide continuous authentication services to our clients. This means that we may use a user's biometric data and other documents to verify a user's identity on an ongoing basis, for example, to grant a user access to our customer services, among other authentication use cases as specified by our customer.</p>
                    <p> 4.6 Customers can access your personal data. We may share your personal data, including identity verification data, with the customer through whom you have used the identity verification service. </p>
                    <p> 4.7 Please note that providing your personal data is optional. However, a decision not to do so may mean that we are unable to verify your identity. </p>
                    <p> <strong> 4.8 Personal data we process about a customer representative. </strong> To enter into the agreement, to provide our service, to communicate with a representative of our customer and for other legal reasons we need to process the data of a customer representative. This means that we may process, among other information, the following personal data of a customer representative: </p>
                    
                    We only process the following personal data about you:
                    <p>(1) name; </p>
                    <p>(2) E-mail address;</p>
                    <p> (3) an image, if you agree to disclose it on   
                    </p>
                    <p> 4.13 <strong> The purpose of processing with the help of cookies and similar technologies. </strong> We use the collected data to enable the provision of the Service in accordance with the habits of the visitor/user, to ensure the best quality of the Service, to inform the visitor of contents and make recommendations, to update advertisements and to make marketing efforts more efficient. The collected data is also used to calculate visitors/users and record their habits. Read more from
                       </p>
                    <p> 4.14 <strong> Personal data we process in connection with the beta application and test flow session I Passed
                        . </strong> If you decide to download and use the application I succeeded
                        Demo or test I passed
                        & #44; s session In our website, we may record audio, video and technical information of the session as described in clause 4.1 (for more details see Section 13 of this Privacy Policy). </p>
                    <p>4.15 <strong> Personal data that we process relating to visitors to our office. </strong> If you visit the office buildings and workplaces of I succeeded
                        This means that we may process, among other information, the following personal data about you:</p>
                    <p>(1) name; </p>
                    <p>(2) email address; </p>
                    <p>(3) photos; </p>
                    <p>(4) photos taken by video surveillance equipment; </p>
                    <p> (5) During the spread of COVID-19
                        Evidence of COVID-19 vaccination, valid negative test result or recovery certificate. </p>
                    <h2 ref={ProcessingRef}> 5. Legal bases and purposes of processing </h2>
                    <h4> Here you can read why and on what basis your personal data is being processed. </h4>
                    <p>5.1 <strong>Service Delivery</strong>. With regard to personal data about users, the main purpose of processing I succeeded
                        is to verify your identity to our customers, and for this purpose, we take photos and videos (if applicable) of the verification session, document(s) provided for verification and biometric data (i.e. identifiers and information). In addition, for verification, we conduct fraud prevention and detection checks which are an integral part of our Service. The results of the identification process are categorized with information about completed verifications as approved, resubmission required, or rejected. </p>
                    <p> 5.2 We or our client may ask you to give us <strong> consent to process</strong>. Please note that we cannot provide the Service in relation to an anonymous user, and therefore the use of our Service is subject to disclosure of personal data to us and consent to the processing of personal data by the customer and us. However, giving consent is voluntary, but failure to do so may mean that we may not be able to provide you with the Service. For example, we will not be able to verify your identity. In some circumstances, for example for the purpose of automated decision making, you may be required to provide us with express consent. If you have given the customer and/or consent from us to process personal data, the details of such operations and their purposes will be specified in the consent itself. </p>
                    <p> 5.3 Your consent is the legal basis for processing personal data when you share your findings regarding responsible disclosure. Please note that giving consent is voluntary and you have the opportunity to withdraw your consent at any time. Your name and/or photo will only be published on our website with your written consent. Read more about responsible disclosure     
                    </p>
                    It asks <p> 5.4 I succeeded
                        Consent of the customer representative prior to the audio and video recording of the customer representative’s call. The registry is used only for analytical purposes of the protocol I succeeded
                        And improve services and processes I succeeded
                        . Please note that giving consent is voluntary and you have the opportunity to withdraw your consent at any time. This does not apply if various communications (including video) are recorded for product and market research (see as described on page 5.7 (10)). </p>
                    <p> 5.5 If you want to download and use the demo app I succeeded
                        Or test session flow I passed
                        In our website, asks I succeeded
                        Agree before verifying your identity. This is for verification flow test purpose I passed
                        . Please note that giving consent is voluntary and you have the opportunity to withdraw your consent at any time. More information about the application can be found I succeeded
                        Demo in Chapter 13. </p>
                    <p> 5.6 We process your personal data primarily as a processor for the benefit of the customer in order to carry out the <strong> agreement with the customer</strong> for: </p>
                    <p> (i) the performance of the Agreement (including the provision of the Service); </p>
                    <h2 ref={ProvisionRef}> 6. Service development, processing and provision (automatic processing and decision making) </h2>
                    <h4> To verify your identity in a secure and less error-prone way, we use automated algorithms and machine learning in our service. Read about it in this section. </h4>
                    <p> 6.1 Machine learning helps to recognize patterns in information and make predictions about new sets of information based on those patterns. Algorithms are built, trained and tested on training sets consisting of real data. No biometric data such as biometric identifiers or biometric information is used to train machine learning training on I passed
                        . This processing is done solely for internal use to improve and develop our services and is performed solely on the contractual authorization received from our customers with the prior condition that a valid legal basis has been obtained. </p>
                    <p>used I succeeded
                        6.2 Also machine learning to provide services to our customers. Read more about Verify I Passed
                        In clause 6.8. </p>
                    <p> 6.3 represents I succeeded
                        The concept that machine learning is done in an ethical and trustworthy manner that respects human rights and freedoms. </p>
                    <p> 6.4 Machine learning as a tool will enable users to receive better, safer and faster services provided by I Succeed customers
                        It helps prevent and detect fraud. Datasets used for development, testing, and training are kept in separate, controlled, and highly secure data research environments. </p>
                    <p> 6.5 Machine learning is also the driving force behind innovation I Succeed
                        When improving our services, testing new features, and ensuring the quality of services. </p>
                    <p> 6.6 For the purposes of fraud prevention and detection, check I succeeded
                        Also whether the facial images show signs of fraud. To provide this scan quickly, in a secure and accurate manner, digital biometric data is extracted from previously collected facial images and device and network information is kept for a limited period of time as agreed with I Success clients
                        . For each verification session, captures I succeeded
                        A new image of the user's face and compares the data from the capture with the data we held for them. </p>
                    <p> 6.7 To further improve our Services, Service performance and feature testing (A/B tests) are used to analyze user experience and respond with respect to changes to the structure, script, or other feature of the Service.
                        . </p>
                    <p> 6.8 The verification process is either automated, semi-automated, or human-driven: </p>
                    <p> (1) <strong>Semi-automated validation</strong>. A human will be involved if the automated validator (robot) is unable to come to a decision on its own. This may happen, when the image is blurry or the bot has some other difficulty parsing the verification session. The bot is constantly learning to give the correct meaning of information and detect fraud or theft in identification, and it does its best to make sure that you exist even in the online world. We hope that together with the combined power of robots and humans, we can make your identification and verification process as easy and secure as possible. </p>
                    <p> (2) In the event <strong>fully automated decision making</strong>, where the decision has a significant impact on you, we will be transparent about this processing. When fully automated decision-making is implemented, our client requests your explicit consent to do so and informs you of the automated processing. In some cases, when the Customer has other legal grounds for such processing, for example obligations under applicable law &# 45; Consent may not be required. You have the right to request information and an explanation regarding the reasoning behind the decision made by the bot; At any time, you will have the right to request human intervention or to object to a decision made on the grounds of your particular situation. </p>
                    <p>(3) We may have different solutions for processing with different clients, eg in some cases <strong> a validation session will only be analyzed by a person</strong>. </p>
                    <p> 6.9 We would like to point out that the decision as to whether the Customer provides its service to the User is made by the Customer. That is, even if the verification flow is fully automated, the result of the verification will be taken into account by the client to decide whether to provide the service or not. The verification results themselves - approved, resubmission required, or rejected - do not determine whether customer service is provided to the user. </p>

                    <h2 ref={RelationRef}> 7. Rights of the data subject in relation to personal data </h2>
                    <h4> Read about data protection rights. </h4>
                    <p> 7.1 If you wish to exercise any of your <strong> rights in relation to personal data</strong> or have questions about the Privacy Policy, please read more about your rights in Chapter 3 of the GDPR or send a similar request to us at                     
                        We will respond to your request by e-mail as a rule no later than one month. Please note that before we can provide you with the requested information regarding your personal data, we may need to verify your identity. Please also note that if your request relates to data that
                    </p>
                    <h2 ref={DisclosureRef}> 8. Disclosure and Transfer of Personal Data </h2>
                    <h4> In this section you will find information about the possibility of disclosure and transfer of your personal data. </h4>
                    <p> 8.1 <strong> Disclosure of personal data to authorities. </strong> Please note that due to legal requirements, we may be obligated to disclose or give access to your personal data to authorities and a supervisory authority (such as a court or government agency). </p>
                    <p> 8.2 <strong> Disclosure to Data Controllers and Data Processors. </strong> Unless otherwise set forth in this Privacy Policy or otherwise stated to you separately, we may disclose your Personal Data to data controllers for whom we process data (for example customers) and our authorized processors (sub-processors), as well as to persons who are legally authorized to receive your personal data. For example, personal user data, including biometric data, may be processed by authorized subprocessors that provide basic identity verification services to the
                         Personal data of a customer representative may be shared with our advertising and marketing partners, companies that conduct satisfaction surveys, debt collection agencies, credit registries, authorities and organizations that mediate or provide (electronic) mail, compliance or payment services and the like. Share with IT and security partners, provided: </p>
                    <p> (1) The intended purpose and processing are lawful; </p>
                    <p>(2) on ; We have seriously assessed that the authorized processor will comply with data protection requirements; </p>
                    <p>(3); Personal data is processed in accordance with our instructions and on the basis of a valid agreement. </p>
                    <p>(4) If you have questions about our approved processors, please contact us at                       
                    </p>
                    <p> 8.3 Please note that personal user data can only be shared with Ana Success processors
                        subsidiary as well as with persons legally authorized to receive your personal data, if there is a valid legal basis. </p>
                    <p> 8.4 <strong>Transfer of Personal Data</strong>. We process your personal data within the European Economic Area. In the event that we need to transfer your personal data outside the European Economic Area (for example to use sub-processors, services and technical infrastructure provided by or located in the United States or the United Kingdom), the transmission must be in accordance with the requirements, principles and safeguards set out in the GDPR, Such as relying on adequacy decisions issued by or standard contractual clauses approved by the European Commission. In cases where it works I succeeded
                        As a data controller, we provide further information about the applicable safeguards (if relevant) upon your request. </p>
                    <h2 ref={SecurityRef}> 9. Personal Data Security </h2>
                    <h4> Security is extremely important to us. We do our best to protect the personal data in our hands. </h4>
                    <p>9.1 We implement many <strong>commercially reasonable measures (physical, technical and organizational)</strong> to protect your personal data from unauthorized, arbitrary, disclosure, acquisition, destruction, loss, theft, misuse, alteration or unauthorized to access. </p>
                    <p>9.1 We implement many <strong>commercially reasonable measures (physical, technical and organizational)</strong> to protect your personal data from unauthorized, arbitrary, disclosure, acquisition, destruction, loss, theft, misuse, alteration or unauthorized to access. </p>
                    <h2 ref={RetentionRef}> 10.Retention of personal data </h2>
                    <h4> Here you can find our data retention principles which are the length of time we keep personal data. </h4>
                    <p> 10.1 To determine the appropriate <strong>retention period</strong>, we consider the amount, nature and sensitivity of Personal Data and the purposes for which we process it. We must also consider the periods during which we may need to retain personal data to fulfill our legal obligations or to deal with complaints or inquiries and to protect our legal rights in the event of claims. </p>
                    <p> 10.2 We will store your personal data for as long as or as required by law, or for the purposes set out in this Privacy Policy. </p>
                    <p> 10.3 We store Users Data for the period stipulated in the Agreement (we may have different data retention periods agreed with the Customer) or for as long as is necessary to enable us to create, exercise or defend legal action claims from Users, Customers or ourselves. </p>
                    <p> 10.4 We may store your personal data for a period longer than the term of the Agreement if we have a legal basis to do so, for example you have given us your consent to use your personal data to develop our services or we assess that we have a legitimate purpose to do so, for example in pseudonymous form or for the purpose of service history record. </p>
                    <p> 10.5 The personal data processed via the beta application is stored I passed
                        Or via flow session I succeeded
                        On our website, for up to one day. More information about the demo application can be found I succeeded
                        And test session flow I passed
                        In Chapter 13. </p>
                    <h2 ref={ChildrenRef}> 11. Children's Personal Data </h2>
                    <h4> Here you can find information about how we handle children's personal data. </h4>
                    <p> We may process the personal data of children (i.e. persons under 16 * years of age; *depending on the jurisdiction), the data controller shall take steps to ensure that there is consent to such processing from the guardian of that child. If we learn that we have collected the personal data of a child without a parent's consent, we will take steps to delete the information as soon as possible. </p>
                    <h2 ref={JurisdictionRef}> 12.Jurisdiction-Specific Notices</h2>
                    <h4> You may have different rights depending on where you live. Read about it in this section. </h4>
                    <p> 12.1 High quality services are provided to users all over the world by I Succeed
                        . In the event of any inconsistency or ambiguity between the terms of this section and any other part of this document, these terms shall control. </p>
                    <p> 12.2 <strong> Notice to Individuals Residing in California</strong> </p>
                    <p>12.3 For users residing in California, we must provide some additional information mentioned in this Privacy Policy: </p>
                    <p> (1) collects I succeeded
                        Basic information from visitors to our site and users regarding whom we provide the service at the request of our customers. Requires I succeeded
                        Only the minimum amount of personal information needed from you. Chapter 4 of the Privacy Policy introduces I succeeded
                        More details about I succeeded operations
                        personal information about you; </p>
                    <p>(2) With respect to data subject rights, California law permits California residents to request information about categories of personal information and specific personal information collected and the business purpose of collecting such information by contacting                       
                        or send it
                    </p>
                    <p> (3) does not reveal I succeeded
                        for any of your personal information or to verify your identity to any other party except for our customers who provide services to you and I handlers successfully
                        subsidiaries which are necessary to provide our services; </p>
                    <p> (4) Furthermore, <strong>no</strong> sell I succeeded
                        your personal information as defined by the California Consumer Privacy Act to third parties; </p>
                    <p> (5) Any questions or requests regarding the I passed processing will be directed
                        To your personal information in connection with your rights under the California Consumer Privacy Act with respect to the Services to a Customer I Succeed
                        who acts as a data controller for personal data about you. </p>
                    <p> 12.4 <strong> Notice to Individuals Residing in Illinois and Texas</strong> </p>
                    <p>(1) Illinois Biometric Information Privacy Act, 740 ILCS 14/1 et seq., and Texas Business and Commerce Act on Capture or Use of Biometric Identifiers, Tex. Bus. & Ampere ; Communications Code § 503.001 regulates the collection, storage, use and retention of biometric identifiers and information. Biometric ID means a retina or iris scan, a fingerprint, a voice print, or a hand or facial geometry scan. Biometric identifiers do not include writing samples, written signatures, photographs, human biological samples used in valid scientific examinations or examinations, demographic data, tattoo descriptions, or physical descriptions such as height, weight, hair color, or eye color. Biometric Information means any information, regardless of how it is captured, transferred, stored or shared, based on an individual's biometric identifier used to identify an individual. </p>
                    <p> (2) collects I succeeded
                        Biometric identifiers and certain biometric information, i.e. face scanning information (facial geometry information and information based on this), during the identity verification process. collect I succeeded
                        This information is used by us to verify your identity, prevent fraud and provide authentication services to our customers on an ongoing basis. </p>
                    <p>For Illinois residents, we will permanently destroy biometric identifiers and their biometric information when the initial purpose of collecting or obtaining such identifiers or information has been met or within 3 years of an individual's last interaction with clients I have succeeded
                        Whichever happens first. </p>
                    <p>For Texans, we will permanently destroy their biometric IDs later than (1) one year after the purpose of ID collection expires, or (2) one year after any record-keeping obligations imposed by law in connection with the expiration of any collection Biometric ID validity. </p>
                    <p>Except where prohibited by law, your biometric data can only be accessed by us and our service providers, who process your data only on our behalf to provide services. We do not share biometric data with any third party. May receive the client who handles I succeeded
                        Your data on his behalf Information about you, such as copies of the identity document and photo you have provided to us, and data that indicates whether we are able to identify and authenticate you, but we do not disclose your biometric data to clients. </p>
                    <p> By clicking on the relevant icons provided prior to the verification or validation process, and choosing to continue, you acknowledge and agree that you have read the relevant disclosures, and that you voluntarily consent to the collection of data that I have succeeded
                        storage, retention, use and disclosure of your biometric data. </p>
                    <p> (3) uses I succeeded
                        Industry reasonable standards of care to store, transfer and protect your vital data from disclosure, in a manner similar or more secure than the way you store, transmit, and protect confidential and/or other sensitive information. I succeeded
                        Do not sell, rent, trade or otherwise benefit from Biometric Data. </p>
                    <h2 ref={ipassRef}> 13. I passed the beta application and the session flow test I passed </h2>
                    <h4> Read about the session flow test I passed
                        . </h4>
                    <p> Allow 13.1 I succeeded app
                        Demo and website session flow Test and test flow Verify I passed
                        as an end user. Flow provides the experience that end users will have when integrating I succeeded
                        A client with I succeeded
                        . </p>
                    <p>13.2 Data processing classes are mentioned, which are processed by I succeeded
                        Through the demo application and through the web site session flow I succeeded
                        , in clause 4.11, the purposes of data processing are stated in clause 5.5 and the data retention conditions are explained in clause 10.5.</p>

                    <h2 ref={ImportantRef}> 14. Important Documents, Guidelines and Procedures</h2>
                    <h4> Here we specify all documents, actions and records, through which you will be able to exercise your rights in the best way, knowing how your personal data is stored and processed. </h4>
                    <p> 14.1 Our Privacy Policy is implemented on the basis of the following documents, guidelines and procedures: </p>
                    <p>(1) on recording of processing operations that specify the purposes and methods of processing personal data, the types and categories of personal data processed and the basis for the relevant processing;</p>
                    <p>(2)                       
                        sets the rules for how we use cookies and other web technologies;</p>
                    <p>(3)                       
                        Privacy Principles for Recruits and Employees. If you are a (potential) employee, please read your rights and our principles;</p>
                    <p>(4)The policy of organizational and technical measures which sets out the various measures we have taken to always maintain the confidentiality and security of personal data;</p>                   
                    <p>14.2 If you have questions, please contact us. </p>
                    <h2 ref={ContactRef}> 15. Contact details and information </h2>
                    <h4> Find here our contact details. </h4>
                    <p> Please review this Privacy Policy carefully and contact your Data Protection Officer (DPO) at                       
                        If you have any comments, questions or concerns. </p>
                    <h2 ref={AvailabilityRef}> 16. Availability and Privacy Policy Changes </h2>
                    <h4> Here you can find information about the changes made to the Privacy Policy and notify you of the changes. </h4>
                    <p> 16.1 This Privacy Policy is available on our website. </p>
                    <p> 16.2 Please note that we may amend the Privacy Policy from time to time. The revised Privacy Policy will be uploaded to our website and we may inform customers and users whose contact information we have about major changes to the Privacy Policy. </p>
                    <p> 16.3 You are encouraged to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy will take effect when they are posted on this page. </p>
                </div>
            </div>
        </div>
    )
}
export default PrivacyPolicy;