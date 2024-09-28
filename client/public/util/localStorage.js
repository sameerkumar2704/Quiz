export function getName(index) {
    switch (index) {
        case 0: return "javascript";
        case 1: return "python";
        case 2: return "java";
        default: return "not-found"
    }
}
export function getDataBaseName() {
    return getName(Number(sessionStorage.getItem('test-type')))
}
export function getUserName() {
    return localStorage.getItem('login_id')
}
export function getKey() {
    return `${getUserName()}-${getDataBaseName()}`
}
export async function fetchData() {
    const res = await fetch('../data/data.json');
    const data = await res.json()
    return data
}

export function getCurrentState(key) {
    let curr_state = JSON.parse(sessionStorage.getItem(key));
    if (!curr_state) return curr_state
    curr_state = { ...curr_state, ans: JSON.parse(curr_state.ans) }
    return curr_state
}
export function setCurrenSate(object, key) {
    object = { ...object, ans: JSON.stringify(object.ans) }
    sessionStorage.setItem(key, JSON.stringify(object))
}

export function setOutcomeOnDataBase(key) {
    if (localStorage.getItem(key)) return
    const outcome = sessionStorage.getItem(key)
    localStorage.setItem(key, outcome);
    sessionStorage.removeItem(key)
}