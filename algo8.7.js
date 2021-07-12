const INPUT = `5
12341234
11111222
12122222
22222222
12673939`
// output : 4 2 5 2 14

const LINES = INPUT.split('\n');
const C = parseInt(LINES[0]);
const CASES = LINES.slice(1, 1+C)
                    .map(x => x.split('').map(e => parseInt(e)));
CASES.forEach(x => console.log(solve(x)));

function solve(_case) {
    // idx : 시작점, n : 가능한 한 이 개수에 맞게. 만약 5개를 주문했는데 인덱스를 초과하면 3개짜리로 다시 돌리기.
    // n : 3 ~ 5
    function getMinLevel(idx, n) {
        if(n < 3) return 0;
        if(idx + n >= _case.length) getMinLevel(idx, n - 1);
        for(let i = 0; i < n - 1; i++) {
            if(_case[i] != _case[i+1]) break;
            if(i == n - 2) return 1;
        }
        for(let i = 0; i < n - 1; i++) {
            if(_case[i]+1 != _case[i+1]) break;
            if(i == n - 2) return 2;
        }
        for(let i = 0; i < n - 2; i++) {
            if(_case[i] != _case[i+2]) break;
            if(i == n - 3) return 4;
        }
        for(let i = 0; i < n - 2; i++) {
            if((_case[i]+_case[i+2])/2 != _case[i+1]) break;
            if(i == n - 3) return 5;
        }
        return 10;
    }
    
    // idx부터 측정된 함수 반환값.
    let cache = new Array(_case.length + 1).fill(-1);

    function getMinSum(idx) {
        if(cache[idx] != -1) return cache[idx];
        let min = 1234567890;
        for(let n = 3; n <= 5; n++) {
            min = Math.min(min, getMinLevel(idx, n) + getMinSum(idx+n+1));
        }
        return min;
    }

    return getMinSum(0);
}