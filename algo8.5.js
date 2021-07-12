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
const CUT_CASES = cutCases(LINES, C);

for(let i = 0; i < C; i++) {
    console.log(solve(CUT_CASES[i]));
    console.log(betterSolve(CASES[i]));
}

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

function cutCases(LINES, C) {
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

// 아래는 더 나은 함수...

function betterSolve(_case) {
    const A = _case[0];
    const B = _case[1];
    // A[idxA], B[idxB]부터 고려하는 합친 LIS를 담는 캐시.
    const cache = new Array(A.length+1).fill(-1).map(x => new Array(B.length+1).fill(-1));
    const MIN = -1234567890;

    // idxA, idxB부터 각각 고려한다.
    // A[idxA] != B[idxB] 를 가정.
    function JLIS(idxA, idxB) {
        if(cache[idxA+1][idxB+1] != -1) return cache[idxA+1][idxB+1];
        
        cache[idxA+1][idxB+1] = 2;
        const a = idxA == -1 ? MIN : A[idxA];
        const b = idxB == -1 ? MIN : B[idxB];
        const maxElem = Math.max(a, b);
        for(let nextA = idxA + 1; nextA < A.length; nextA++)
            if(maxElem < A[nextA])
                cache[idxA+1][idxB+1] = Math.max(cache[idxA+1][idxB+1], 1 + JLIS(nextA, idxB));
        for(let nextB = idxB + 1; nextB < B.length; nextB++)
            if(maxElem < B[nextB])
                cache[idxA+1][idxB+1] = Math.max(cache[idxA+1][idxB+1], 1 + JLIS(idxA, nextB));
        
        
        return cache[idxA+1][idxB+1];
    }
    // A[-1], B[-1]은 실재하지 않으므로 2를 빼준다.
    return JLIS(-1, -1) - 2;
}
