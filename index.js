// Получение параметров из URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        code: params.get('code'),
        state: params.get('state'),
    };
}

// Пример обработки параметров
document.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();
    if (params.code) {
        console.log('Authorization code:', params.code);
        // Выполните действия с авторизационным кодом
    }
});
