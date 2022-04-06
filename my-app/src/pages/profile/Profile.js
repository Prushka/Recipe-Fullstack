/*
 * Copyright 2022 Dan Lyu.
 */
import '../Edit.css';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "../../components/input/TextField";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../../components/input/Button";
import {getUserRoleDisplay, roles, snackBarHandleError, uploadFile, useAsync} from "../../util";
import Dialog from "../../components/dialog/Dialog";
import PasswordTextField from "../../components/input/PasswordTextField";
import {
    getAllFollowerUsers,
    getAllFollowingUsers,
    logout,
    UserAPI
} from "../../axios/Axios";
import {useSnackbar} from "notistack";
import AdvancedGrid from "../../components/grid/AdvancedGrid";
import {RadioButtonGroup} from "../../components/input/RadioButtonGroup";
import {setUser} from "../../redux/Redux";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";
import {useNavigate} from "react-router-dom";
import SingleFileField from "../../components/input/SingleFileField";

export default function Profile({
                                    user, setEditingUser = () => {
    }, onClose = () => {
    }
                                }) {
    const navigate = useNavigate()
    const loggedInUser = useSelector((state) => state.user)
    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [updatePasswordDialogOpen, setUpdatePasswordDialogOpen] = useState(false)
    const [followingUserDialogOpen, setFollowingUserDialogOpen] = useState(false)
    const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
    const [deleteFollowingUserOpen, setDeleteFollowingUserOpen] = useState(false)
    const [unfollowUser, setUnfollowUser] = useState({})
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [passwordInputType, setPasswordInputType] = useState("password")
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useDispatch()
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedRole, setSelectedRole] = useState(getUserRoleDisplay(user.role))
    const editingMyProfile = loggedInUser._id === user._id
    const [deleteUserConfirmationOpen, setDeleteUserConfirmationOpen] = useState(false)

    const pronoun = editingMyProfile ? "this account" : "this user"

    useAsync(async()=>{
        return [await getAllFollowingUsers(user),
            await getAllFollowerUsers(user)]
    },([following, followers])=>{
        setFollowing(following)
        setFollowers(followers)
    },[])
    const updateMyUserInfo = async () => {
        if (password !== repeatPassword) {
            snackBarHandleError(enqueueSnackbar,`Your passwords don't match (Repeat Password and Password)`)
            return
        }
        let avatar = await uploadFile(selectedFile, enqueueSnackbar)
        let updatePayload = {"name": username, "email": email, "role": roles[selectedRole]}
        if (password) {
            updatePayload = {...updatePayload, "password": password}
        }
        if (avatar) {
            updatePayload = {...updatePayload, "avatar": avatar}
        }
        await UserAPI.patch(`/${user._id}`,
            updatePayload).then(res => {
            if (editingMyProfile) {
                dispatch(setUser(res.data))
            }
            setEditingUser(res.data)
            enqueueSnackbar(`Successfully updated the user profile`,
                {
                    variant: 'success',
                    persist: false,
                })
        }).catch(e => {
            snackBarHandleError(enqueueSnackbar, e)
        })
    }

    return (
        <div className={'edit__container edit__container__column edit__container__column--1'}>
            <Dialog title={"Edit Password"} open={updatePasswordDialogOpen}
                    onClose={() => setUpdatePasswordDialogOpen(false)}
                    content={
                        <div className={'edit__container edit__container__column'}>
                            <PasswordTextField password={password} setPassword={setPassword}
                                               passwordInputType={passwordInputType}
                                               className="auth__input" setPasswordInputType={setPasswordInputType}/>

                            <TextField value={repeatPassword} setValue={setRepeatPassword} type={passwordInputType}
                                       className="auth__input"
                                       label={'Repeat Password'}/>
                        </div>
                    }
                    footer={<>

                        <RedBGButton type={'reset'} onClick={() => {
                            setPassword('')
                            setRepeatPassword('')
                        }
                        }>Clear Password Input</RedBGButton>
                    </>
                    }/>

            <Dialog title={"Edit Following Users"} open={followingUserDialogOpen}
                    onClose={() => setFollowingUserDialogOpen(false)}
                    content={
                        <AdvancedGrid
                            searchableHeaders={['name']} displayData={following}
                            excludeHeader={['_id', 'following', 'followers']}
                            cellCallback={(e) => {
                                setUnfollowUser(e.entity)
                                setDeleteFollowingUserOpen(true)
                            }
                            }
                        />
                    }
                    footer={<>
                    </>
                    }/>

            <Dialog title={"Followers"} open={followersDialogOpen}
                    onClose={() => setFollowersDialogOpen(false)}
                    content={
                        <AdvancedGrid
                            searchableHeaders={['name']} displayData={followers}
                            excludeHeader={['_id', 'following', 'followers']}/>
                    }
                    footer={<>
                    </>
                    }/>

            <ConfirmationDialog open={deleteFollowingUserOpen}
                                setOpen={setDeleteFollowingUserOpen}
                                title={`Are you sure you want to unfollow ${unfollowUser.name}?`}
                                onConfirm={async () => {
                                    await UserAPI.delete(`/follow/${unfollowUser._id}`).then(res => {
                                        enqueueSnackbar(`Successfully unfollowed ${unfollowUser.name}`,
                                            {
                                                variant: 'success',
                                                persist: false,
                                            })
                                        setFollowing(following.filter(user => {
                                            return user.name !== unfollowUser.name
                                        }))
                                    }).catch(e => {
                                        snackBarHandleError(enqueueSnackbar, e)
                                    })
                                }}
            />

            <div className={"avatar__container"}>
                <img src={user.avatar} alt='avatar'/>
            </div>

            <div className={"edit__follow-container"}>
                <GreyBorderRedButton
                    className={"edit__dialog__button"}
                    onClick={() => {
                        setFollowersDialogOpen(true)
                    }}>Followers: {followers.length}</GreyBorderRedButton>
                <GreyBorderRedButton
                    className={"edit__dialog__button"}
                    onClick={() => {
                        setFollowingUserDialogOpen(true)
                    }}
                >Following: {following.length}</GreyBorderRedButton>
            </div>

            <SingleFileField title={'Upload Avatar'} file={selectedFile} setFile={setSelectedFile}/>


            <TextField value={username} setValue={setUsername}
                       type="username"
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Username'}/>
            <TextField value={email} setValue={setEmail}
                       type="email"
                       className="edit__input"
                       textFieldClassName="edit__input"
                       label={'Email'}/>
            {editingMyProfile ? <TextField
                    disabled={true}
                    value={getUserRoleDisplay(user.role)}
                    className="edit__input"
                    textFieldClassName="edit__input"
                    label={'Role'}/> :
                <RadioButtonGroup
                    title={'Role'}
                    options={Object.keys(roles)}
                    selected={selectedRole}
                    setSelected={(id) => {
                        setSelectedRole(id)
                    }
                    }/>
            }


            <BlueBGButton className={'edit__action-button'} onClick={() => setUpdatePasswordDialogOpen(true)}>Update
                Password</BlueBGButton>
            <BlueBGButton className={'edit__action-button'}
                          onClick={async () => await updateMyUserInfo()}>Save</BlueBGButton>

            <ConfirmationDialog open={deleteUserConfirmationOpen}
                                setOpen={setDeleteUserConfirmationOpen}
                                title={`Are you sure you want to remove ${pronoun}?`}
                                content={"You cannot undo this operation."}
                                onConfirm={async () => {
                                    await UserAPI.delete(`/${user._id}`).then(res => {
                                        enqueueSnackbar(`Successfully deleted`,
                                            {
                                                variant: 'success',
                                                persist: false,
                                            })
                                        onClose()
                                        if (editingMyProfile) {
                                            logout().then(() => {
                                                navigate("/login")
                                            })
                                        }
                                    }).catch(e => {
                                        snackBarHandleError(enqueueSnackbar, e)
                                    })
                                }}
            />
            <RedBGButton className={'edit__action-button'} onClick={() => {
                setDeleteUserConfirmationOpen(true)
            }}>DELETE {pronoun.toUpperCase()}</RedBGButton>

        </div>
    )
}