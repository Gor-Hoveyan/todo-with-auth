'use client';
import Link from "next/link";
import styles from './header.module.scss';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDarkMode, signOut } from "@/redux/reducers/todoReducer";

export default function Header() {
    const isDarkMode = useAppSelector(state => state.todoReducer.isDarkMode);
    const userName = useAppSelector(state => state.todoReducer.user.userName);
    const dispatch = useAppDispatch();


    function handleAuth() {

        if (!userName.length) {
            return (
                <div className={styles.headerAuth}>
                    <Link className={styles.headerLink} href={'/auth/login'}>Sign In</Link>
                    <Link className={styles.headerLink} href={'/auth/registration'}>Sign Up</Link>
                </div>
            );
        } else {
            return (
                <div className={styles.headerAuth}>
                    <Link className={styles.headerLink} onClick={() => dispatch(signOut())} href={'/auth/login'}>Sign out</Link>
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