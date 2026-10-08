(function saveLocalLog() {
    const logs = JSON.parse(localStorage.getItem('page_visitor_logs') || '[]');
    
    const userAgent = navigator.userAgent;
    
    let deviceName = "Nieznane urządzenie";
    if (userAgent.includes("iPhone")) deviceName = "iPhone";
    else if (userAgent.includes("Android")) deviceName = "Telefon Android";
    else if (userAgent.includes("Windows")) deviceName = "Komputer Windows";
    else if (userAgent.includes("Macintosh")) deviceName = "MacBook / Mac";

    const newEntry = {
        data: new Date().toLocaleString('pl-PL'),
        urzadzenie: deviceName,
        ekran: `${window.screen.width}x${window.screen.height}`,
        szczegoly: userAgent
    };

    logs.push(newEntry);
    localStorage.setItem('page_visitor_logs', JSON.stringify(logs));
})();