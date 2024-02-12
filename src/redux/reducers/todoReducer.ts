import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoType, UserType, LoginProps, CreateTodoParams, DeleteTodoParams, UpdateTodoParams,} from "@/utils/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { todosApi } from "@/api/todosApi";
import { authApi } from '@/api/authApi';

export const autoLogin = createAsyncThunk<UserType>(
    'auth/autoLog',
    async () => {
        const data: {user: UserType} = await authApi.authoLog();
        return data.user;
    }
)

export const fetchLogin = createAsyncThunk<string, LoginProps>(
    'auth/login',
    async ({ userName, password }) => {
        const data: string = await authApi.login(userName, password);
        return data;
    }
);

export const fetchRegister = createAsyncThunk<string, LoginProps>(
    'auth/register',
    async ({ userName, password }) => {
        const data: string = await authApi.register(userName, password);
        return data;
    }
);


export const createTodo = createAsyncThunk<void, CreateTodoParams>(
    'todos/createTodo',
    async ({ content, creator }) => {
        await todosApi.createTodo(content, creator);
    }
);

export const deleteTodo = createAsyncThunk<void, DeleteTodoParams>(
    'todos/deleteTodo',
    async ({ id, creator }) => {
        await todosApi.deleteTodo(id, creator);
    }
);

export const updateTodo = createAsyncThunk<void, UpdateTodoParams>(
    'todos/updateTodo',
    async ({ id, creator, newContent }) => {
        await todosApi.updateTodo(id, creator, newContent);
    }
)

type InitialState = {
    user: UserType,
    authFormData: LoginProps
    Todos: TodoType[],
    editedContent: string,
    errorMessage: string,
    repeatedPassword: string,
    newTodoContent: string,
    isDarkMode: boolean
}

const initialState: InitialState = {
    user: {
        userName: '',
        _id: ''
    },
    authFormData: {
        userName: '',
        password: ''
    },
    Todos: [],
    editedContent: '',
    errorMessage: '',
    repeatedPassword: '',
    newTodoContent: '',
    isDarkMode: false,
}

const todoReducer = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.Todos = action.payload;
        },
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        setAuthFormData: (state, action: PayloadAction<{ name: 'userName' | 'password', value: string }>) => {
            state.authFormData[action.payload.name] = action.payload.value;
        },
        clearAuthFormData: (state) => {
            state.authFormData = {
                userName: '',
                password: ''
            };
            state.repeatedPassword = '';
        },
        setIsTodoEditing: (state, action: PayloadAction<string>) => {
            state.Todos.filter((todo: TodoType) => {
                if (todo._id === action.payload) {
                    if (todo.isEditing !== true) {
                        todo.isEditing = true;
                    } else {
                        todo.isEditing = false;
                    }
                }
            });
        },
        setEditedContent: (state, action: PayloadAction<string>) => {
            state.editedContent = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setRepeatedPassword: (state, action: PayloadAction<string>) => {
            state.repeatedPassword = action.payload;
        },
        setNewTodoContent: (state, action: PayloadAction<string>) => {
            state.newTodoContent = action.payload;
        },
        setIsDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            if(state.isDarkMode === true) {
                document.body.style.backgroundColor = 'black';
            } else {
                document.body.style.backgroundColor = 'white';
            }
        },
        signOut: (state) => {
            state.user = {
                userName: '',
                _id: ''
            }
        },
    }
})

export const {
    setTodos,
    setUser,
    setAuthFormData,
    setIsTodoEditing,
    setEditedContent,
    clearAuthFormData,
    setErrorMessage,
    setRepeatedPassword,
    setNewTodoContent,
    setIsDarkMode,
    signOut
} = todoReducer.actions;
export default todoReducer.reducer;