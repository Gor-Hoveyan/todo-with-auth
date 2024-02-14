'use client';
import Link from "next/link";
import styles from './header.module.scss';
import { IoMoon, IoSunny } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDarkMode, signOut, signOutC } from "@/redux/reducers/todoReducer";
import { UserType } from "@/utils/types";

export default function Header() {
    const isDarkMode = useAppSelector(state => state.todoReducer.isDarkMode);
    const user: UserType| undefined = useAppSelector(state => state.todoReducer.user);
    const dispatch = useAppDispatch();


    function handleAuth() {

        function handleSignOut() {
            dispatch(signOut());
            dispatch(signOutC());
        }

        if (!user) {
            return (
                <div className={styles.headerAuth}>
                    <Link className={styles.headerLink} href={'/auth/login'}>Sign In</Link>
                    <Link className={styles.headerLink} href={'/auth/registration'}>Sign Up</Link>
                </div>
            );
        } else {
            return (
                <div className={styles.headerAuth}>
                    <Link className={styles.headerLink} onClick={() => handleSignOut()} href={'/auth/login'}>Sign out</Link>
                </div>
            );
        }
    }

    function handleThemeChange() {
        dispatch(setIsDarkMode());
    }

    return (
        <header className={isDarkMode ? styles.darkHeaderContainer : styles.lightHeaderContainer}>
            <Link className={styles.headerLink} href='/'>Home</Link>
            {handleAuth()}
            {
                isDarkMode ?
                    <IoSunny onClick={() => handleThemeChange()} size={40} color="white" className={styles.themeChanger} />
                :
                    <IoMoon onClick={() => handleThemeChange()} size={40} color="white" className={styles.themeChanger} />
            }
            
        </header>
    );
}