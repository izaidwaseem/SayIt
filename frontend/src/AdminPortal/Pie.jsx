import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Pie extends Component {
  render() {
    const options = {
      theme: "dark2",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title: {
        text: "Brands by Products",
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          indexLabel: "{y}%",
          indexLabelPlacement: "inside",
          dataPoints: [
            { y: 34, label: "Outfitters" },
            { y: 20, label: "Engine" },
            { y: 30, label: "Breakout" },
            { y: 10, label: "Zellbury" },
            { y: 6, label: "Leisure Club" },
          ],
        },
      ],
    };
    return (
      <div className="w-full flex flex-col items-center justify-center h-[60vh]">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
export default Pie;
