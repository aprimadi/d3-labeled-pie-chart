var LabeledPieChart = require('../dist/es5/index.js').default

function randomData() {
  var labels = [
    'Agriculture', 
    'Basic and Chemical Industry', 
    'Consumer', 
    'Finance', 
    'Infrastructure', 
    'Mining', 
    'Other',
    'Property',
    'Trade, Services, and Investment',
  ]
  return labels.map(function(label) {
    return { label: label, value: Math.random() }
  })
}

function init() {
  const chart = new LabeledPieChart(d3, randomData())
  chart.render(document.querySelector("#chart"))
}

window.onload = init
