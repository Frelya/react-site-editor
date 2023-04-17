export function gridFlowTemplateToArray(template: string) {
    const pattern = /(\d+)fr/g;
    const matches = template.match(pattern);
    return matches ? matches.map((item) => parseInt(item, 10)) : [];
}
