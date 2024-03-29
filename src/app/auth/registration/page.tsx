'use client';
import styles from './registration.module.scss';
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRegister, setAuthFormData, clearAuthFormData, setErrorMessage, setRepeatedPassword } from "@/redux/reducers/todoReducer";
import { useRouter } from "next/navigation";


export default function Register() {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const authFormData = useAppSelector(state => state.todoReducer.authFormData);
    const wrongData = useAppSelector(state => state.todoReducer.errorMessage);
    const repeatPassword = useAppSelector(state => state.todoReducer.repeatedPassword);
    const isDarkMode = useAppSelector(state => state.todoReducer.isDarkMode);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElement = event?.currentTarget;
        const formData = new FormData(formElement);
        const username = formData.get('userName') as string;
        const password = formData.get('password') as string;

        if (repeatPassword === password) {
            await dispatch(fetchRegister({ userName: username, password }));
            router.push('/');
        } else {
            dispatch(setErrorMessage('Entered passwords are different from each other'));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === 'userName' || event.target.name === 'password') {
            dispatch(setAuthFormData({
                name: event.target.name,
                value: event.target.value
            }));
        }
    }

    function handleRepeatPasswordChange(val: string) {
        dispatch(setRepeatedPassword(val));
    }

    useEffect(() => {
        dispatch(clearAuthFormData());
        dispatch(setErrorMessage(''));
        router.refresh();
    }, [])

    return (
        <div className={isDarkMode ? styles.darkRegisterContainer : styles.lightRegisterContainer}>
            <h1 className={styles.registerHeader}>Sign Up</h1>
            <br />
            <form onSubmit={(event) => onSubmit(event)}>
                <input className={styles.registerInput} value={authFormData.userName} name="userName" type="text" placeholder="Username" onChange={(event) => handleChange(event)} />
                <br />
                <input className={styles.registerInput} value={authFormData.password} name="password" type="password" placeholder="Password" onChange={(event) => handleChange(event)} />
                <br />
                <input className={styles.registerInput} value={repeatPassword} name="repeatPassword" type="password" placeholder="Repeat Password" onChange={(event) => handleRepeatPasswordChange(event.target.value)} />
                <br />
                <button className={styles.btn} type='submit'>Register</button>
            </form>
            <p className={styles.registerError}>{wrongData}</p>
        </div>
    )
}