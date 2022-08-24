import {useState} from 'react';
import Input from '@mui/material/Input';
import * as UploadService from '../services/UploadService';
import {getDownloadURL,ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from '../utils/firebase';

const container = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
};

function UploadView(){

    const [progress, setProgress]= useState(0);

    const formHandler = (e)=>{
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    }

    const uploadFiles = (file)=>{
        if(!file){
            return;
        }
        const storageRef = ref(storage, `/file/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on("state_changed", (snapshot) => {
            const prog= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);

            setProgress(prog);
        }, (err)=> console.log(err),
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref)
                  .then(url=>{
                      console.log("URL: ",url);
                  })
            }
        );
    }

    // const handleFileUpload = (e) => {
    //     const uploadData = new FormData();
    //     uploadData.append("file", e.target.files[0], "file");
    //     UploadService.cloudinaryUpload(uploadData)
    // }
    //
    // return (
    //     <div style={container}>
    //         <div style={{  margin: 10 }}>
    //             <label style={{ margin: 10 }}>Cloudinary:</label>
    //             <Input
    //                 type="file"
    //                 inputProps={{ accept: 'image/*' }}
    //                 onChange={(e) => handleFileUpload(e)}
    //             />
    //         </div>
    //         <h3>Uploaded {progress} %</h3>
    //     </div>
    // );

    return(
      <div>
          <form>
              <form onSubmit={formHandler}>
                  <input type="file" />
                  <button type="submit">Upload</button>
              </form>
          </form>
          <hr/>
      </div>
    );

}

export default UploadView;