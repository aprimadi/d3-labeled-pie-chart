var LabeledPieChart = /** @class */ (function () {
    function LabeledPieChart(d3, data, options) {
        if (options === void 0) { options = { width: 960, height: 480 }; }
        this.d3 = d3;
        this.data = data;
        this.width = options.width;
        this.height = options.height;
        var color = d3.scaleOrdinal(d3.schemeTableau10);
        this.colorFn = options.colorFn || function (d) {
            return color(d.label);
        };
    }
    LabeledPieChart.prototype.render = function (el) {
        var _this = this;
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
        var change = function (data) {
            /* ------- PIE SLICES -------*/
            var slice = svg.select(".slices").selectAll("path")
                .data(pie(data), key)
                .join("path")
                .attr('stroke', '#fff')
                .attr('d', arc)
                .style("fill", function (d) {
                return _this.colorFn(d.data);
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
        change(this.data);
    };
    return LabeledPieChart;
}());
export default LabeledPieChart;
