(function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const closeResultsBtn = document.getElementById('closeResults');

    const searchableContent = [
        { type: 'article', title: 'Florida Teacher Who Mocked Looks, Brains Of His Students Now On Firing Line', desc: 'Florida teacher under fire after allegedly mocking the appearance and intelligence of his students in front of the whole class.', url: 'https://www.thesmokinggun.com/buster/florida/florida-teacher-mocks-students-768562', badge: 'today' },
        { type: 'article', title: 'Man Arrested For Washing Cursing Girlfriend\'s Mouth Out With Liquid Dish Soap', desc: 'Domestic disturbance takes a bizarre turn after a man tries to "cleanse" his partner\'s vocabulary with dish soap.', url: 'https://www.thesmokinggun.com/buster/domestic-abuse/man-busted-for-soap-attack-546091', badge: 'yesterday' },
        { type: 'article', title: 'Locked Up: Pennsylvania Cops Arrest Dealer, 20, Who Held Woman\'s Lost iPhone For Ransom', desc: 'A 20-year-old dealer is behind bars after demanding ransom for a lost iPhone — a scheme that quickly crumbled.', url: 'https://www.thesmokinggun.com/buster/iphone-held-for-ransom-687341', badge: 'this week' },
        { type: 'article', title: 'Press Pass: The Ripper\'s Secret Supper - Inside the FBI\'s Off-the-Record Dinner', desc: 'Exclusive details from a confidential dinner where FBI minds discussed the Chesapeake Ripper — and possibly dined with him.', url: 'articles/art-press-pass.html', badge: 'last week' },
        { type: 'article', title: 'HOW THE RIPPER RIPS: AN EXCLUSIVE INTERVIEW', desc: 'Something terrible lurks within the walls of the Baltimore State Hospital for the Criminally Insane. Dr. Abel Gideon might be the Chesapeake Ripper.', url: 'articles/art-ripper.html', badge: 'feature' },
        { type: 'article', title: 'THE SNACK SLASHER STRIKES AGAIN — AND HE\'S NOT SORRY!', desc: 'He leaves no fingerprints, only crumbs. Police say the culprit is "dangerously peckish."', url: '#', badge: 'feature' },
        { type: 'article', title: 'WHITE MUSTACHES AND QUIET PAWS: WHO STEP ON MY FLOWERS?', desc: 'Be careful! Ginger cats are incredibly adorable. A gang of ginger fluffballs is currently operating in Baltimore.', url: '#', badge: 'feature' },
        { type: 'tattle', title: 'Florida Teacher Mocking Students', desc: 'Florida Teacher Who Mocked Looks, Brains Of His Students Now On Firing Line', url: 'https://www.thesmokinggun.com/buster/florida/florida-teacher-mocks-students-768562', badge: 'today' },
        { type: 'tattle', title: 'Dish Soap Attack', desc: 'Man Arrested For Washing Cursing Girlfriend\'s Mouth Out With Liquid Dish Soap', url: 'https://www.thesmokinggun.com/buster/domestic-abuse/man-busted-for-soap-attack-546091', badge: 'yesterday' },
        { type: 'tattle', title: 'iPhone Ransom', desc: 'Pennsylvania Cops Arrest Dealer, 20. Who Held Woman\'s Lost iPhone For Ransom', url: 'https://www.thesmokinggun.com/buster/iphone-held-for-ransom-687341', badge: 'this week' },
        { type: 'tattle', title: 'Ripper\'s Secret Supper', desc: 'Press Pass: The Ripper\'s Secret Supper - Inside the FBI\'s Off-the-Record Dinner', url: 'https://i.pinimg.com/736x/e5/ea/7c/e5ea7c48233acbc7dee3166dbff428d1.jpg', badge: 'last week' },
        { type: 'tattle', title: 'Wonderful Translator', desc: 'An incredibly wonderful translator translates incredibly wonderful things! We love you, bleating of the silambs!', url: 'https://t.me/lecterpurr', badge: 'extra' },
        { type: 'tattle', title: 'HEU Confession', desc: 'A whole channel dedicated to HEU? You should explore this further! Riding on two different horses since 2004.', url: 'https://t.me/heuconfession', badge: 'extra' },
        { type: 'tattle', title: 'Hannibal Confession', desc: 'The coolest Hannibal Confession is already waiting for you! There\'s plenty to enjoy here.', url: 'https://t.me/hannibalek', badge: 'extra' },
        { type: 'telegram', title: 'Gasp! An incredibly wonderful translator', desc: 'We love you, bleating of the silambs! A tribute to the translator who brings dark corners to light.', url: 'https://t.me/lecterpurr', badge: 'extra' },
        { type: 'telegram', title: 'Hehe, it\'s very beautiful here!', desc: 'A whole channel dedicated to HEU? You should explore this further! Riding on two different horses since 2004.', url: 'https://t.me/heuconfession', badge: 'extra' },
        { type: 'telegram', title: 'Look! The coolest Hannibal Confession', desc: 'Unseen files, confessions, and the whispers of Baltimore\'s darkest society.', url: 'https://t.me/hannibalek', badge: 'extra' },
        { type: 'interview', title: 'HOW THE RIPPER RIPS: AN EXCLUSIVE INTERVIEW', desc: 'Something terrible lurks within the walls of the Baltimore State Hospital for the Criminally Insane. Dr. Abel Gideon might be the Chesapeake Ripper.', url: 'articles/art-ripper.html', badge: 'interview' },
        { type: 'interview', title: 'THE SNACK SLASHER STRIKES AGAIN', desc: 'He leaves no fingerprints, only crumbs. Police say the culprit is "dangerously peckish."', url: '#', badge: 'interview' },
        { type: 'interview', title: 'WHITE MUSTACHES AND QUIET PAWS', desc: 'Be careful! Ginger cats are incredibly adorable. A gang of ginger fluffballs is currently operating in Baltimore.', url: '#', badge: 'interview' }
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
            resultsList.innerHTML = '<div class="search-result-item">No results found. Try a different keyword.</div>';
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
            modalTitle.textContent = 'Login';
            modalSubmitBtn.textContent = 'Login';
            confirmGroup.style.display = 'none';
            confirmInput.removeAttribute('required');
        } else {
            modalTitle.textContent = 'Sign Up';
            modalSubmitBtn.textContent = 'Sign Up';
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
        alert("Sorry, this website is just a joke. You can't register or log in, silly. :)");
    }
    function handleSubmit(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username === '') {
            alert("Please enter a username.");
            usernameInput.focus();
            return false;
        }
        if (password === '') {
            alert("Please enter a password.");
            passwordInput.focus();
            return false;
        }
        
        if (currentMode === 'signup') {
            const confirm = confirmInput.value.trim();
            if (confirm === '') {
                alert("Please confirm your password.");
                confirmInput.focus();
                return false;
            }
            if (password !== confirm) {
                alert("Passwords do not match. Try again.");
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
})();
