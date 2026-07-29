(function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const closeResultsBtn = document.getElementById('closeResults');

    const searchableContent = [
        {
            type: 'article',
            title: 'Учитель из Флориды, который высмеивал внешность и интеллект своих учеников, теперь сам оказался на грани увольнения',
            desc: 'Учитель из Флориды под огнем критики после того, как якобы насмехался над внешностью и интеллектом своих учеников перед всем классом.',
            url: 'https://www.thesmokinggun.com/buster/florida/florida-teacher-mocks-students-768562',
            badge: 'сегодня'
        },
        {
            type: 'article',
            title: 'Арестован мужчина, который мыл рот своей девушке жидким средством для мытья посуды за сквернословие',
            desc: 'Домашняя ссора принимает странный оборот после того, как мужчина попытался «очистить» лексикон своей партнерши с помощью средства для мытья посуды.',
            url: 'https://www.thesmokinggun.com/buster/domestic-abuse/man-busted-for-soap-attack-546091',
            badge: 'вчера'
        },
        {
            type: 'article',
            title: 'Под замком: полиция Пенсильвании арестовала двадцатилетнего наркоторговца, который удерживал найденный iPhone женщины и требовал за него выкуп',
            desc: '20-летний дилер за решеткой после того, как потребовал выкуп за потерянный iPhone — схема быстро рухнула.',
            url: 'https://www.thesmokinggun.com/buster/iphone-held-for-ransom-687341',
            badge: 'эта неделя'
        },
        {
            type: 'tattle',
            title: 'Пресс-пропуск: Тайный ужин Потрошителя — закулисный репортаж с неофициального приёма ФБР',
            desc: 'Эксклюзивные подробности с конфиденциального ужина, где умы ФБР обсуждали Чесапикского Потрошителя — и, возможно, ужинали с ним.',
            url: 'https://i.pinimg.com/736x/e5/ea/7c/e5ea7c48233acbc7dee3166dbff428d1.jpg',
            badge: 'прошлая неделя'
        },
        {
            type: 'interview',
            title: 'КАК ПОТРОШИТЕЛЬ ПОТРОШИТ: ЭКСКЛЮЗИВНОЕ ИНТЕРВЬЮ',
            desc: 'Нечто ужасное скрывается в стенах Балтиморской государственной психиатрической больницы для особо опасных преступников. Доктор Абель Гидеон, возможно, и есть Чесапикский Потрошитель.',
            url: 'articles/art-ripper.html',
            badge: 'интервью'
        },
        {
            type: 'interview',
            title: 'ВОР ЗАКУСОК СОВЕРШАЕТ УДАР И ЕМУ НЕ СТЫДНО!',
            desc: 'Он не оставляет отпечатков пальцев — только крошки. По словам полиции, преступник «опасно прожорлив». Нечто одновременно жуткое и жевательное скрывается в комнате отдыха окружного управления пробации Фентона.',
            url: 'articles/snack-slasher.html',
            badge: 'интервью'
        },
        {
            type: 'interview',
            title: 'БЕЛЫЕ УСЫ И ТИХИЕ ЛАПКИ: КТО ТОПЧЕТ МОИ ЦВЕТЫ??',
            desc: 'Будьте осторожны! Рыжие коты невероятно очаровательны. В настоящее время в Балтиморе действует целая банда рыжих пушистиков, покоряющая всех вокруг.',
            url: '#',
            badge: 'интервью'
        },
        {
            type: 'telegram',
            title: 'Ого! Невероятно замечательный переводчик',
            desc: 'Невероятно замечательный переводчик переводит невероятно замечательные вещи! Мы любим тебя, Ягняние Молчат!',
            url: 'https://t.me/lecterpurr',
            badge: 'дополнительно'
        },
        {
            type: 'telegram',
            title: 'Хе-хе, здесь очень прелестно!',
            desc: 'Целый канал, посвящённый HEU? Вам стоит изучить это подробнее! Ездим на двух лошадях с 2004-го года.',
            url: 'https://t.me/heuconfession',
            badge: 'дополнительно'
        },
        {
            type: 'telegram',
            title: 'Гляди! Такой милый тгк с потрясающим оформлением уже ждёт тебя!',
            desc: 'Такой милый тгк с потрясающим оформлением уже ждёт тебя!',
            url: 'https://t.me/madsmikklsns_church',
            badge: 'дополнительно'
        }
    ];

    function performSearch() {
        if (!resultsContainer || !resultsList) return;
        const query = searchInput.value.trim().toLowerCase();
        if (query === '') {
            resultsContainer.style.display = 'none';
            return;
        }

        const results = searchableContent.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            resultsList.innerHTML = '<div class="search-result-item">Ничего не найдено. Попробуйте другое слово.</div>';
        } else {
            resultsList.innerHTML = results.map(item => `
                <div class="search-result-item">
                    <div class="search-result-title">
                        <a href="${item.url}" target="${item.url.startsWith('http') ? '_blank' : '_self'}">${highlightText(item.title, query)}</a>
                    </div>
                    <div class="search-result-desc">${highlightText(item.desc, query)}</div>
                    <div class="search-result-meta">${item.type.toUpperCase()} • ${item.badge}</div>
                </div>
            `).join('');
        }

        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark style="background:#f9e7b3; color:#111;">$1</mark>');
    }

    function closeResults() {
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (searchInput) searchInput.value = '';
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    if (closeResultsBtn) {
        closeResultsBtn.addEventListener('click', closeResults);
    }

    const modal = document.getElementById('authModal');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');
    const authForm = document.getElementById('authForm');
    const usernameInput = document.getElementById('modalUsername');
    const passwordInput = document.getElementById('modalPassword');
    const confirmGroup = document.getElementById('confirmPasswordGroup');
    const confirmInput = document.getElementById('modalConfirmPassword');

    let currentMode = 'login';

    function openModal(mode) {
        currentMode = mode;
        usernameInput.value = '';
        passwordInput.value = '';
        if (confirmInput) confirmInput.value = '';
        usernameInput.setCustomValidity('');
        passwordInput.setCustomValidity('');
        if (confirmInput) confirmInput.setCustomValidity('');

        if (mode === 'login') {
            modalTitle.textContent = 'Войти';
            modalSubmitBtn.textContent = 'Войти';
            confirmGroup.style.display = 'none';
            confirmInput.removeAttribute('required');
        } else {
            modalTitle.textContent = 'Регистрация';
            modalSubmitBtn.textContent = 'Зарегистрироваться';
            confirmGroup.style.display = 'block';
            confirmInput.setAttribute('required', 'required');
        }
        modal.style.display = 'flex';
        setTimeout(() => usernameInput.focus(), 50);
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showJokeMessage() {
        alert('Извините, этот сайт — просто шутка. Вы не можете зарегистрироваться или войти, глупыш. :)');
    }

    function handleSubmit(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '') {
            alert('Пожалуйста, введите имя пользователя.');
            usernameInput.focus();
            return false;
        }
        if (password === '') {
            alert('Пожалуйста, введите пароль.');
            passwordInput.focus();
            return false;
        }

        if (currentMode === 'signup') {
            const confirm = confirmInput.value.trim();
            if (confirm === '') {
                alert('Пожалуйста, подтвердите пароль.');
                confirmInput.focus();
                return false;
            }
            if (password !== confirm) {
                alert('Пароли не совпадают. Попробуйте ещё раз.');
                confirmInput.focus();
                return false;
            }
        }

        showJokeMessage();
        closeModal();
        return false;
    }

    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('login');
        });
    }
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('signup');
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (authForm) {
        authForm.addEventListener('submit', handleSubmit);
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const candidCards = document.querySelectorAll('.candid-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeLightbox = document.querySelector('.lightbox-close');
        const prevDot = document.querySelector('.prev-dot');
        const nextDot = document.querySelector('.next-dot');
        const downloadBtn = document.getElementById('download-btn');

        if (candidCards.length && lightbox) {
            let currentIndex = 0;
            const images = [];
            candidCards.forEach((card, idx) => {
                const img = card.querySelector('img');
                if (img) images.push(img.src);
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = idx;
                    openLightbox(currentIndex);
                });
            });

            function openLightbox(index) {
                if (!lightbox || !lightboxImg) return;
                lightbox.style.display = 'flex';
                lightboxImg.src = images[index];
                updateDownloadLink(index);
            }

            function updateDownloadLink(index) {
                if (!downloadBtn) return;
                const url = images[index];
                downloadBtn.href = url;
                downloadBtn.download = `candid_${index+1}.jpg`;
            }

            function showNext() {
                if (!images.length) return;
                currentIndex = (currentIndex + 1) % images.length;
                lightboxImg.src = images[currentIndex];
                updateDownloadLink(currentIndex);
            }

            function showPrev() {
                if (!images.length) return;
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                lightboxImg.src = images[currentIndex];
                updateDownloadLink(currentIndex);
            }

            if (prevDot) prevDot.addEventListener('click', showPrev);
            if (nextDot) nextDot.addEventListener('click', showNext);
            if (closeLightbox) closeLightbox.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
            window.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.style.display = 'none';
            });
            document.addEventListener('keydown', (e) => {
                if (lightbox && lightbox.style.display === 'flex') {
                    if (e.key === 'ArrowLeft') showPrev();
                    else if (e.key === 'ArrowRight') showNext();
                    else if (e.key === 'Escape') lightbox.style.display = 'none';
                }
            });
        }
    });

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const questions = [
            {
                question: 'Где Вы бы стали искать информацию в первую очередь?',
                options: ['Интернет.', 'Газетные архивы и справочники.', 'Личное интервью.'],
                correct: 2
            },
            {
                question: 'Вы ранены после личного расследования. Не критично, но есть риск осложнений.',
                options: ['Поход в больницу, даже если врачи будут спрашивать, откуда такая рана.', 'Самостоятельно окажу себе помощь.', '"Само пройдёт."'],
                correct: 1
            },
            {
                question: 'Сомнительный источник дал сомнительные данные. Пойдёте ли Вы их проверять самостоятельно на нужном месте?',
                options: ['Сначала проверю информацию и пойду, если это будет убедительно.', 'Любая игра стоит свеч. Я пойду.', 'Ни в коем случае не пойду, если это не проверенный человек.'],
                correct: 0
            },
            {
                question: 'Кажется, на Вас вышел преступник или считающий себя таковым. Что нужно делать с этим?',
                options: ['Звонок в полицию.', 'Возьму интервью и потом поработаю с материалом.', 'Буду выстраивать доверительные отношения. Может, это просто больной человек, который нуждается в заботе?'],
                correct: 1
            },
            {
                question: 'Вам нужно попасть на место. Какой у вас транспорт?',
                options: ['Байк/Велосипед.', 'Пешком.', 'Машина.'],
                correct: 2
            },
            {
                question: 'Если бы тебе предложили прочитать дневники убийцы до того, как их отдадут в ФБР, ты бы согласилась?',
                options: ['Я бы вырвала страницы для своей книги.', 'Нет, это улики.', 'Я бы сделала копии и вернула оригинал.'],
                correct: 0
            },
            {
                question: 'Кто такой Ганнибал Лектер?',
                options: ['Невиновный.', 'Каннибал.', 'Убийца.'],
                correct: 2
            },
            {
                question: 'Кто такой Уилл Грэм?',
                options: ['Невиновный.', 'Аутист.', 'Убийца.'],
                correct: 2
            },
            {
                question: 'Кто такие Уилл и Ганнибал?',
                options: ['Мужья-убийцы.', 'Люди с "folie à deux" - безумием на двоих.', 'Двое больных людей.'],
                correct: 0
            },
            {
                question: 'Кто такая Фредди Лаундс?',
                options: ['Самый прелестный журналист на свете.', 'Выскочка.', 'Рыжая бестия.'],
                correct: 0
            }
        ];

        let currentIndex = 0;
        let correctCount = 0;
        let answered = false;

        const questionNumberEl = document.getElementById('question-number');
        const questionTextEl = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const resultArea = document.getElementById('result-area');
        const questionArea = document.getElementById('question-area');

        function renderQuestion(index) {
            if (index >= questions.length) {
                showResult();
                return;
            }
            answered = false;
            const q = questions[index];
            questionNumberEl.textContent = 'Вопрос ' + (index + 1) + ' из ' + questions.length;
            questionTextEl.textContent = q.question;
            optionsContainer.innerHTML = '';
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = opt;
                btn.dataset.index = idx;
                btn.addEventListener('click', function(e) {
                    if (answered) return;
                    answered = true;
                    if (idx === q.correct) {
                        correctCount++;
                    }
                    renderQuestion(index + 1);
                });
                optionsContainer.appendChild(btn);
            });
            resultArea.style.display = 'none';
            questionArea.style.display = 'block';
        }

        function showResult() {
            questionArea.style.display = 'none';
            resultArea.style.display = 'block';
            let message, badgeText;
            if (correctCount >= 8) {
                message = 'Вы нам подходите.';
                badgeText = 'ПОДХОДИТЕ';
            } else if (correctCount >= 5) {
                message = 'Есть над чем работать.';
                badgeText = 'РАБОТАТЬ';
            } else {
                message = 'Уходи.';
                badgeText = 'УХОДИ';
                window.location.href = 'void.html';
                return;
            }
            resultArea.innerHTML = `
                <h2>Результат</h2>
                <p>${message}</p>
                <p>Правильных ответов: ${correctCount} из ${questions.length}</p>
                <div class="result-badge">${badgeText}</div>
            `;
        }

        renderQuestion(0);
    }
})();
