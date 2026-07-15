// contentScript.js
console.log("🚀 MailTracker Started");

const processedComposeWindows = new WeakSet();

const isComposeWindow = (node) => {
    if (!(node instanceof HTMLElement)) return false;

    const label = (node.getAttribute("aria-label") || "").toLowerCase();

    return (
        node.matches('[role="region"][aria-label*="New Message"]') ||
        node.matches('[role="dialog"]') ||
        label.includes("compose") ||
        label.includes("new message")
    );
};

const tryAttachButton = (composeWindow, tries = 0) => {
    if (processedComposeWindows.has(composeWindow)) return;

    if (typeof window.Compose?.addTrackButton !== "function") {
        if (tries < 20) {
            setTimeout(() => tryAttachButton(composeWindow, tries + 1), 200);
        }
        return;
    }

    const added = window.Compose.addTrackButton(composeWindow);

    if (added) {
        processedComposeWindows.add(composeWindow);
    } else if (tries < 20) {
        setTimeout(() => tryAttachButton(composeWindow, tries + 1), 200);
    }
};

const handleComposeWindow = (composeWindow) => {
    console.log("✅ Compose Window Found");
    tryAttachButton(composeWindow);
};

const scanForComposeWindows = () => {
    document
        .querySelectorAll('[role="region"], [role="dialog"]')
        .forEach((node) => {
            if (isComposeWindow(node)) {
                handleComposeWindow(node);
            }
        });
};

const observer = new MutationObserver(() => {
    scanForComposeWindows();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

scanForComposeWindows();