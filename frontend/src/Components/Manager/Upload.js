import { useState,useEffect} from "react";
import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "./Upload.css";
import Edit from "../Editor/Edit";
function Upload() {

    

   
  const [selectEdit,setSelectedEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const[isFileUploaded,setIsFileUploaded] = useState(false)
  const [error,setError] = useState('')
  const [count,setCount] = useState(0)
  const [profile,setProfile] = useState()
  const [open, setOpen] = React.useState(false);
  

useEffect(()=>{
   
  sessionStorage.setItem("images", "[]")
  sessionStorage.setItem('display','[]')
},[])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const changeHandler = (event) => {
      setIsFileUploaded(false)
    setSelectedFile(event.target.files[0]);
    
    if (localStorage.getItem("images") == null) {
      localStorage.setItem("images", "[]");
    }
    
    
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2){
        setProfile(reader.result)
       // let old=JSON.parse(localStorage.getItem("images"));
       // let isInclude = old.includes(reader.result)
       let old=JSON.parse(sessionStorage.getItem("display"));
        let isInclude = old.includes(reader.result)

        if(isInclude){
          setError('already present')
        }
        else{
          setError(false)
          old.push({key:old.length,val:reader.result});
          //localStorage.setItem('images',JSON.stringify(old))
          sessionStorage.setItem("display", JSON.stringify(old));
        }
        
      }
    }
    reader.readAsDataURL(event.target.files[0])
    setIsFilePicked(true);
  };

  const handleUpload = () => {
    const formData = new FormData();
    
    formData.append("File", selectedFile);

    if (sessionStorage.getItem("images") == null) {
      sessionStorage.setItem("images", "[]");
    }

    let old = JSON.parse(sessionStorage.getItem("images"));
    let isInclude = old.includes(selectedFile.name)
    if(isInclude){
        setError('already present')
        setIsFileUploaded(false)
    }
    else{
       setError(false)
        old.push(selectedFile.name);
        setCount(old.length)
        sessionStorage.setItem("images", JSON.stringify(old));
        setIsFileUploaded(true)
    }
    setOpen(true);
    
  };

  const handleSubmit = () =>{

  }

  const editOption = ()=> {
    setSelectedEdit(!selectEdit);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let vertical='top';
  let horizontal = 'center'
  return (
    <div className="upload">
      <div className='upload__input'>
      <input  type="file" name="file" accept='image/*' onChange={changeHandler} />
      </div>
      {isFilePicked ? (
        <div className='upload__data'>
          <div>
            <button type="button" onClick={editOption}>Select</button>
            <p className='upload__details'>Filename: {selectedFile.name}</p>
            <p className='upload__details'>Filetype: {selectedFile.type}</p>
            <p className='upload__details'>Size in bytes: {selectedFile.size}</p>
          </div>
          <div className ='upload__preview' >
          {
            selectEdit?(<Edit profile={profile}/>):
            (<div><img  className src={profile}  alt='preview'/></div>)
          }

            
          </div>
        </div>
      ) : (
        <>
        <p>Select a file to show details</p>
        </>
        )}
      <div className="uploadButton" onClick={handleUpload}>
        Upload
        <CloudUploadIcon className='uploadIcon' />
      </div>
      <div className='upload__counter'>
        No of Uploads :{count}
    </div>
      {isFileUploaded && (<>
        <Snackbar   anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Uploaded :{selectedFile.name}
        </Alert>
      </Snackbar>
        
        </>)}
        {error && (<>
            <Snackbar   anchorOrigin={{ vertical, horizontal }}  open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
            </>)}

            {count===4 && (<>
                <div className="submitButton" onClick={handleSubmit}>
        Submit
      </div>
                </>)}
        
    </div>
  );
}

export default Upload;
