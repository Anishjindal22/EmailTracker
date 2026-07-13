console.log("MailTracker Started");

const observer = new MutationObserver((mutations) => {

    for (const mutation of mutations) {

        for (const node of mutation.addedNodes) {

            if (!(node instanceof HTMLElement)) continue;

            const composeWindow = node.matches(
                '[role="region"][aria-label="New Message"]'
            )
                ? node
                : node.querySelector(
                    '[role="region"][aria-label="New Message"]'
                );

            if (!composeWindow) continue;

            console.log("Compose Window Opened");

            const recipientField = composeWindow.querySelector(
                'input[aria-label="To recipients"]'
            );

            const subjectField = composeWindow.querySelector(
                'input[name="subjectbox"]'
            );

            const bodyField = composeWindow.querySelector(
                '[contenteditable="true"][role="textbox"]'
            );

            console.log({
                recipientField,
                subjectField,
                bodyField
            });

            const printEmailDetails = () => {

                console.clear();

                console.log("========== EMAIL ==========");

                console.log("Recipient :", recipientField?.value);

                console.log("Subject   :", subjectField?.value);

                console.log("Body HTML :");

                console.log(bodyField?.innerHTML);

                console.log("===========================");

            };

            recipientField?.addEventListener("input", printEmailDetails);

            subjectField?.addEventListener("input", printEmailDetails);

            bodyField?.addEventListener("input", printEmailDetails);

            printEmailDetails();

        }

    }

});

observer.observe(document.body, {

    childList: true,

    subtree: true

});