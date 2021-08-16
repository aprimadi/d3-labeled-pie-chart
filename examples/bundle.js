(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LabeledPieChart = /** @class */ (function () {
    function LabeledPieChart(d3, width, height) {
        if (width === void 0) { width = 960; }
        if (height === void 0) { height = 480; }
        this.d3 = d3;
        this.width = width;
        this.height = height;
    }
    LabeledPieChart.prototype.render = function (el) {
        var d3 = this.d3;
        var svg = d3.select(el).selectAll("svg")
            .data([null])
            .join("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g");
        var g = d3.select(el).select("g");
        g.append("g")
            .attr("class", "slices");
        g.append("g")
            .attr("class", "labels");
        g.append("g")
            .attr("class", "lines");
        var width = this.width, height = this.height, radius = Math.min(width, height) / 2;
        var pie = d3.pie()
            .value(function (d) {
            return d.value;
        });
        var arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(0);
        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);
        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var key = function (d) { return d.data.label; };
        var color = d3.scaleOrdinal()
            .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        function randomData() {
            var labels = color.domain();
            return labels.map(function (label) {
                return { label: label, value: Math.random() };
            });
        }
        var change = function (data) {
            /* ------- PIE SLICES -------*/
            var slice = svg.select(".slices").selectAll("path.slice")
                .data(pie(data), key);
            slice.enter()
                .insert("path")
                .attr('stroke', '#fff')
                .attr('d', arc)
                .style("fill", function (d) {
                return color(d.data.label);
            })
                .attr("class", "slice");
            slice
                .transition().duration(1000)
                .attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                // t is a number between 0 at the start of the transaction and 1 at 
                // the end of the transaction
                return function (t) {
                    return arc(interpolate(t));
                };
            });
            slice.exit()
                .remove();
            /* ------- TEXT LABELS -------*/
            var text = svg.select(".labels").selectAll("text")
                .data(pie(data), key)
                .join("text")
                .attr("dy", ".35em")
                .attr("transform", function (d) {
                var pos = outerArc.centroid(d);
                return "translate(" + pos + ")";
            })
                .text(function (d) {
                return d.data.label;
            });
            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }
            text.transition().duration(1000)
                .attrTween("transform", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                // t is a number between 0 at the start of the transaction and 1 at 
                // the end of the transaction
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
                .styleTween("text-anchor", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                // t is a number between 0 at the start of the transaction and 1 at 
                // the end of the transaction
                return function (t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            });
            /* ------- SLICE TO TEXT POLYLINES -------*/
            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key)
                .join("polyline")
                .attr("points", function (d) {
                var p1 = arc.centroid(d);
                var p2 = outerArc.centroid(d);
                var res = [p1, p2];
                return res;
            });
            polyline.transition().duration(1000)
                .attrTween("points", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                // t is a number between 0 at the start of the transaction and 1 at 
                // the end of the transaction
                return function (t) {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });
        };
        change(randomData());
        d3.select(".randomize")
            .on("click", function () {
            change(randomData());
        });
    };
    return LabeledPieChart;
}());
exports.default = LabeledPieChart;

},{}],2:[function(require,module,exports){
var LabeledPieChart = require('../dist/es5/index.js').default

function init() {
  const chart = new LabeledPieChart(d3, 960, 480)
  chart.render(document.querySelector("#chart"))
  chart.render(document.querySelector('#chart'))
}

window.onload = init

},{"../dist/es5/index.js":1}]},{},[2]);
