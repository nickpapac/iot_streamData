import React from 'react';

var MessageTypes = {
    1: 'SENSOR_DATA',
    2: 'BATTERY_DATA'
}

var CO2Types = {
    1: 'low',
    2: 'high'
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.setMessage = this.setMessage.bind(this)
    }
    setMessage(message) {
        this.setState({
            message
        })
    }


    componentDidMount() {
        const client = this.client = new WebSocket('WEBSERVER_URL')
        client.onopen = () => {
            this.timer = setInterval(() => client.send(Math.random()), 1000)
        }
        client.onmessage = ({
            data
        }) => this.setMessage(data)
    }

    componentWillUnmount() {
        this.client.close()
        clearInterval(this.timer)
        this.client = this.timer = null
    }


    //render data to the ui
    render() {
        console.log(this.state.message);
        if (this.state.message !== '') {
            var jsonObject = JSON.parse(this.state.message);
            var msgType = jsonObject.payload.substring(1, 2);
            if (getEnumValue(MessageTypes, msgType) === MessageTypes["1"]) {
                return <div > Sensor   {
                    jsonObject.deviceId
                } level: {
                    checkStatusOfCO2(convertHEXToDecimal(jsonObject.payload.substring(3, 6)))
                } < /div>
            } else if (getEnumValue(MessageTypes, msgType) === MessageTypes["2"]) {

                return <div > Sensor {
                    jsonObject.deviceId
                } battery status: {
                    convertmVtoV(convertHEXToDecimal(jsonObject.payload.substring(3, 6)))
                }
                V < /div>
            }
        }
        return ""

    }

}

//Return all types of messages
function getEnumKeys(enumType) {
    return Object.keys(MessageTypes);
}

//Retrieve description from enum value based on messageType
function getEnumValue(enumType, key) {
    return enumType[getEnumKeys(enumType).filter(function(k) {
        return key === k;
    }).pop() || ''];
}

//Retrieve description from enum value based on messageType
function convertHEXToDecimal(value) {
    return parseInt(value, 16);
}

//conver mV to V
function convertmVtoV(value) {
    //divide with 1000 in order to convert mV -> V
    return value / 1000;
}

//check status Of CO2
function checkStatusOfCO2(value) {
    if (value >= 0 && value <= 1200) {
        return CO2Types["1"];
    } else if (value > 1200) {
        return CO2Types["2"];
    }
    return "Not acceptable";
}

export default App;