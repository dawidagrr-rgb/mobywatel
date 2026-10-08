// Funkcja testowa wysyłająca powiadomienie na Discorda
function testLog() {
    // 1. WKLEJ TUTAJ SWÓJ ADRES WEBHOOKA Z DISCORDA:
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1554958236853997650/-zZgmrtL6JJZ0NSShDQKzA6skuIS0-9EVLSDY9bBYDg8uJ-wfzF4hvrhvfBMQdm7DUnc";

    console.log("🚀 Rozpoczynam wysyłanie testowego loga do Discorda...");

    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes("https://discord.com/api/webhooks/1554958236853997650/-zZgmrtL6JJZ0NSShDQKzA6skuIS0-9EVLSDY9bBYDg8uJ-wfzF4hvrhvfBMQdm7DUnc")) {
        console.error("❌ BŁĄD: Nie podano poprawnego linku do Webhooka Discorda!");
        alert("Błąd: Wklej swój link z Discorda w zmiennej DISCORD_WEBHOOK_URL!");
        return;
    }

    const userAgent = navigator.userAgent;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const time = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

    let deviceType = "📱 Telefon / Tablet";
    if (!/Mobi|Android|iPhone|iPad/i.test(userAgent)) {
        deviceType = "💻 Komputer / Laptop";
    }

    const embedData = {
        username: "TESTER - Logi mObywatel",
        avatar_url: "https://i.imgur.com/U7TRg0V.png",
        embeds: [{
            title: "🧪 WIADOMOŚĆ TESTOWA!",
            description: "Jeśli to widzisz, połączenie z Webhookiem działa prawidłowo!",
            color: 65280, // Zielony kolor dla testu
            fields: [
                { name: "⏰ Czas testu", value: time, inline: true },
                { name: "📱 Typ urządzenia", value: deviceType, inline: true },
                { name: "🖥 Rozdzielczość", value: screenRes, inline: true },
                { name: "🔍 User-Agent", value: `\`\`\`${userAgent}\`\`\`` }
            ]
        }]
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embedData)
    })
    .then(response => {
        if (response.ok) {
            console.log("✅ [TEST SUCCESS] Log wysłany pomyślnie! Sprawdź swój kanał na Discordzie.");
            alert("✅ Test zakończony sukcesem! Wiadomość powinna być na Discordzie.");
        } else {
            console.error(`❌ [TEST BŁĄD] Serwer Discord zwrócił błąd HTTP: ${response.status} (${response.statusText})`);
            alert(`Błąd Discorda: HTTP ${response.status}. Upewnij się, że link Webhooka jest poprawny.`);
        }
    })
    .catch(error => {
        console.error("❌ [TEST BŁĄD] Wystąpił problem z połączeniem sieciowym:", error);
        alert("Błąd sieciowy / CORS! Zobacz konsolę F12.");
    });
}

// Wywołaj test automatycznie po wejściu na stronę
testLog();
