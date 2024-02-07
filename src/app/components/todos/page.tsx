'use client';
import styles from './todos.module.scss';
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { TodoType } from "@/utils/types";
import { FormEvent } from "react";
import { createTodo, deleteTodo, updateTodo, setIsTodoEditing, setEditedContent, fetchUser, setTodos, setUser, setNewTodoContent } from "@/redux/reducers/todoReducer";
import { useRouter } from "next/navigation";

export default function Todos() {
    const todos: TodoType[] = useAppSelector(state => state.todoReducer.Todos);
    const userId = useAppSelector(state => state.todoReducer.user._id);
    const dispatch = useAppDispatch();
    const editedContent = useAppSelector(state => state.todoReducer.editedContent);
    const router = useRouter()
    const token = localStorage.getItem('accountToken');
    const user = useAppSelector(state => state.todoReducer.user);
    const newTodoContent = useAppSelector(state => state.todoReducer.newTodoContent);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);
        const content = formData.get('content') as string;

        if (content) {
            dispatch(createTodo({ content: content, creator: userId })).then(() => {
                dispatch(setNewTodoContent(''));
                refreshpage();
            });
        }
    }

    async function removeTodo(id: string) {
        await dispatch(deleteTodo({
            id: id,
            creator: userId
        })).then(() => {
            refreshpage();
        });
    }

    function handleEditing(id: string) {
        dispatch(setIsTodoEditing(id));
    }

    function handleStartOfEditing(id: string, val: string) {
        dispatch(setIsTodoEditing(id));
        dispatch(setEditedContent(val));
    }

    function handleChange(value: string) {
        dispatch(setEditedContent(value));
    }

    async function changeTodo(id: string) {
        await dispatch(updateTodo({
            id: id,
            creator: userId,
            newContent: editedContent
        })).then(() => {
            handleEditing(id);
            refreshpage();
        })

    }


    function refreshpage() {
        if (token) {
            dispatch(fetchUser({ accountToken: token })).then((res: any) => {
                dispatch(setTodos(res.payload.user.todos));
                dispatch(setUser(res.payload.user));
                router.refresh();
            });
        }
    }

    function handleChangeNewContent(val: string) {
        dispatch(setNewTodoContent(val));
    }

    useEffect(() => {
        router.refresh();
        if (!token || token === 'undefined') {
            router.push('/auth/login');
        } else {
            dispatch(fetchUser({ accountToken: token })).then((res: any) => {
                dispatch(setTodos(res.payload.user.todos));
                dispatch(setUser(res.payload.user));
            });
        }
    }, [])

    return (
        <div className={styles.todoContainer}>
            <h1 className={styles.todoHeader}>{user.userName}'s ToDo List</h1>
            <form className={styles.todoForm} onSubmit={onSubmit}>
                <input value={newTodoContent} className={styles.todosInput} type="text" name='content' placeholder="Enter new task" onChange={(event) => handleChangeNewContent(event.target.value)} />
                <button className={styles.addBtn} type="submit">Add</button>
            </form>

            <div className={styles.todoList}>
                {todos.map((todo, index) => {
                    return (
                        <div className={styles.todoDiv} key={index}>
                            {todo.isEditing ?
                                <>
                                    <input className={styles.changeTodo} value={editedContent} onChange={(event) => handleChange(event.target.value)} />
                                    <button className={styles.btn} onClick={() => changeTodo(todo._id)}>Save</button>
                                </>
                                :
                                <p className={styles.todo} onClick={(event: any) => handleStartOfEditing(todo._id, event.target.textContent)}>{todo.content}</p>
                            }

                            <button className={styles.btn} onClick={() => removeTodo(todo._id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}