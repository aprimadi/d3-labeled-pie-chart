declare class LabeledPieChart {
    d3: any;
    width: number;
    height: number;
    constructor(d3: any, width?: number, height?: number);
    render(el: HTMLElement): void;
}
export default LabeledPieChart;
