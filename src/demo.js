import React, { Component } from 'react';
import axios from './util/request'
import { Upload, Button, Icon, Card } from 'antd'


export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            greeting: "",
            image: "",
        }
    }

    componentDidMount() {
        axios.get("/v1/greeting")
        .then(res => {
            this.setState({
                greeting: res.data
            })
        })
    }

    submit = (e) => {
        let formData = new FormData()
        formData.append("file", e.file)
        axios.post("/v1/upload", formData, {
            //添加请求头
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
            this.setState({
                image: res.data
            })
        })
    }

    render() {
        return(
            <div style={{paddingTop: "10rem"}}>
                <div style={{display: "flex", justifyContent: "center", paddingTop: "1rem"}}>
                    <h1>{this.state.greeting.length > 0 ? this.state.greeting : ""}世界</h1>
                </div>
                <Card>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Upload
                                name="file"
                                action="/upload"
                                customRequest={this.submit}
                                showUploadList={false}
                            >
                                <Button>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Upload>        
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {this.state.image.length > 0 ? <Card><img width={300} height={300} src={this.state.image} alt={this.state.image}/></Card> : ""}
                    </div>
                </Card>
                
                
            </div>
        )
    }
}