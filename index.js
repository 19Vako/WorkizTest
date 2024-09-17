import axios from 'axios';

async function createDealInPipedrive(dealData) {
    const apiToken = '31a5e6fe0484aca9f28b4c4dab15a47f7ad9ab5e';  // Замените на ваш реальный API токен
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

// Пример получения данных из iframe и создания сделки
function getIframeData() {
    const iframe = document.querySelector('iframe');
    const iframeWindow = iframe.contentWindow;

    // Получение данных из полей формы iframe
    const firstName = iframeWindow.document.getElementById('firstName').value;
    const lastName = iframeWindow.document.getElementById('lastName').value;
    const phone = iframeWindow.document.getElementById('phone').value;
    const email = iframeWindow.document.getElementById('email').value;
    const jobType = iframeWindow.document.getElementById('jobType').value;
    const address = iframeWindow.document.getElementById('address').value;

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
createDealInPipedrive(dealData);   // Отправляем запрос в Pipedrive
