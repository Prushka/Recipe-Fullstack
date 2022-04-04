/*
 * Copyright 2022 Dan Lyu.
 */
import './Profile.css';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "../../components/input/TextField";
import {BlueBGButton, GreyBorderRedButton, RedBGButton} from "../../components/input/Button";
import {getUserRoleDisplay} from "../../util";
import Dialog from "../../components/dialog/Dialog";
import PasswordTextField from "../../components/input/PasswordTextField";
import {getAllFollowerUsers, getAllFollowingUsers, UserAPI} from "../../axios/Axios";
import {setUser} from "../../redux/Redux";
import {useSnackbar} from "notistack";
import AdvancedGrid from "../../components/grid/AdvancedGrid";

export default function Profile() {
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [updatePasswordDialogOpen, setUpdatePasswordDialogOpen] = useState(false)
    const [followingUserDialogOpen, setFollowingUserDialogOpen] = useState(false)
    const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [passwordInputType, setPasswordInputType] = useState("password")
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const dispatch = useDispatch()
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    const updateMyUserInfo = async () => {
        if (password !== repeatPassword) {
            enqueueSnackbar(`Your passwords don't match (Repeat Password and Password)`,
                {
                    variant: 'error',
                    persist: false,
                })
            return
        }
        let updatePayload
        if (password) {
            updatePayload = {"name": username, "email": email, "password": password}
        } else {
            updatePayload = {"name": username, "email": email}
        }
        await UserAPI.patch('',
            updatePayload,
            {withCredentials: true}).then(res => {

            dispatch(setUser(res.data))
            enqueueSnackbar(`Successfully updated your user profile`,
                {
                    variant: 'success',
                    persist: false,
                })
        }).catch(error => {
            enqueueSnackbar(`${error.response.data.message}`,
                {
                    variant: 'error',
                    persist: false,
                })
        })
    }

    return (
        <div className={'profile__container'}>
            <Dialog title={"Edit Password"} open={updatePasswordDialogOpen}
                    onClose={() => setUpdatePasswordDialogOpen(false)}
                    content={
                        <>
                            <PasswordTextField password={password} setPassword={setPassword}
                                               passwordInputType={passwordInputType}
                                               className="auth__input" setPasswordInputType={setPasswordInputType}/>

                            <TextField value={repeatPassword} setValue={setRepeatPassword} type={passwordInputType}
                                       className="auth__input"
                                       label={'Repeat Password'}/>

                        </>
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
                        excludeHeader={['_id','following','followers']}/>
                    }
                    footer={<>
                    </>
                    }/>

            <Dialog title={"Followers"} open={followersDialogOpen}
                    onClose={() => setFollowersDialogOpen(false)}
                    content={
                        <AdvancedGrid
                            searchableHeaders={['name']} displayData={followers}
                            excludeHeader={['_id','following','followers']}/>
                    }
                    footer={<>
                    </>
                    }/>
            <div className={"avatar__container"}>
                <img src={user.avatar} alt='avatar'/>
            </div>
            <div className={"profile__follow-container"}>
                <GreyBorderRedButton
                    className={"profile__dialog__button"}
                onClick={async() => {
                    getAllFollowerUsers(user).then(users => {
                        setFollowers(users)
                        setFollowersDialogOpen(true)
                    })
                }}>Followers: {user.followers.length}</GreyBorderRedButton>
                <GreyBorderRedButton
                    className={"profile__dialog__button"}
                    onClick={async () => {
                        getAllFollowingUsers(user).then(users => {
                            setFollowing(users)
                            setFollowingUserDialogOpen(true)
                        })
                    }}
                >Following: {user.following.length}</GreyBorderRedButton>
            </div>


            <TextField value={username} setValue={setUsername}
                       type="username"
                       className="profile__input"
                       textFieldClassName="profile__input"
                       label={'Username'}/>
            <TextField value={email} setValue={setEmail}
                       type="email"
                       className="profile__input"
                       textFieldClassName="profile__input"
                       label={'Email'}/>
            <TextField
                disabled={true}
                value={getUserRoleDisplay(user.role)}
                className="profile__input"
                textFieldClassName="profile__input"
                label={'Role'}/>


            <BlueBGButton className={'profile__save-button'} onClick={() => setUpdatePasswordDialogOpen(true)}>Update
                Password</BlueBGButton>
            <BlueBGButton className={'profile__save-button'}
                          onClick={async () => await updateMyUserInfo()}>Save</BlueBGButton>
        </div>
    )
}