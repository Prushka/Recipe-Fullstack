import AdvancedGrid from "../../components/grid/AdvancedGrid";
import {useState} from "react";
import {initialRecipeState, initialReviewState, useAsync, userIsAdmin} from "../../util";
import {RecipeAPI, ReviewAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import EditReview from "../review/EditReview";
import Dialog from "../../components/dialog/Dialog";
import * as React from "react";
import EditRecipe from "./EditRecipe";

export default function PersonalRecipe({}) {

    const [recipes, setRecipes] = useState([])
    const {enqueueSnackbar} = useSnackbar()
    const [editingRecipe, setEditingRecipe] = useState(initialRecipeState)
    const [reviewData, setReviewData] = useState([])
    const [editRecipeDialogOpen, setEditRecipeDialogOpen] = useState(false)

    useAsync(async () => {
        try {
            const response = await RecipeAPI.get(
                "/me")
            return response.data
        } catch (e) {
            enqueueSnackbar(e.response.data.message,
                {
                    variant: 'error',
                    persist: false,
                })
        }
    }, (r) => {
        setRecipes(r)
    }, [])

    return <>
        <Dialog size={'l'} title={`Editing Recipe`} open={editRecipeDialogOpen}
                onClose={() => {
                    setEditRecipeDialogOpen(false)
                    setEditingRecipe(initialRecipeState)
                }}
                content={
                    <EditRecipe
                        onDelete={() => {
                            setEditRecipeDialogOpen(false)
                            setEditingRecipe(initialRecipeState)
                        }
                        }
                        recipe={editingRecipe}
                        setEditingReview={setEditingRecipe}
                    />
                }
                footer={<>
                </>
                }/>
        <AdvancedGrid
            excludeHeader={['_id', 'author', 'instructions', 'approved']}
            listArrayHeaders={['tags']}
            searchableHeaders={['title', 'authorName', 'category', 'tags']}
            displayData={recipes} cellCallback={(e) => {
            setEditingRecipe(e.entity)
            setEditRecipeDialogOpen(true)
        }}/>
    </>
}