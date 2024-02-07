'use client';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { fetchUser, setUser } from "@/redux/reducers/todoReducer";
import { useEffect } from "react";
import Todos from "./components/todos/page";

export default function Home() {
  const user = useAppSelector(state => state.todoReducer.user);
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem('accountToken');
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    if (!token || token === 'undefined') {
      router.push('/auth/login');
    } else {
      try {
        dispatch(fetchUser({ accountToken: token })).then((res: any) => {
          dispatch(setUser(res.payload.user));
        });
      } catch (e) {
        router.push('/auth/login');
      }

    }
  }, []);

  return (
    <main >
      {user ?
        <Todos />
        : 'You need to be authorized'
      }
    </main>
  )
}
