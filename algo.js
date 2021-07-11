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

for(let i = 0; i < C; i++) {
    console.log(solve(CASES[i]));
}

function setCases(LINES, C) {
    let a = 2;
    let b = 3;
    let cases = [];
    for(let i = 0; i < C; i++) {
        const A = LINES[a].split(' ').map(x => parseInt(x));
        const B = LINES[b].split(' ').map(x => parseInt(x));
        removeOverlap(A, B);
        cases.push([[...A], [...B]]);
        a += 3;
        b += 3;
    }

    return cases;
}

// A와 B의 중복 중 A의 중복원소를 제거한다.
function removeOverlap(A, B) {
    for(let i = 0; i < A.length; i++)
        for(let j = 0; j < B.length; j++)
            if(A[i] == B[j])
                A.splice(i, 1);
}

function LIS(arr) {
    const N = arr.length;
    // idx : 시작 인덱스
    // cache[idx] => idx부터 구한 lis
    let cache = new Array(N).fill(-1);

    function lis(idx) {
        if(cache[idx] != -1) return cache[idx];
        cache[idx] = 1;
        for(let next = idx+1; next < N; next++)
            if(idx == -1 || arr[idx] < arr[next])
                cache[idx] = Math.max(cache[idx], lis(next) + 1);
        return cache[idx];
    }

    return lis(0);
}

function solve(_case) {
    const A = _case[0];
    const B = _case[1];
    return LIS(A) + LIS(B);
}
