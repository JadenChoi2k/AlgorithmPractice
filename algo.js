const INPUT = `3
3 3
1 2 4
3 4 7
3 3
1 2 3
4 5 6
5 3
10 20 30 1 2
10 20 30`;
// output : 5 6 5

const LINES = INPUT.split('\n');
const C = LINES[0] * 1;
const CASES = setCases(LINES, C);

function setCases(LINES, C) {
    let a = 2;
    let b = 3;
    let cases = [];
    for(let i = 0; i < C; i++) {
        const A = LINES[a].split(' ').map(x => parseInt(x));
        const B = LINES[b].split(' ').map(x => parseInt(x));
        cases.push([[...A], [...B]]);
        a += 3;
        b += 3;
    }

    return cases;
}