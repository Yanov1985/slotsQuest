import { spawn } from 'child_process';

console.log("🛡️ [DAEMON] SlotQuest Nightly Resurrection Daemon Started!");

function startScript() {
    console.log("⏳ [DAEMON] Spawning node start-content-generation.mjs...");
    const child = spawn('node', ['start-content-generation.mjs'], { stdio: 'inherit' });

    child.on('close', (code) => {
        if (code !== 0) {
            console.log(`\n❌ [DAEMON] Script crashed or exited with code ${code}.`);
            console.log("♻️ [DAEMON] Resurrecting in 5 seconds to bypass API/Network errors...");
            setTimeout(startScript, 5000);
        } else {
            console.log("\n✅ [DAEMON] Script exited with code 0! ALL 439 SLOTS ARE 100% TRANSLATED!");
            console.log("🎉 [DAEMON] You can safely close the editor. Good night!");
            
            // Sending Windows Toast Notification
            import('child_process').then(({ exec }) => {
                const psScript = `
                    [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
                    [Windows.UI.Notifications.ToastNotificationManager]::History.Clear()
                    $xml = [xml]"<toast><visual><binding template='ToastText02'><text id='1'>Antigravity AI</text><text id='2'>🎉 Поздравляю! Генерация всех слотов и SEO-контента полностью завершена! Можно проверять результаты.</text></binding></visual></toast>"
                    $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
                    [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('SlotQuest Generator').Show($toast)
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
