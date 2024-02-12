export function getCookie(): string {
    let cookieValue: string = '';

    let cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        cookies.map(cookie => {
            if(cookie.includes('token') && !cookie.endsWith('undefined')) {
                cookieValue = cookie.substring(6);
            }
        })
    }
    return cookieValue;
}

export function clearAllCookies() {
    // Получаем текущие куки
    let cookies = document.cookie.split(";");
  debugger
    // Проходим по всем кукам и устанавливаем их срок действия в прошедшее время
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }