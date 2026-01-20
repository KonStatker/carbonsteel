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

// Конфигурация инструкций
// Android
export const ANDROID_INSTRUCTIONS = [
    { id: 'v2rayng', name: 'v2rayNG', enabled: true },
    { id: 'nekobox', name: 'NekoBox', enabled: true },
    { id: 'v2box', name: 'V2Box', enabled: true }
];

// Windows
export const WINDOWS_INSTRUCTIONS = [
    { id: 'v2rayn', name: 'v2rayN', enabled: true },
    { id: 'nekoray', name: 'NekoRay', enabled: true }
];

// macOS
export const MACOS_INSTRUCTIONS = [
    { id: 'v2raynmac', name: 'v2RayN', enabled: true },
    { id: 'macos2', name: 'MacOS2', enabled: false }
];

// iOS
export const IOS_INSTRUCTIONS = [
    { id: 'v2box', name: 'V2Box', enabled: true },
    { id: 'stash', name: 'Stash', enabled: false }
];

// Универсальные (CLI / manual)
export const UNIVERSAL_INSTRUCTIONS = [
    { id: 'hiddify', name: 'Hiddify', enabled: true },
    { id: 'sing-box', name: 'Sing-box', enabled: false }
];

export const INSTRUCTIONS_BY_PLATFORM = {
    android: ANDROID_INSTRUCTIONS,
    windows: WINDOWS_INSTRUCTIONS,
    macos: MACOS_INSTRUCTIONS,
    ios: IOS_INSTRUCTIONS,
    universal: UNIVERSAL_INSTRUCTIONS
};