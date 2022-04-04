export function setAddState(uid, value, state, setState) {
    const newState = {...state};
    newState[uid] = value;
    setState(newState);
}

export function getUserRoleDisplay(role) {
    return role === 0 ? "User" : "Admin"
}