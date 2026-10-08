var params = new URLSearchParams(window.location.search);
var ROUTES = {
    home: 'home.html',
    services: 'services.html',
    search: 'search.html',
    qr: 'qr.html',
    more: 'more.html',
    moreid: 'moreid.html',
    id: 'id.html',
    shortcuts: 'shortcuts.html',
    pesel: 'pesel.html',
    scanqr: 'scanqr.html',
    showqr: 'showqr.html',
    gen: 'gen.html',
    card: 'card.html',
    selectdocs: 'selectdocs.html',
    lockdoc: 'lockdoc.html',
    safenet: 'safenet.html',
    checkid: 'checkid.html',
    checkpesel: 'checkpesel.html',
    defensetraining: 'defensetraining.html',
    safetyguide: 'safetyguide.html',
    prescriptions: 'prescriptions.html',
    regdata: 'regdata.html',
    passportdata: 'passportdata.html',
    biometrics: 'biometrics.html',
    appearance: 'appearance.html',
    notifications: 'notifications.html',
    language: 'language.html',
    certificates: 'certificates.html',
    history: 'history.html',
    about: 'about.html',
    support: 'support.html',
    rateapp: 'rateapp.html',
    assistant: 'assistant.html',
    voteidea: 'voteidea.html'
};

function applyTheme() {
    var saved = localStorage.getItem('mobywatel_theme') || 'system';
    var isDark = true;
    if (saved === 'light') {
        isDark = false;
    } else if (saved === 'dark') {
        isDark = true;
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            isDark = false;
        } else {
            isDark = true;
        }
    }

    if (isDark) {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#101419');
    } else {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
        document.documentElement.setAttribute('data-theme', 'light');
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#f3f4f6');
    }
}
applyTheme();

if (window.matchMedia) {
    try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if ((localStorage.getItem('mobywatel_theme') || 'system') === 'system') {
                applyTheme();
            }
        });
    } catch(e) {}
}

function sendTo(key) {
    if (!key || key === 'null' || key === 'undefined') return;
    var qs = params.toString();
    var file = ROUTES[String(key)] || (String(key).endsWith('.html') ? String(key) : String(key) + '.html');
    var href = file + (qs ? `?${qs}` : '');
    location.href = href;
}

function highlightActiveTab() {
    var cur = location.pathname.split('/').pop() || 'home.html';
    var mapping = {
        'home.html': 'home',
        'card.html': 'home',
        'selectdocs.html': 'home',
        'moreid.html': 'home',
        'shortcuts.html': 'home',
        'services.html': 'services',
        'lockdoc.html': 'services',
        'safenet.html': 'services',
        'checkid.html': 'services',
        'pesel.html': 'services',
        'checkpesel.html': 'services',
        'defensetraining.html': 'services',
        'safetyguide.html': 'services',
        'prescriptions.html': 'services',
        'qr.html': 'qr',
        'showqr.html': 'qr',
        'scanqr.html': 'qr',
        'search.html': 'search',
        'more.html': 'more',
        'regdata.html': 'more',
        'passportdata.html': 'more',
        'biometrics.html': 'more',
        'appearance.html': 'more',
        'notifications.html': 'more',
        'language.html': 'more',
        'certificates.html': 'more',
        'history.html': 'more',
        'about.html': 'more',
        'support.html': 'more',
        'rateapp.html': 'more',
        'assistant.html': 'more',
        'voteidea.html': 'more'
    };
    var activeKey = mapping[cur] || 'home';

    document.querySelectorAll('.bottom_element_grid').forEach(function(el) {
        var s = el.getAttribute('send') || el.dataset.send;
        if (!s) {
            var oc = el.getAttribute('onclick') || '';
            var m = oc.match(/sendTo\(['"]([^'"]+)['"]\)/);
            if (m) s = m[1];
        }
        if (s === activeKey) {
            el.classList.add('active');
            var txt = el.querySelector('.bottom_element_text');
            if (txt) txt.classList.add('open');
        } else {
            el.classList.remove('active');
            var txt = el.querySelector('.bottom_element_text');
            if (txt) txt.classList.remove('open');
        }
    });
}

window.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    highlightActiveTab();
});
