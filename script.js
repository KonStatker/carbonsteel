// Импорт конфигурации
import { ANNOUNCEMENT } from './config.js';
import { CRYPTO_WALLETS } from './config.js';
import { INSTRUCTIONS_BY_PLATFORM } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Верхняя панель-объявление
    if (ANNOUNCEMENT && ANNOUNCEMENT.enabled && ANNOUNCEMENT.message && ANNOUNCEMENT.message.trim()) {
        const bar = document.createElement('div');
        const typeClass = ['warning','info','success'].includes(ANNOUNCEMENT.type) ? ANNOUNCEMENT.type : 'info';
        bar.className = `top-announcement ${typeClass}`;
        bar.setAttribute('role', 'status');
        bar.setAttribute('aria-live', 'polite');
        bar.innerHTML = `
            <div class="top-announcement-inner">
                <div class="top-announcement-message">${ANNOUNCEMENT.message}</div>
                <button class="close-btn" aria-label="Закрыть объявление">Закрыть</button>
            </div>
        `;
        document.body.prepend(bar);
        const adjustOffset = () => {
            const container = document.querySelector('.container');
            if (container) {
                container.style.marginTop = `${bar.getBoundingClientRect().height + 10}px`;
            }
        };
        adjustOffset();
        window.addEventListener('resize', adjustOffset);
        bar.querySelector('.close-btn').addEventListener('click', () => {
            bar.remove();
            const container = document.querySelector('.container');
            if (container) container.style.marginTop = '';
        });
    }
    
    // Создаем частицы
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }

    // Кнопка "Наверх"
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Переключение платформ и инициализация выбора приложений
document.addEventListener('DOMContentLoaded', function() {
    const platformTabs = document.querySelectorAll('.platform-tab');
    platformTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            platformTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.instruction-block').forEach(block => {
                block.style.display = 'none';
            });
            
            const platform = this.dataset.platform;
            const instructionBlock = document.querySelector(`.${platform}-instructions`);
            if (instructionBlock) {
                instructionBlock.style.display = 'block';
                initAppSelector(platform);
            }
        });
    });

    // Модальное окно для изображений
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    const modalImage = document.createElement('img');
    modalImage.className = 'modal-image';
    modalOverlay.appendChild(modalImage);
    document.body.appendChild(modalOverlay);

    const handleImageClick = (img) => {
        modalImage.src = img.src;
        modalOverlay.classList.add('active');
    };

    document.querySelectorAll('.zoomable-image').forEach(img => {
        img.addEventListener('click', () => handleImageClick(img));
    });

    modalOverlay.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
    
    // Инициализация для Android при загрузке
    initAppSelector('android');
    
    // Инициализация кнопок копирования маршрутизации при загрузке
    document.querySelectorAll('.copy-routing-btn').forEach(btn => {
        btn.addEventListener('click', () => copyRoutingFile(btn));
    });
}); 

// Инициализация выбора приложений
function initAppSelector(platform) {
    const instructionBlock = document.querySelector(`.${platform}-instructions`);
    if (!instructionBlock) return;
    
    const instructions = INSTRUCTIONS_BY_PLATFORM[platform];
    if (!instructions) return;

    const enabledInstructions = instructions.filter(inst => inst.enabled);
    if (enabledInstructions.length === 0) return;
    
    let appSelector = instructionBlock.querySelector('.app-selector');
    if (!appSelector) {
        appSelector = document.createElement('div');
        appSelector.className = 'app-selector';
        instructionBlock.insertBefore(appSelector, instructionBlock.firstChild);
    } else {
        appSelector.innerHTML = '';
    }
    
    enabledInstructions.forEach((instruction, index) => {
        const button = document.createElement('button');
        button.className = 'app-tab' + (index === 0 ? ' active' : '');
        button.textContent = instruction.name;
        button.setAttribute('data-app-id', instruction.id);
        button.addEventListener('click', () => switchApp(platform, instruction.id));
        appSelector.appendChild(button);
    });
    
    if (enabledInstructions.length > 0) {
        switchApp(platform, enabledInstructions[0].id);
    }
}

// Переключение между приложениями
function switchApp(platform, appId) {
    const instructionBlock = document.querySelector(`.${platform}-instructions`);
    if (!instructionBlock) return;
    
    // Обновляем активную кнопку
    instructionBlock.querySelectorAll('.app-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-app-id') === appId);
    });
    
    // Скрываем все инструкции
    instructionBlock.querySelectorAll('.app-instruction').forEach(inst => {
        inst.style.display = 'none';
    });
    
    // Показываем выбранную инструкцию
    const selectedInstruction = instructionBlock.querySelector(`.app-instruction[data-app-id="${appId}"]`);
    if (selectedInstruction) {
        selectedInstruction.style.display = 'block';
        
        // Добавляем обработчики для изображений
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalImage = modalOverlay.querySelector('.modal-image');
        selectedInstruction.querySelectorAll('.zoomable-image').forEach(img => {
            img.addEventListener('click', () => {
                modalImage.src = img.src;
                modalOverlay.classList.add('active');
            });
        });
        
        // Добавляем обработчики для кнопок копирования маршрутизации
        selectedInstruction.querySelectorAll('.copy-routing-btn').forEach(btn => {
            btn.addEventListener('click', () => copyRoutingFile(btn));
        });
    }
}

// FAQ
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
});

// Вложенные FAQ
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-subcontainer').forEach(container => {
        container.querySelectorAll('.faq-subitem').forEach(item => {
            item.querySelector('.faq-subquestion').addEventListener('click', () => {
                container.querySelectorAll('.faq-subitem').forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        });
    });
});

// Боковая навигация
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('#intro-section, #downloads-section, #instructions-section, #faq-section');
    const navDots = document.querySelectorAll('.nav-dot');

    function updateActiveSection() {
        let currentSection = null;
        let minDistance = Infinity;
        sections.forEach(section => {
            const distance = Math.abs(section.getBoundingClientRect().top);
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        });
        if (currentSection) {
            navDots.forEach(dot => {
                dot.classList.toggle('active', dot.getAttribute('href') === `#${currentSection.id}`);
            });
        }
    }

    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('load', updateActiveSection);
    window.addEventListener('resize', updateActiveSection);

    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 20;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}); 

// Криптовалюты
function initCryptoWallets() {
    const cryptoTabs = document.getElementById('cryptoTabs');
    const cryptoContent = document.getElementById('cryptoContent');
    if (!cryptoTabs || !cryptoContent || !CRYPTO_WALLETS?.length) return;
    
    cryptoTabs.innerHTML = '';
    cryptoContent.innerHTML = '';
    
    CRYPTO_WALLETS.forEach((wallet, index) => {
        const tab = document.createElement('button');
        tab.className = 'crypto-tab' + (index === 0 ? ' active' : '');
        tab.textContent = `${wallet.name} (${wallet.network})`;
        tab.addEventListener('click', () => switchCryptoTab(index));
        cryptoTabs.appendChild(tab);
    });
    
    if (CRYPTO_WALLETS.length > 0) switchCryptoTab(0);
}

function switchCryptoTab(index) {
    const cryptoTabs = document.querySelectorAll('.crypto-tab');
    const cryptoContent = document.getElementById('cryptoContent');
    if (!cryptoContent || !CRYPTO_WALLETS?.[index]) return;
    
    cryptoTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    
    const wallet = CRYPTO_WALLETS[index];
    const escapedAddress = wallet.address.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    cryptoContent.innerHTML = `
        <div style="font-size: 1.1em; color: #90CAF9; margin-bottom: 1em; text-align: center;">
            ${wallet.name}, сеть ${wallet.network}
        </div>
        <div class="crypto-wallet-address">${escapedAddress}</div>
        <button class="support-btn ${wallet.buttonClass}" style="margin-bottom: 1em;">
            Скопировать адрес
        </button>
    `;
    
    cryptoContent.querySelector('button').addEventListener('click', function() {
        navigator.clipboard.writeText(wallet.address).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Скопировано!';
            setTimeout(() => { this.textContent = originalText; }, 1500);
        }).catch(() => alert('Адрес: ' + wallet.address));
    });
}

// Копирование файла маршрутизации в буфер обмена
async function copyRoutingFile(button) {
    const fileName = button.getAttribute('data-routing-file');
    if (!fileName) return;
    
    const originalText = button.innerHTML;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error('Не удалось загрузить файл');
        
        const jsonData = await response.json();
        const jsonString = JSON.stringify(jsonData, null, 2);
        
        await navigator.clipboard.writeText(jsonString);
        
        button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Скопировано!
        `;
        button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);
    } catch (error) {
        console.error('Ошибка при копировании:', error);
        button.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Ошибка
        `;
        button.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);
    }
}

// Модальные окна поддержки
document.addEventListener('DOMContentLoaded', function() {
    const cardBtn = document.getElementById('cardSupportBtn');
    const cryptoBtn = document.getElementById('cryptoSupportBtn');
    if (cardBtn) {
        cardBtn.addEventListener('click', () => {
            document.getElementById('modalCard').classList.add('active');
        });
    }
    if (cryptoBtn) {
        cryptoBtn.addEventListener('click', () => {
            initCryptoWallets();
            document.getElementById('modalCrypto').classList.add('active');
        });
    }
    
    // Инициализация кнопок копирования маршрутизации при загрузке
    document.querySelectorAll('.copy-routing-btn').forEach(btn => {
        btn.addEventListener('click', () => copyRoutingFile(btn));
    });
}); 
