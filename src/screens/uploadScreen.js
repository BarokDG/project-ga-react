import React, {useState, useEffect} from 'react';
import {singleFileUpload, multipleFilesUpload} from '../data/api';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const FileUploadScreen = (props) => {
    const [multipleFiles, setMultipleFiles] = useState('');
    const [carId, setCarId] =  useState('');
    const [make, setMake] =  useState('');
    const [year, setYear] =  useState('');
    const [price, setPrice] =  useState('');
    const [transmission, setTransmission] =  useState('');
    const [condition, setCondition] =  useState('');
    const [comment, setComment] =  useState('');
    const [mileage, setMileage] =  useState('');
    const [multipleProgress, setMultipleProgress] = useState(0);


    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }
    
    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }
    
    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        formData.append('carId', carId);
        formData.append('make', make);
        formData.append('year', year);
        formData.append('price', price);
        formData.append('transmission', transmission);
        formData.append('mileage', mileage);
        formData.append('condition', condition);
        formData.append('comment', comment);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);                      
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }
    return (
        <div className="row mt-3">
            
            <div className="col-12">
                   <div className="row">
                       <div className="col-6">
                            <label >Title</label>
                            <input type="text" onChange={(e) => setCarId(e.target.value) } placeholder="enter CarId" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Make</label>
                            <input type="text" onChange={(e) => setMake(e.target.value) } placeholder="enter Make" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Year</label>
                            <input type="text" onChange={(e) => setYear(e.target.value) } placeholder="enter Year" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Price</label>
                            <input type="text" onChange={(e) => setPrice(e.target.value) } placeholder="enter Price" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Transmission</label>
                            <input type="text" onChange={(e) => setTransmission(e.target.value) } placeholder="Manual or Automatic" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Mileage</label>
                            <input type="text" onChange={(e) => setMileage(e.target.value) } placeholder="enter Mileage" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Condition</label>
                            <input type="text" onChange={(e) => setCondition(e.target.value) } placeholder="enter Condition" className="form-control"/>
                       </div>
                       <div className="col-6">
                            <label >Comment</label>
                            <input type="text" onChange={(e) => setComment(e.target.value) } placeholder="enter Comment" className="form-control"/>
                       </div>
                       <div className="col-6">
                        <div className="form-group">
                            <label>Select Multiple Files</label>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                        </div>
                       </div>
                   </div>                   
                    <div className="row">
                        <div className="col-10">
                            <button type="button" onClick={() => UploadMultipleFiles()}  className="btn btn-danger">Upload</button>
                        </div>
                        <div className="col-2">
                        <CircularProgressbar
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                    </div>
                </div>
        </div>
    );
}

export default FileUploadScreen;