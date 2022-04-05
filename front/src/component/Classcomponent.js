import React, { Component } from 'react';
import axios from 'axios';

class Classcomponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            mytext : '아직디비안와서.....',
            mytextjson : '아직도 안왔다고?'
        }
    }
    componentDidMount = async() => {
        const gettext = await axios.get('/getsend/awssql?botable=interview')
        this.setState({mytext : gettext.data})
        const getjson = await axios.get('/getsend/getjson')
        this.setState({mytextjson : getjson.data.url})
    }
    render() {
        return (
            <div>
                <h3>나는 클래스형 컴포넌트</h3>
                <p>componentDidMount 함수에 의해 해당 컴포넌트가 새로고침이 되는거지</p>
                <p>data가 그저 텍스트임 : {this.state.mytext}</p>
                <p>json포맷으로 왔기때문에 : {this.state.mytextjson}</p>
            </div>
        );
    }
}

export default Classcomponent;