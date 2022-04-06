import {useEffect} from "react";
import {FileUploadAPI} from "./axios/Axios";

export function setAddState(uid, value, state, setState) {
    const newState = {...state};
    newState[uid] = value;
    setState(newState);
}

export const roles = {"User": 0, "Admin": 1}

export const diets = ['Omnivore', 'Pescatarian', 'Vegetarian', 'Unknown']
export const categories = ['Japanese', 'Chinese', 'French', 'Italian', 'Vietnamese', 'Mexican', 'Indian', 'Pastry', 'Drinks', 'Korean', 'Unknown']

export const ratings = [1, 2, 3, 4, 5]

export const initialReviewState = {
    rating: 4,
    content: "",
    recipe: "",
    approved: true
}

export const initialRecipeState = {
    title: "",
    instructions: "",
    tags: [],
    ingredients: [],
    category: 'Unknown',
    diet: "Unknown",
    approved: false,
    thumbnail: 'https://s2.loli.net/2022/04/06/TOJBZgKVxko4lA6.png'
}

export function userIsAdmin(user) {
    return user.role > roles.User
}

export function getUserRoleDisplay(role) {
    for (let rolesKey in roles) {
        if (roles[rolesKey] === role) {
            return rolesKey
        }
    }
    return null
}

export async function uploadFile(selectedFile, enqueueSnackbar) {
    if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await FileUploadAPI.post("", formData)
            return response.data['storeWith']
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }
    return null
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

export function snackBarHandleSuccess(enqueueSnackbar, message){
    enqueueSnackbar(message,
        {
            variant: 'success',
            persist: false,
        })
}

export function snackBarHandleError(enqueueSnackbar, e){
    if(e.response){
        enqueueSnackbar(e.response.data.message,
            {
                variant: 'error',
                persist: false,
            })
    }else{
        enqueueSnackbar(e,
            {
                variant: 'error',
                persist: false,
            })
    }

}