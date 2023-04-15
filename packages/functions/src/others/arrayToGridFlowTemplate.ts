export function arrayToGridFlowTemplate(array: number[]) {
    return array.map((item) => `${item}fr`).join(' ');
}
