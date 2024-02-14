export type TodoType = {
    _id: string,
    creator: string,
    content: string,
    isEditing?: boolean
}

export type UserType = {
    userName: string,
    _id: string
}

export type LoginProps = {
    userName: string,
    password: string
}

export type CreateTodoParams = {
    content: string,
    creator: string
}

export type DeleteTodoParams = {
    id: string, 
    creator: string
}

export type UpdateTodoParams = {
    id: string,
    creator: string,
    newContent: string
}

export type DeleteFewTodosParams = {
    creator: string,
    todos: string[]
}

export type CheckedTodos = CheckedTodo[];

export type CheckedTodo = {
    id: string,
    isChecked: boolean
}