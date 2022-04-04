import {useEffect} from "react";

export function setAddState(uid, value, state, setState) {
    const newState = {...state};
    newState[uid] = value;
    setState(newState);
}

export const roles = {"User": 0, "Admin": 1}

export function getUserRoleDisplay(role) {
    for (let rolesKey in roles) {
        if (roles[rolesKey] === role) {
            return rolesKey
        }
    }
    return undefined
}


// https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
export function useAsync(asyncFn, onSuccess, dependencies = []) {
    useEffect(() => {
        let isActive = true;
        asyncFn().then(data => {
            if (isActive) onSuccess(data);
        });
        return () => {
            isActive = false
        };
    }, dependencies);
}