import AdvancedGrid from "../../components/grid/AdvancedGrid";
import {useState} from "react";
import {snackBarHandleError, useAsync} from "../../util";
import {RecipeAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";

export default function BrowseRecipe({}) {

    const [recipes, setRecipes] = useState([])
    const {enqueueSnackbar} = useSnackbar()

    useAsync(async () => {
        try {
            const response = await RecipeAPI.get(
                "/public")
            return response.data
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }, (r) => {
        setRecipes(r)
    }, [])

    return <>
        <AdvancedGrid
            excludeHeader={['_id', 'author', 'instructions', 'approved']}
            listArrayHeaders={['tags']}
            searchableHeaders={['title', 'authorName', 'category', 'tags']}
            displayData={recipes} cellCallback={(e) => {
        }}/>
    </>
}