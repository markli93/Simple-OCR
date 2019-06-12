import React from "react";
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar';


export default class Uplaod extends React.Component{
    constructor() {
        super();
      
        this.uploadForm = React.createRef();
    
        this.state = {
          photo: [],
          percent:0
        };
      }

      componentDidMount() {
        axios.get("http://localhost:8080/upload").then(res => {
          this.setState({
            photo: res.data
          });
          console.log(this.state.photo)
        });
      }

    
      // onChangeHandler = e => {
      //   console.log(e.target.files[0]);
      //   this.setState({
      //     selectedFile: e.target.files[0]
      //   });
      // };

      uploadPhoto = e => {
        e.preventDefault();
        let upload = this.uploadForm.current;
        const data = new FormData();
        data.append("file", upload.file.files[0]);
       
        console.log(upload.file);
        const config = {
            headers:{
                'Content-Type': "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
              this.setState({percent:percentCompleted})
              console.log(this.state.percent)
            }
        }
        axios.post(`http://localhost:8080/upload`, data,config)
        .then(res => {
            this.setState({
              photo:res.data
            })
            console.log(this.state.photo)
        }).catch(console.error)
    
      };

      test = e =>{
    
        this.setState({
          percent:0
        })
      }
      
    
    render(){
    
        return(
            <div>
                <h1>OCR</h1>
                <form className="upload__form" ref={this.uploadForm} onSubmit={this.uploadPhoto}>
                    <div className="image__title">
                        <label>Please Select a Image:</label>
                        <input type="file" name="file" onClick={this.test} />
                        <div className="button--container">
                          <button type="submit">Upload</button>
                        </div>

                        <progress 
                          min={0}
                          max={100}
                          value={this.state.percent} 
                          >
                        </progress>
                    </div>
                </form>
                <h2>Recognition Time: {this.state.photo.second} </h2>
                    <div className="image__result">
                      
                        <img className="img" src ={this.state.photo.image}/>
                        <div>{this.state.photo.response}</div>
                 
                    </div>
                    
            </div>
        )
    }
}