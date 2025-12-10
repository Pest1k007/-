// Китайские иероглифы для фона
const chineseSymbols = [
    "福", "喜", "愛", "夢", "力", "氣", "龍", "虎", "火", "水",
    "風", "山", "天", "地", "人", "心", "神", "美", "樂", "和",
    "平", "安", "幸", "運", "財", "富", "貴", "祥", "瑞", "壽",
    "春", "夏", "秋", "冬", "日", "月", "星", "辰", "光", "明"
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация загрузки
    initLoader();
    
    // Создание фоновых иероглифов для загрузки
    createLoadingSymbols();
    
    // Создание фоновых иероглифов для основного экрана
    setTimeout(() => {
        createBackgroundSymbols();
    }, 3000);
    
    // Настройка навигации
    setupNavigation();
    
    // Настройка кнопок назад
    setupBackButtons();
    
    // Настройка анимации текста
    setupTextAnimations();
    
    // Настройка эффектов при наведении
    setupHoverEffects();
});

// Функция инициализации загрузки
function initLoader() {
    const loader = document.getElementById('loader');
    const loaderFill = document.querySelector('.loader-fill');
    const mainContent = document.getElementById('main-content');
    const pulsingNickname = document.getElementById('pulsing-nickname');
    
    // Эффект мерцания ника
    let blinkInterval = setInterval(() => {
        if (pulsingNickname.style.opacity === '0.3') {
            pulsingNickname.style.opacity = '1';
        } else {
            pulsingNickname.style.opacity = '0.3';
        }
    }, 800);
    
    // Имитация загрузки
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            clearInterval(blinkInterval);
            
            // Остановка мерцания
            pulsingNickname.style.opacity = '1';
            pulsingNickname.style.animation = 'none';
            
            // Задержка перед скрытием загрузки
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.style.display = 'block';
                
                // Показать основной контент
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 800);
        }
        loaderFill.style.width = `${progress}%`;
    }, 80);
}

// Создание символов для экрана загрузки
function createLoadingSymbols() {
    const container = document.querySelector('.moving-symbols-background');
    const symbolCount = 100;
    
    for (let i = 0; i < symbolCount; i++) {
        createFallingSymbol(container, true);
    }
}

// Создание фоновых символов для основного экрана
function createBackgroundSymbols() {
    const container = document.querySelector('.background-symbols');
    const symbolCount = 80;
    
    for (let i = 0; i < symbolCount; i++) {
        createFallingSymbol(container, false);
    }
    
    // Периодически добавлять новые символы
    setInterval(() => {
        if (container.children.length < 150) {
            createFallingSymbol(container, false);
        }
    }, 2000);
}

// Создание одного падающего символа
function createFallingSymbol(container, isLoading) {
    const symbol = document.createElement('div');
    symbol.className = isLoading ? 'symbol-loading' : 'symbol';
    symbol.textContent = chineseSymbols[Math.floor(Math.random() * chineseSymbols.length)];
    
    // Случайная позиция
    const left = Math.random() * 100;
    
    // Случайный размер
    const size = isLoading ? 16 + Math.random() * 24 : 20 + Math.random() * 36;
    
    // Случайная скорость
    const duration = isLoading ? 10 + Math.random() * 20 : 15 + Math.random() * 30;
    const delay = Math.random() * 5;
    
    // Случайный оттенок
    let color;
    if (isLoading) {
        // Синие оттенки для загрузки
        const blueValue = Math.floor(100 + Math.random() * 155);
        const opacity = 0.2 + Math.random() * 0.3;
        color = `rgba(${blueValue}, ${blueValue + 50}, 255, ${opacity})`;
    } else {
        // Красные оттенки для основного фона
        const redValue = Math.floor(100 + Math.random() * 155);
        const opacity = 0.05 + Math.random() * 0.15;
        color = `rgba(${redValue}, 0, 0, ${opacity})`;
    }
    
    // Применение стилей
    symbol.style.left = `${left}%`;
    symbol.style.fontSize = `${size}px`;
    symbol.style.color = color;
    symbol.style.animationDuration = `${duration}s`;
    symbol.style.animationDelay = `${delay}s`;
    
    // Случайное вращение
    const rotation = Math.random() * 360;
    symbol.style.transform = `rotate(${rotation}deg)`;
    
    container.appendChild(symbol);
    
    // Удаление символа после завершения анимации
    setTimeout(() => {
        if (symbol.parentNode === container) {
            container.removeChild(symbol);
        }
    }, (duration + delay) * 1000);
}

// Настройка навигации
function setupNavigation() {
    const buttons = document.querySelectorAll('.btn[data-target]');
    const screens = document.querySelectorAll('.screen');
    const mainScreen = document.getElementById('home-screen');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            // Эффект клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Скрыть главный экран
            mainScreen.classList.remove('active');
            
            // Скрыть все экраны
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показать целевой экран
            setTimeout(() => {
                const targetScreen = document.getElementById(`${target}-screen`);
                if (targetScreen) {
                    targetScreen.classList.add('active');
                    // Прокрутка наверх
                    targetScreen.scrollTop = 0;
                }
            }, 300);
        });
    });
}

// Настройка кнопок назад
function setupBackButtons() {
    const backButtons = document.querySelectorAll('.back-btn');
    const screens = document.querySelectorAll('.screen');
    const mainScreen = document.getElementById('home-screen');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Эффект клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Скрыть все экраны
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показать главный экран
            setTimeout(() => {
                mainScreen.classList.add('active');
            }, 300);
        });
    });
}

// Настройка анимации текста
function setupTextAnimations() {
    const welcomeText = document.querySelector('.welcome-text');
    
    // Эффект печатания для приветствия
    const text = "Привет, друг!";
    let i = 0;
    welcomeText.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            welcomeText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Добавить курсор
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            welcomeText.appendChild(cursor);
            
            // Мигание курсора
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }
    
    // Запустить после загрузки
    setTimeout(typeWriter, 1500);
}

// Настройка эффектов при наведении
function setupHoverEffects() {
    // Эффект для всех кнопок
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            
            // Создание эффекта всплеска
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Добавляем CSS для эффекта ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Параллакс эффект для фона при скролле
let scrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const symbols = document.querySelectorAll('.symbol');
            const speed = 0.5;
            
            symbols.forEach(symbol => {
                const yPos = -(scrollPosition * speed);
                symbol.style.transform += ` translateY(${yPos}px)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Эффект для карточек при прокрутке
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    document.querySelectorAll('.price-card, .project-card, .feature-item').forEach(element => {
        observer.observe(element);
    });
}

// Запускаем анимации при прокрутке после загрузки
setTimeout(setupScrollAnimations, 2000);

// Звуковые эффекты (опционально)
function playClickSound() {
    try {
        // Создаем звуковой контекст
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Настройки звука
        oscillator.frequency.value = 600 + Math.random() * 200;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.05;
        
        // Воспроизведение
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Если AudioContext не поддерживается, игнорируем
        console.log("AudioContext not supported");
    }
}

// Добавляем звук на клики по кнопкам
document.querySelectorAll('.btn, .back-btn, .social-link').forEach(element => {
    element.addEventListener('click', playClickSound);
});

// Эффект частиц при клике на никнейм
document.querySelector('.nickname').addEventListener('click', function(e) {
    createParticleEffect(e, this);
});

function createParticleEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (let i = 0; i < 15; i++) {
        createParticle(x, y, element);
    }
}

function createParticle(x, y, parent) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.background = `hsl(${Math.random() * 60}, 100%, 50%)`;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    
    parent.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    function animate() {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        
        particle.style.transform = `translate(${posX}px, ${posY}px)`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
                                     }
