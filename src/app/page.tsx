'use client';
import styles from './page.module.css';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { autoLogin, setTodos, setUser, setIsDarkMode } from "@/redux/reducers/todoReducer";
import { useEffect } from "react";
import Todos from "./components/todos/page";

export default function Home() {
  const user = useAppSelector(state => state.todoReducer.user);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(state => state.todoReducer.isDarkMode);

  useEffect(() => {
    dispatch(autoLogin()).then((res: any) => {
      dispatch(setUser(res.payload));
      dispatch(setTodos(res.payload?.todos));
    });
    dispatch(setIsDarkMode());
  }, []);

  return (
    <main className={isDarkMode ? styles.dark : styles.light} >
      {!user ?
        <h1 className={styles.mainHeader}>You need to be authorized</h1>
        : 
        <Todos />
      }
    </main>
  )
}
