'use client';
import Link from "next/link";
import styles from './header.module.scss';

export default function Header() {
    let token: string | null;

    token = localStorage.getItem('accountToken');


    function handleAuth() {

        function clearToken() {
            localStorage.setItem('accountToken', "undefined");
        }

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
                    <Link className={styles.headerLink} onClick={() => clearToken()} href={'/auth/login'}>Sign out</Link>
                </div>
            );
        }
    }

    return (
        <header className={styles.headerContainer}>
            <Link className={styles.headerLink} href='/'>Home</Link>
            {handleAuth()}
        </header>
    );
}