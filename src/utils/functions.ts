export function getCookie(): string {
    let cookieValue: string = '';

    let cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        cookies.map(cookie => {
            if(cookie.includes('token')) {
                cookieValue = cookie.substring(6);
            }
        })
    }
    return cookieValue;
}