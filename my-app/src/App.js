import React, {useState} from 'react';
import './index.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from "./components/Profile";
import BrowseRecipe from "./components/BrowseRecipe";
import SavedRecipe from "./components/SavedRecipe";
import UploadRecipe from "./components/UploadRecipe";
import SideBar from "./pages/SideBar";
import {AdminManageRecipes, AdminManageUsers, AdminManageReviews} from "./pages/Admin";
import TopBar from "./pages/TopBar";
import {SnackBarManager, SnackbarProperties} from "./components/snack/Snackbar";

const sbs = [new SnackbarProperties({id: 1, text: "test 1", timeout: 9000}),
    new SnackbarProperties({id: 2, text: "test 2", timeout: 8000, type: "success"}),
    new SnackbarProperties({id: 3, text: "test 3", timeout: 7000, type: "error"}),
    new SnackbarProperties({
        id: 4,
        text: "test 4",
        timeout: 6000,
        type: "success",
        position: "bottom-right"
    }),
    new SnackbarProperties({id: 5, text: "test 5", timeout: 5000, type: "success", position: "top-right"}),
    new SnackbarProperties({id: 6, text: "test 6", timeout: 4000, type: "success", position: "top-right"}),
    new SnackbarProperties({
        id: 7,
        text: "test 7",
        timeout: 3000,
        type: "success",
        position: "bottom-middle"
    }),
    new SnackbarProperties({
        id: 8,
        text: "test 8",
        timeout: 2000,
        type: "success",
        position: "bottom-middle"
    })]
const SnackbarContext = React.createContext({
    snackbars: sbs, removeSnackbar: (id) => {
    }
});

export {SnackbarContext}


export default function App() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [snackbars, setSnackbars] = useState({
        snackbars: sbs, removeSnackbar: (id) => {
            console.log("removing " + id)
            console.log(snackbars)
            setSnackbars({
                snackbars: snackbars.snackbars.filter((sb) => sb.id !== id),
                removeSnackbar: snackbars.removeSnackbar
            })
        }
    });
    const PageComponent = ({path, children}) => {
        return (<>
            <SnackbarContext.Provider value={snackbars}>
                <SnackBarManager/>
            </SnackbarContext.Provider>
            <div className={`${sideBarOpen ? 'side-bar-overlay' : ''}`} onClick={() => setSideBarOpen(false)}/>
            <TopBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
            <div className={'page-body'}>
                <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} currentSelected={path}
                         userIsAdmin={true}/>
                <right-pane>{children}</right-pane>
            </div>
        </>)
    }
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}
                           element={<PageComponent path={"/"}><Home/></PageComponent>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="browse" element={<BrowseRecipe/>}/>
                    <Route path="saved" element={<SavedRecipe/>}/>
                    <Route path="upload" element={<UploadRecipe/>}/>
                    <Route path={"/manage/users"}
                           element={<PageComponent path={"/manage/users"}><AdminManageUsers/></PageComponent>}/>
                    <Route path={"/manage/recipes"}
                           element={<PageComponent path={"/manage/recipes"}><AdminManageRecipes/></PageComponent>}/>
                    <Route path={"/manage/reviews"}
                           element={<PageComponent path={"/manage/reviews"}><AdminManageReviews/></PageComponent>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
