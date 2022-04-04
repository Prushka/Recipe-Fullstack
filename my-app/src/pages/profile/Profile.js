/*
 * Copyright 2022 Dan Lyu.
 */
import './Profile.css';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {TextField} from "../../components/input/TextField";
import {BlueBGButton, GreyBorderRedButton} from "../../components/input/Button";

export default function Profile() {
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)

    return (
        <div className={'profile__container'}>
            <div className={"avatar__container"}>
                <img src={user.avatar} alt='avatar'/>
            </div>
            <div className={"profile__follow-container"}>
                <GreyBorderRedButton
                    className={"profile__dialog__button"}>Followers: {user.followers.length}</GreyBorderRedButton>
                <GreyBorderRedButton
                    className={"profile__dialog__button"}>Following: {user.following.length}</GreyBorderRedButton>
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
        </div>
    )
}