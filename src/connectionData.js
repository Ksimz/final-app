React = require("react");
ReactDOM = require("react-dom");
const mqtt = require("mqtt");
let ReactFC = require("react-fusioncharts");
let FusionCharts = require("fusioncharts");
let Charts = require("fusioncharts/fusioncharts.charts");

let FusionTheme = require("fusioncharts/themes/fusioncharts.theme.fusion");

class ConnectionState extends React.Component {
  constructor(props) {
    super(props);

    ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

    this.client = mqtt.connect("ws://127.0.0.1:8080");
    this.mqttTopic = "ecg";
    this.StartStream = this.StartStream.bind(this);
    this.AddGraphPoints = this.AddGraphPoints.bind(this);
    this.client.on("connect", this.StartStream);
    this.state = {
      dataList: []
    };
    this.mqttClient.on("message", this.AddGraphPoints(topic, message));
  }

  StartStream() {
    console.log("Mqtt connected.");
    this.client.subscribe(mqttTopic);
  }

  AddGraphPoints(topic, message) {
    let parsedMessage = JSON.parse(message);
    this.setState({
      dataList: this.state.push(parsedMessage)
    });
  }

  render() {
    var chartConfigs = {
      type: "line",
      width: 700,
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Health Data",
          xAxisName: "Time",
          yAxisName: "ECG Data",
          theme: "fusion",
          labelDisplay: "Auto",
          useEllipsesWhenOverflow: "0"
        },
        data: this.state.dataList
      }
    };

    return (
      <div style={{ padding: 20 }}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>ECG Data Visualiser Client</h1>
        </div>

        <ReactFC width="700" {...chartConfigs} />
      </div>
    );
  }
}

module.exports = ConnectionState;
