import AdvancedGrid from "../../components/grid/AdvancedGrid";
import {useState} from "react";
import {initialRecipeState, snackBarHandleError, useAsync} from "../../util";
import {RecipeAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import * as React from "react";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";

export default function SavedRecipe({}) {

    const [recipes, setRecipes] = useState([])
    const {enqueueSnackbar} = useSnackbar()
    const [editingRecipe, setEditingRecipe] = useState(initialRecipeState)
    const [removeSavedRecipeDialogOpen, setRemoveSavedRecipeDialogOpen] = useState(false)

    useAsync(async () => {
        try {
            const response = await RecipeAPI.get(
                "/saved")
            return response.data
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }, (r) => {
        setRecipes(r)
    }, [editingRecipe])

    return <>
        <ConfirmationDialog open={removeSavedRecipeDialogOpen}
                            setOpen={setRemoveSavedRecipeDialogOpen}
                            title={`Are you sure you want to remove this recipe from your favorites?`}
                            content={"You cannot undo this operation."}
                            onConfirm={async () => {
                                await RecipeAPI.delete(`/save/${editingRecipe._id}`).then(res => {
                                    enqueueSnackbar(`Successfully removed`,
                                        {
                                            variant: 'success',
                                            persist: false,
                                        })
                                    setEditingRecipe(initialRecipeState)
                                }).catch(e => {
                                    snackBarHandleError(enqueueSnackbar, e)
                                })
                            }}
        />
        <AdvancedGrid
            excludeHeader={['_id', 'author', 'instructions', 'approved']}
            listArrayHeaders={['tags']}
            searchableHeaders={['title', 'authorName', 'category', 'tags']}
            displayData={recipes} cellCallback={(e) => {
            setEditingRecipe(e.entity)
            setRemoveSavedRecipeDialogOpen(true)
        }}/>
    </>
}