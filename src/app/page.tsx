'use client';
import styles from './page.module.css';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { autoLogin, setTodos, setUser } from "@/redux/reducers/todoReducer";
import { useEffect } from "react";
import Todos from "./components/todos/page";

export default function Home() {
  const user = useAppSelector(state => state.todoReducer.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isDarkMode = useAppSelector(state => state.todoReducer.isDarkMode);

  useEffect(() => {
    router.refresh();
    dispatch(autoLogin()).then((res: any) => {
      dispatch(setUser(res.payload));
      dispatch(setTodos(res.payload.todos));
    })
  }, []);

  return (
    <main className={isDarkMode ? styles.dark : styles.light} >
      {user ?
        <Todos />
        : 'You need to be authorized'
      }
    </main>
  )
}
