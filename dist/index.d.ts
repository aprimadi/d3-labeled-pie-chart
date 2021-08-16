interface PieChartDatum {
    label: string;
    value: number;
}
declare class LabeledPieChart {
    d3: any;
    data: Array<PieChartDatum>;
    width: number;
    height: number;
    colorFn: (d: PieChartDatum) => string;
    constructor(d3: any, data: Array<PieChartDatum>, options?: {
        width: number;
        height: number;
        colorFn?: (d: PieChartDatum) => string;
    });
    render(el: HTMLElement): void;
}
export default LabeledPieChart;
