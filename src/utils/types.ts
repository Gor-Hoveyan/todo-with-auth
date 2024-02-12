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

export type FetchedUserType = {
    password: string,
    todos: TodoType[],
    userName: string,
    v: number,
    _id: string
}

export type FetchedDataType = {
    user: FetchedUserType
}

export type LoginProps = {
    userName: string,
    password: string
}


export type FetchUserParams = {
    accountToken: string
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