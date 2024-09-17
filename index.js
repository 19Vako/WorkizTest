import axios from 'axios';

async function createDealInPipedrive(dealData) {
    const apiToken = '5c7bc4257c283e0a7a606fd7de83b9447e845445';  // Используйте переменные окружения для хранения токенов
    const url = `https://api.pipedrive.com/v1/deals?api_token=${apiToken}`;

    try {
        const response = await axios.post(url, dealData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.success) {
            console.log('Сделка успешно создана:', response.data.data);
        } else {
            console.error('Ошибка при создании сделки:', response.data);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

function getIframeData() {
    const iframe = document.querySelector('iframe');
    
    if (!iframe) {
        console.error('Iframe не найден');
        return null;
    }

    const iframeWindow = iframe.contentWindow;
    
    if (!iframeWindow) {
        console.error('Не удалось получить окно iframe');
        return null;
    }

    const getValue = (id) => {
        const element = iframeWindow.document.getElementById(id);
        return element ? element.value.trim() : '';
    };

    const firstName = getValue('firstName');
    const lastName = getValue('lastName');
    const phone = getValue('phone');
    const email = getValue('email');
    const jobType = getValue('jobType');
    const address = getValue('address');

    // Валидация данных
    if (!firstName || !lastName || !email) {
        console.error('Недостаточно данных для создания сделки');
        return null;
    }

    return {
        title: `${firstName} ${lastName} - ${jobType}`, // Название сделки
        person_name: `${firstName} ${lastName}`,
        phone: phone,
        email: email,
        address: address,
        value: 1000,  // Пример стоимости сделки
        currency: 'USD',  // Валюта
        status: 'open'  // Статус сделки
    };
}

// Использование
const dealData = getIframeData();  // Получаем данные из iframe
if (dealData) {
    createDealInPipedrive(dealData);   // Отправляем запрос в Pipedrive
}
