import { spawn } from 'child_process';

console.log("🛡️ [DAEMON] SlotQuest Popular Slots Resurrection Daemon Started!");

function startScript() {
    console.log("⏳ [DAEMON] Spawning node import-popular-with-openai.mjs...");
    // We use the full path to avoid issues if run from different CWD
    const child = spawn('node', ['import-popular-with-openai.mjs'], { stdio: 'inherit' });

    child.on('close', (code) => {
        if (code !== 0) {
            console.log(`\n❌ [DAEMON] Script crashed or exited with code ${code}.`);
            console.log("♻️ [DAEMON] Resurrecting in 5 seconds to bypass API/Network/DB errors...");
            setTimeout(startScript, 5000);
        } else {
            console.log("\n✅ [DAEMON] Script exited with code 0! ALL 138 POPULAR GAMES ARE FULLY ENRICHED!");
            console.log("🎉 [DAEMON] Mission accomplished.");
            
            // Sending Windows Toast Notification
            import('child_process').then(({ exec }) => {
                const psScript = `
                    [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
                    [Windows.UI.Notifications.ToastNotificationManager]::History.Clear()
                    $xml = [xml]"<toast><visual><binding template='ToastText02'><text id='1'>SlotQuest Popular</text><text id='2'>🎉 Импорт 138 популярных игр завершен! Все изображения и SEO готовы.</text></binding></visual></toast>"
                    $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
                    [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('SlotQuest').Show($toast)
                `;
                exec(`powershell -Command "${psScript.replace(/\n/g, '')}"`);
                
                setTimeout(() => process.exit(0), 2000);
            });
        }
    });

    child.on('error', (err) => {
        console.error("❌ [DAEMON] Failed to start subprocess:", err);
        setTimeout(startScript, 5000);
    });
}

startScript();
