// Конфигурация для верхней панели-объявления
// Если enabled=false или пустое message — панель не показывается
export const ANNOUNCEMENT = {
    enabled: false,
    // Пример сообщения:
    // message: '⚠️ Мы подверглись DDoS-атаке.\nВозможны перебои.\nКоманда уже работает над решением.',
    message: '',
    // Тип влияет на цвета оформления: 'info' | 'warning' | 'success'
    type: 'info'
};

// Конфигурация криптовалютных реквизитов для поддержки
export const CRYPTO_WALLETS = [
    {
        name: 'USDT',
        network: 'TON',
        address: 'UQA4_6cmAKFIv4BuOpQsfeYAcPLHf5tKvKTPlGzyLz0Ilfs7',
        buttonClass: 'ton-btn'
    },
    {
        name: 'USDT',
        network: 'TRC20',
        address: 'TNeLaxJjeg7YLxNNLXcAqunVigbFBEsKuJ',
        buttonClass: 'trc20-btn'
    }
];

// Конфигурация инструкций для Android (только метаданные)
export const ANDROID_INSTRUCTIONS = [
    {
        id: 'v2rayng',
        name: 'v2rayNG',
        enabled: true
    },
    {
        id: 'nekobox',
        name: 'NekoBox',
        enabled: true
    }
];

// Конфигурация инструкций для Windows (только метаданные)
export const WINDOWS_INSTRUCTIONS = [
    {
        id: 'v2rayn',
        name: 'v2rayN',
        enabled: true
    },
    {
        id: 'nekoray',
        name: 'Nekoray',
        enabled: true
    }
];
