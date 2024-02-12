

async function login(userName: string, password: string) {
    const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    });
    return res.json();
}

async function register(userName: string, password: string) {
    const res = await fetch(`http://localhost:3000/api/auth/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    });
    return res.json();
}

async function authoLog() {
    const res = await fetch(`http://localhost:3000/api/auth/authoLog`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.json();
}

export const authApi = { login, register, authoLog };