import axios from 'axios';
import * as Config from '../utils/Config'
    import {getDownloadURL, ref, uploadBytesResumable, deleteObject} from "@firebase/storage";
    import {storage} from "../utils/firebase";

    const uploadFiles = (file)=>{

        return new Promise((resolve,reject)=>{
            if(!file){
                return;
            }
            const storageRef = ref(storage, `/file/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on("state_changed", (snapshot) => {

                }, (err)=> console.log(err),
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url=>{
                            resolve(url);
                        })
                        .catch(err=>{
                            reject(err);
                        })
                }
            );
        })

    }

const deleteFile = (fileUrl) =>{

    return new Promise((resolve,reject)=>{
        const httpsReference = ref(storage,fileUrl);
        deleteObject(httpsReference)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })


}

export{
    uploadFiles,
    deleteFile
}