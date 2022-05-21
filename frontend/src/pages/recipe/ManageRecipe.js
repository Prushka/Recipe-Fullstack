import AdvancedGrid from "../../components/grid/AdvancedGrid";
import {useState} from "react";
import {initialRecipeState, snackBarHandleError, useAsync} from "../../util";
import {RecipeAPI} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import Dialog from "../../components/dialog/Dialog";
import * as React from "react";
import EditRecipe from "./EditRecipe";
import {BlueBGButton} from "../../components/input/Button";
import RecipeCard from "../../components/grid/RecipeCard";
import ViewRecipe from "./ViewRecipe";
import {useSelector} from "react-redux";

export default function ManageRecipe({isPersonal, isSaved, isPublic = false}) {

    const [recipes, setRecipes] = useState([])
    const {enqueueSnackbar} = useSnackbar()
    const [editingRecipe, setEditingRecipe] = useState(initialRecipeState)
    const [reviewData, setReviewData] = useState([])

    const [editRecipeDialogOpen, setEditRecipeDialogOpen] = useState(false)
    const [viewRecipeDialogOpen, setViewRecipeDialogOpen] = useState(false)
    const [isNew, setIsNew] = useState(false)
    let excludeHeaders = ['_id', 'author', 'instructions', 'approved']
    let searchableHeaders = ['title', 'authorName', 'category']
    if (isPersonal) {
        excludeHeaders = [...excludeHeaders, 'diet', 'ingredients']
    }
    if (!isPersonal) {
        searchableHeaders = [...searchableHeaders, 'tags']
    }
    const user = useSelector((state) => state.user)

    useAsync(async () => {
        try {
            const response = await RecipeAPI.get(
                isPublic ? "/public" : isSaved ? "/saved" : isPersonal ? "/me" : "")
            return response.data
        } catch (e) {
            snackBarHandleError(enqueueSnackbar, e)
        }
    }, (r) => {
        setRecipes(r)
    }, [editingRecipe, isPersonal, isSaved, isPublic])

    const viewRecipe = (e) => {
        setEditingRecipe(e.entity)
        setViewRecipeDialogOpen(true)
    }

    const editRecipe = (e) => {
        setIsNew(false)
        setEditingRecipe(e.entity)
        setEditRecipeDialogOpen(true)
    }
    return <>
        <Dialog size={'l'} title={`Editing Recipe`} open={editRecipeDialogOpen}
                onClose={() => {
                    setEditRecipeDialogOpen(false)
                    setEditingRecipe(initialRecipeState)
                }}
                content={
                    <EditRecipe
                        onClose={() => {
                            setEditRecipeDialogOpen(false)
                            setEditingRecipe(initialRecipeState)
                        }
                        }
                        isNew={isNew}
                        recipe={editingRecipe}
                        setEditingRecipe={setEditingRecipe}
                    />
                }
                footer={<>
                </>
                }/>

        <Dialog size={'l'} title={editingRecipe.title} open={viewRecipeDialogOpen}
                onClose={() => {
                    setViewRecipeDialogOpen(false)
                    setEditingRecipe(initialRecipeState)
                }}
                content={
                    <ViewRecipe
                        user={user}
                        onClose={() => {
                            setViewRecipeDialogOpen(false)
                            setEditingRecipe(initialRecipeState)
                        }
                        }
                        recipe={editingRecipe}
                        setRecipe={setEditingRecipe}
                        setEditingRecipe={setEditingRecipe}
                    />
                }
                footer={<>
                </>
                }/>

        {!isSaved && <BlueBGButton className={'full-width'}
                                   onClick={() => {
                                       setIsNew(true)
                                       setEditingRecipe(initialRecipeState)
                                       setEditRecipeDialogOpen(true)
                                   }
                                   }
        >Post New Recipe</BlueBGButton>}
        <AdvancedGrid
            excludeHeader={excludeHeaders}
            listArrayHeaders={['tags']}
            searchableHeaders={searchableHeaders}
            customEntityRenderer={isPersonal ? (props) => {
                return <RecipeCard
                    onButtonClick={(isPublic || isSaved) ? viewRecipe : editRecipe}
                    {...props} buttonText={(isPublic || isSaved) ? 'View Recipe' : 'Edit Recipe'}/>
            } : null
            }
            customEntityContainerClassName={'flex-wrap'}
            displayData={recipes} cellCallback={(!isPersonal && !isPublic && !isSaved) ? editRecipe : viewRecipe}/>
    </>
}