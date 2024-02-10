'use client';
import Link from "next/link";
import styles from './header.module.scss';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDarkMode } from "@/redux/reducers/todoReducer";
import { getCookie, clearAllCookies } from "@/utils/functions";

export default function Header() {
    const isDarkMode = useAppSelector(state => state.todoReducer.isDarkMode);
    let token: string | null = getCookie();
    const dispatch = useAppDispatch();


    function handleAuth() {

        if (!token || token === 'undefined') {
            return (
                <div className={styles.headerAuth}>
                    <Link className={styles.headerLink} href={'/auth/login'}>Sign In</Link>
                    <Link className={styles.headerLink} href={'/auth/registration'}>Sign Up</Link>
                </div>
            )
        } else {
            return (
                <div className={styles.headerAuth}>
                    <Link className={styles.headerLink} onClick={() => clearAllCookies()} href={'/auth/login'}>Sign out</Link>
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