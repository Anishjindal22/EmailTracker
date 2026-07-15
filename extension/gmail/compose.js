console.log("compose.js loaded");

const getRecipients = (composeWindow) => {
    const recipientElements = composeWindow.querySelectorAll("span[email]");
    return Array.from(recipientElements).map((element) =>
        element.getAttribute("email")
    );
};

const getSubject = (composeWindow) => {
    const subjectField = composeWindow.querySelector(
        'input[name="subjectbox"]'
    );
    return subjectField ? subjectField.value : "";
};

const getBody = (composeWindow) => {
    const bodyField = composeWindow.querySelector(
        '[contenteditable="true"][role="textbox"]'
    );
    return bodyField ? bodyField.innerHTML : "";
};

const addTrackButton = (composeWindow) => {
    const actionBar = composeWindow.querySelector("div.bAK");
    if (!actionBar) {
        console.log("Action bar not found");
        return false;
    }
    if (composeWindow.querySelector(".mailtracker-btn")) {
        return true;
    }
    const button = document.createElement("div");
    button.className = "mailtracker-btn";
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-label", "Track Email");
    button.title = "Track Email";
    button.style.cssText = `
        width: 32px;
        height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 2px;
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
        flex-shrink: 0;
        background: transparent;
        color: #5f6368;
    `;
    button.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 5c-5 0-9.27 3.11-11 7 1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
        </svg>
    `;
    button.addEventListener("mouseenter", () => {
        button.style.background = "#f1f3f4";
    });

    button.addEventListener("mouseleave", () => {
        button.style.background = "transparent";
    });

    button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const recipients = getRecipients(composeWindow);
        const subject = getSubject(composeWindow);
        const body = getBody(composeWindow);
        console.log("Recipients:", recipients);
        console.log("Subject:", subject);
        console.log("Body:", body);
        if (!recipients.length) {
            alert("Recipient is required.");
            return;
        }
        if (!subject.trim()) {
            alert("Subject is required.");
            return;
        }
        alert("Tracking feature will be implemented next.");
    });

    actionBar.insertBefore(button, actionBar.firstChild);

    console.log("Eye icon added");
    return true;
};
window.Compose = {
    getRecipients,
    getSubject,
    getBody,
    addTrackButton,
};