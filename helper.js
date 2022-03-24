/**
    helper.js
    17.03.2017
    Functional style
*/

const head = (arr) => {
    const [h, ...t] = arr;
    return h;
};

const tail = (arr) => {    
    const [h, ...t] = arr;
    return t;
};

const equal = (p1, p2) => {
    return p1[0] === p2[0] && p1[1] === p2[1];
};

const remove = (arr, v) => {
    if (arr.length === 0) return [];
    
    if ( equal(head(arr), v) )
        return remove(tail(arr), v);
    
    return [head(arr)].concat(remove(tail(arr), v));
};

const set_difference = (arr, del) => {
    if (del.length === 0)
        return arr;
    
    return set_difference(remove(arr, head(del)), tail(del));
};
