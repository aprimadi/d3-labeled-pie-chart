var LabeledPieChart = require('../dist/es5/index.js').default

function init() {
  const chart = new LabeledPieChart(d3, 960, 480)
  chart.render(document.querySelector("#chart"))
}

window.onload = init
