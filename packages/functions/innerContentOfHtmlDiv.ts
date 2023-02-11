const regexMatcher = /<div.*?>(.*?)<\/div>/;

export function innerContentOfHtmlDiv(html: string): string {
    const matchedElement = html.match(regexMatcher);
    return matchedElement ? matchedElement[1] : '';
}
