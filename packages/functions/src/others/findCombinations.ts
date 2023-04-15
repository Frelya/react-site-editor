// This function returns all possible combinations of n numbers from 1 to m so that the sum of the numbers is m.
export function findCombinations(n: number, m: number): number[][] {
    if (n === 1 && m >= 1) {
        return [[m]];
    }

    const result: number[][] = [];

    for (let i = 1; i <= m; i++) {
        const combinations = findCombinations(n - 1, m - i);

        combinations.forEach((combination) => {
            result.push([i, ...combination]);
        });
    }

    return result;
}
