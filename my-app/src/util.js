

export function setAddState(uid, value, state, setState) {
    const newState = {...state};
    newState[uid] = value;
    setState(newState);
}