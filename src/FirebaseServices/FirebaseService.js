import { 
    collection, 
    doc, 
    getDocs,
    setDoc }                from "firebase/firestore";
import { database }         from "./FirebaseConfig";
import * as FB_COLLECTION   from "./firebaseContext";

export const getSliderImagesByID = async (renderType) => {
    console.log("--Get Slider Image from Firestore--");
    const sliderImageDocs = await getDocs(FB_COLLECTION.SLIDER_COLLECTION);
    const sliderImageData = sliderImageDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));
    const listImageByID = sliderImageData.find(item => item.id === 'SIDOC001');
    
    switch(renderType) {
        case 'web'   : return listImageByID.webImage;
        case 'mobile': return listImageByID.mobileImage;
        default: ;break;
    }
}

export const getCompanyInformation = async (langType) => {
    console.log("--Get company information from Firestore--");
    const companyDocs  = await getDocs(FB_COLLECTION.COMPANY_COLLECTION);
    const companyData  = companyDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));
    const companyInfoItem = companyData.find(item => item.id === 'ZdlU4ylZRxeoPTlnMg4D');

    var companyInfoByLang = {};
    switch(langType) {
        case 'vn': 
            companyInfoByLang.companyName           = companyInfoItem.companyName.vnCompName;
            companyInfoByLang.companyBusiness       = companyInfoItem.companyBusiness.vnCompBusiness;
            companyInfoByLang.companyIntroduction   = companyInfoItem.companyIntroduction.vnCompIntro;
            companyInfoByLang.companyEmail          = companyInfoItem.companyEmail;
            companyInfoByLang.companyPhone          = companyInfoItem.companyPhone;
            companyInfoByLang.companyAddress        = companyInfoItem.companyAddress.vnCompAddress;
            companyInfoByLang.openTime              = companyInfoItem.openTime;
        ;break;
        case 'en': 
            companyInfoByLang.companyName           = companyInfoItem.companyName.enCompName;
            companyInfoByLang.companyBusiness       = companyInfoItem.companyBusiness.enCompBusiness;
            companyInfoByLang.companyIntroduction   = companyInfoItem.companyIntroduction.enCompIntro;
            companyInfoByLang.companyEmail          = companyInfoItem.companyEmail;
            companyInfoByLang.companyPhone          = companyInfoItem.companyPhone;
            companyInfoByLang.companyAddress        = companyInfoItem.companyAddress.enCompAddress;
            companyInfoByLang.openTime              = companyInfoItem.openTime;
        ;break;

        default:  ;break;
    }
    return companyInfoByLang;
}

export const getAboutUs = async (langType) => {
    console.log("--Get About Us Collection from Firestore--");
    const aboutUsDocs  = await getDocs(FB_COLLECTION.ABOUT_US_COLLECTION);
    const aboutUsData  = aboutUsDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));
    
    const aboutUsInfoItem = aboutUsData.find(item => item.id === '5dLtfrHfDpLPyetHDJuK');
    
    var aboutUsInfoByLang = {};
    aboutUsInfoByLang.docID = aboutUsInfoItem.id;
    switch(langType) {
        case 'vn': 
            aboutUsInfoByLang.aboutUsImage = aboutUsInfoItem.aboutUsImage;
            aboutUsInfoByLang.aboutUsIntro = aboutUsInfoItem.aboutUsIntro.vnAboutUsIntro;
        ;break;
        case 'en': 
            aboutUsInfoByLang.aboutUsImage = aboutUsInfoItem.aboutUsImage;
            aboutUsInfoByLang.aboutUsIntro = aboutUsInfoItem.aboutUsIntro.enAboutUsIntro;
        ;break;

        default:  ;break;
    }
    return aboutUsInfoByLang;
}

export const getTopicAboutUs = async (langType) => {

    console.log("--Get Topic About Us Collection from Firebase--");
    const aboutUsDocs  = await getDocs(FB_COLLECTION.ABOUT_US_COLLECTION);
    const aboutUsData  = aboutUsDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));
    
    const aboutUsInfoItem = aboutUsData.find(item => item.id === '5dLtfrHfDpLPyetHDJuK');
    const aboutUsTopicData = aboutUsInfoItem.aboutUsTopic;

    var tempTopicArr = [];
    for(let idx = 0; idx < aboutUsTopicData.length; idx++) {

        let tempTopicObj = {};

        switch(langType) {
            case 'vn': 
                tempTopicObj.topicImage     = aboutUsTopicData[idx].auTopicImage;
                tempTopicObj.topicTitle     = aboutUsTopicData[idx].auTopicTitle.vnTopicTitle;
                tempTopicObj.topicContent   = aboutUsTopicData[idx].auTopicContent.vnTopicContent;
            ;break;
            case 'en':
                tempTopicObj.topicImage     = aboutUsTopicData[idx].auTopicImage;
                tempTopicObj.topicTitle     = aboutUsTopicData[idx].auTopicTitle.enTopicTitle;
                tempTopicObj.topicContent   = aboutUsTopicData[idx].auTopicContent.enTopicContent;
            ;break;
            default: 
            ;break;
        }
        tempTopicArr.push(tempTopicObj);
    }
    return tempTopicArr;
}

export const getProjects = async (projectType, langType) => {
    console.log('--Get Projects Collection from Firestore--');
    const projectsDocs = await getDocs(FB_COLLECTION.PROJECTS_COLLECTION);
    const projectsData = projectsDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));

    for(let idx = 0; idx < projectsData.length; idx++) {

        switch(langType) {
            case 'vn': 
                projectsData[idx].proIntro = projectsData[idx].proIntro.vnProIntro;
            ;break;
            case 'en': 
                projectsData[idx].proIntro = projectsData[idx].proIntro.enProIntro;
            ;break;
            default: 
                projectsData[idx].proIntro = projectsData[idx].proIntro.vnProIntro;
            ;break;
        }
    }

    if(projectType === undefined || projectType === '' || projectType.length <= 0) {
        return projectsData;
    } else {
        return projectsData.filter(item => item.proType === projectType); 
    }
}

export const getProjectByID = async (props) => {
    console.log('--Get Projects Item from Firestore--');
    const projectsDocs = await getDocs(FB_COLLECTION.PROJECTS_COLLECTION);
    const projectsData = projectsDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return projectsData.find(item => item.id === props.proDocumentID);
}

export const getServices = async (servicesType, langType) => {
    console.log('--Get Services Collection from Firestore--');
    const servicesDocs = await getDocs(FB_COLLECTION.SERVICES_COLLECTION);
    const servicesData = servicesDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));

    for(let idx = 0; idx < servicesData.length; idx++) {
        switch(langType) {
            case 'vn': 
                servicesData[idx].serName   = servicesData[idx].serName.vnSerName;
                servicesData[idx].serIntro  = servicesData[idx].serIntro.vnSerIntro;
            ;break;
            case 'en': 
                servicesData[idx].serName   = servicesData[idx].serName.enSerName;
                servicesData[idx].serIntro  = servicesData[idx].serIntro.enSerIntro;
            ;break;
            default: 
                servicesData[idx].serName   = servicesData[idx].serName.vnSerName;
                servicesData[idx].serIntro  = servicesData[idx].serIntro.vnSerIntro;
            ;break;
        }
    }

    if(servicesType === undefined || servicesType === '' || servicesType.length <= 0) {
        return servicesData;
    } else {
        return servicesData.filter(item => item.serType === servicesType); 
    }
}

export const getServiceByID = async (props, langType) => {
    console.log('--Get Service Item from Firestore--');
    const servicesDocs = await getDocs(FB_COLLECTION.SERVICES_COLLECTION);
    const servicesData = servicesDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));

    var getServiceItemByLang = servicesData.find(item => item.id === props.serDocumentID);
    var serDetailTempArr = [];

    switch(langType) {
        case 'vn': 
            getServiceItemByLang.serName    = getServiceItemByLang.serName.vnSerName;
            getServiceItemByLang.serIntro   = getServiceItemByLang.serIntro.vnSerIntro;
            getServiceItemByLang.serContent = getServiceItemByLang.serContent.vnSerContent;
            getServiceItemByLang.serDetail.forEach(element => {
                serDetailTempArr.push(element.vnSerDetail)
            });
            getServiceItemByLang.serDetail = serDetailTempArr;
        ;break;
        case 'en': 
            getServiceItemByLang.serName    = getServiceItemByLang.serName.enSerName;
            getServiceItemByLang.serIntro   = getServiceItemByLang.serIntro.enSerIntro;
            getServiceItemByLang.serContent = getServiceItemByLang.serContent.enSerContent;
            getServiceItemByLang.serDetail.forEach(element => {
                serDetailTempArr.push(element.enSerDetail)
            });
            getServiceItemByLang.serDetail = serDetailTempArr;
        ;break;
        default:    
            getServiceItemByLang.serName    = getServiceItemByLang.serName.vnSerName;
            getServiceItemByLang.serIntro   = getServiceItemByLang.serIntro.vnSerIntro;
            getServiceItemByLang.serContent = getServiceItemByLang.serContent.vnSerContent;
            getServiceItemByLang.serDetail.forEach(element => {
                serDetailTempArr.push(element.vnSerDetail)
            });
            getServiceItemByLang.serDetail = serDetailTempArr;
        ;break;
    }
    return getServiceItemByLang;
}

export const getBlogs = async (blogType, langType) => {
    console.log('--Get Blogs Collection from Firestore--');
    const blogsDocs = await getDocs(FB_COLLECTION.BLOGS_COLLECTION);
    const blogsData = blogsDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));

    for(let idx = 0; idx < blogsData.length; idx++) {
        switch(langType) {
            case 'vn': 
                blogsData[idx].blogName = blogsData[idx].blogName.vnBlogName;
            ;break;
            case 'en': 
                blogsData[idx].blogName = blogsData[idx].blogName.enBlogName;
            ;break;
            default: 
                blogsData[idx].blogName = blogsData[idx].blogName.vnBlogName;
            ;break;
        }
    }

    if(blogType === undefined || blogType === '' || blogType.length <= 0) {
        return blogsData;
    } else {
        return blogsData.filter(item => item.blogType === blogType); 
    }
}

export const getArticleByID = async (props, langType) => {
    console.log('--Get Article Item from Firestore--');
    const blogsDocs = await getDocs(FB_COLLECTION.BLOGS_COLLECTION);
    const blogsData = blogsDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));

    var getArticleItemByLang = blogsData.find(item => item.id === props.blogDocumentID);
    var artDetailTempArr = [];
    switch(langType) {
        case 'vn': 
            getArticleItemByLang.blogName    = getArticleItemByLang.blogName.vnBlogName;
            getArticleItemByLang.articleList.forEach(element => {
                let articleItem = {};
                articleItem.articleTitle = element.articleTitle.vnTitle;
                articleItem.articleContent = element.articleContent.vnContent;
               
                artDetailTempArr.push(articleItem)
            });
            getArticleItemByLang.articleList = artDetailTempArr;
        ;break;
        case 'en': 
            getArticleItemByLang.blogName  = getArticleItemByLang.blogName.enBlogName;
            getArticleItemByLang.articleList.forEach(element => {
                let articleItem = {};
                articleItem.articleTitle = element.articleTitle.enTitle;
                articleItem.articleContent = element.articleContent.enContent;
               
                artDetailTempArr.push(articleItem)
            });
            getArticleItemByLang.articleList = artDetailTempArr;
        ;break;
        default:    
            getArticleItemByLang.blogName  = getArticleItemByLang.blogName.vnBlogName;
            getArticleItemByLang.articleList.forEach(element => {
                let articleItem = {};
                articleItem.articleTitle = element.articleTitle.vnTitle;
                articleItem.articleContent = element.articleContent.vnContent;
               
                artDetailTempArr.push(articleItem)
            });
            getArticleItemByLang.articleList = artDetailTempArr;
        ;break;
    }
    return getArticleItemByLang;
}

export const getNewSletterEmails = async () => {
    const newSletterEmailsDoc = await getDocs(FB_COLLECTION.NEWSLETTER_COLLECTION);
    const newSletterData      = newSletterEmailsDoc.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return newSletterData;
}

export const getNewSletterEmailByEmail = async (inputEmail) => {
    const newSletterEmailsDoc = await getDocs(FB_COLLECTION.NEWSLETTER_COLLECTION);
    const newSletterData      = newSletterEmailsDoc.docs.map((doc) => ({...doc.data(), id: doc.id}));
    const newSletterResult    = newSletterData.find(item => item.newSletterEmail === inputEmail);
   
    if(newSletterResult !== undefined) {
        return newSletterResult.newSletterEmail;
    } else {
        return undefined;
    }
}

export const postNewSletterEmail = async (newSletterObject) => {

    var newDate     = new Date();
    var formatDate  = `${newDate.getFullYear()}-${(newDate.getMonth()+1)}-${newDate.getDate()}`;
    var formatTime  = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    const currDate  = `${formatDate}   ${formatTime}`;
    newSletterObject.timeCreateEmail = currDate;
    

    const sendNewSletterEmail = doc(FB_COLLECTION.NEWSLETTER_COLLECTION);
    //add newsletter email into newsletter collection
    await setDoc(sendNewSletterEmail, newSletterObject);

    return newSletterObject;
}

export const postContactConsultant = async (customerInfo, supportContent, customerID) => {
    var newDate     = new Date();
    var formatDate  = `${newDate.getFullYear()}-${(newDate.getMonth()+1)}-${newDate.getDate()}`;
    var formatTime  = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
    const currDate  = `${formatDate}   ${formatTime}`;
    supportContent.requestTime = currDate;

    const contactConsultantDoc  = await getDocs(FB_COLLECTION.CONTACT_CONSULTANT_COLLECTION);
    const contactConsultantData = contactConsultantDoc.docs.map((doc) => ({...doc.data(), id: doc.id}));
   
    const checkCustomerID = contactConsultantData.find(item => item.id === customerID);

    const SUPPORT_CONTENT_URL = `contactConsultant/${customerID}/supportContent`;
    const SUPPORT_CONTENT_COL = collection(database, SUPPORT_CONTENT_URL);

    if( checkCustomerID === undefined ) {
        /*if email is not exits */
        console.log(`${customerID} is not exist`);

        const newCustomerContactID  = doc(database, 'contactConsultant', customerID);
        const newSupportContent     = doc(SUPPORT_CONTENT_COL);
        
        await setDoc(newCustomerContactID   , customerInfo);
        await setDoc(newSupportContent      , supportContent);
        
        return `Created new customer contact with ID: ${customerID} and firs supportContent document ID: ${newSupportContent.id}`;

    } else {

        /*if email is exits */
        console.log(`${customerID} is existed`);

        const newSpContentCol       = collection(database, SUPPORT_CONTENT_URL);
        const newSupportContent     = doc(newSpContentCol);

        await setDoc(newSupportContent, supportContent);
        return `create new supportContent Document ID: ${newSupportContent.id} in customer contact ID: ${customerID}`;
    }
}