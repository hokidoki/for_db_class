import firebase from 'firebase';
import uuid from 'uuid';

export function getStoreImageUrl(dataUrl){

    const fileName = uuid.v1();
    let extension = dataUrl.src.split(';')[0].split('/')[1];
    switch(extension){
        case '/' :
            extension = 'JPG'; break;
        case 'p' :
            extension = 'png'; break;
        case '/r' :
            extension = 'gif'; break;
        case 'u' :
            extension = 'webp'; break;
        default : 
            extension = '?' ; break;
    }

    const docName =`${fileName}.${extension}`;
    return new Promise((resolve)=>{
        let articleRef = firebase.storage().ref().child(docName);
        articleRef.putString(dataUrl.src,'data_url').then((snapShot) =>{
            resolve(snapShot.ref.getDownloadURL());
        })
    });
}