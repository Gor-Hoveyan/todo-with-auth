'use client';
import styles from './login.module.scss';
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchLogin, fetchUser, setUser, setAuthFormData, clearAuthFormData, setErrorMessage } from "@/redux/reducers/todoReducer";
import { UserType } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Login() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const authFormData = useAppSelector(state => state.todoReducer.authFormData);
    const wrongData = useAppSelector(state => state.todoReducer.errorMessage);
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElement = event?.currentTarget;
        const formData = new FormData(formElement);
        const username = formData.get('userName') as string;
        const password = formData.get('password') as string;
        const res: any = await dispatch(fetchLogin({ userName: username, password }));
        if (res.payload.message !== "Entered invalid userName or password") {
            localStorage.setItem('accountToken', res.payload.token);
            dispatch(fetchUser({ accountToken: res.payload.token })).then((response) => (response.payload as { user: UserType })).then(res => {
                dispatch(clearAuthFormData());
                dispatch(setErrorMessage(''));
                dispatch(setUser(res.user));
                console.log('success');
                router.push('/');
            });
        } else {
            dispatch(setErrorMessage(res.payload.message));
            router.refresh();
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

    useEffect(() => {
        dispatch(clearAuthFormData());
        dispatch(setErrorMessage(''));
        router.refresh();
    }, [])

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginHeader}>Sign in</h1>
            <br />
            <form onSubmit={(event) => onSubmit(event)}>
                <input className={styles.loginInput} value={authFormData.userName} name="userName" type="text" placeholder="Username" onChange={(event) => handleChange(event)} />
                <br />
                <input className={styles.loginInput} value={authFormData.password} name="password" type="password" placeholder="Password" onChange={(event) => handleChange(event)} />
                <br />
                <button className={styles.btn} type='submit'>Login</button>
            </form>
            <p className={styles.loginError}>{wrongData}</p>
        </div>
    )
}