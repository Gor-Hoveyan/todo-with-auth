async function createTodo(content: string, creator: string) {
    try {
        await fetch('http://localhost:3000/api/todos/createTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                creator: creator
            }),
        });
    } catch (e) {
        console.log('Error', e)
    }
}

async function deleteTodo(id: string, creator: string) {
    try {
        await fetch('http://localhost:3000/api/todos/removeTodo', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                creator: creator
            }),
        });
    } catch(e) {
        console.log('Error', e);
    }
}

async function removeFewTodos(creator: string, todos: string[]) {
    try {
        const res = await fetch(`http://localhost:3000/api/todos/removeFewTodos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creator: creator,
                todos: todos,
            })
        });
        return res.json();
    } catch(e) {
        console.log('Error', e)
    }
    
}

async function updateTodo(id: string, creator: string, newContent: string) {
    await fetch('http://localhost:3000/api/todos/updateTodo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            creator: creator,
            newContent: newContent
        })
    });
    
}

export const todosApi = { createTodo, deleteTodo, removeFewTodos ,updateTodo };