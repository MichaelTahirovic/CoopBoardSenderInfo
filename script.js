document.addEventListener("DOMContentLoaded", function () {
    // Define a mapping of browser classes to IDs in index.html
    const classToIdMap = {
        "np-view-question--3": "Salutation",
        "np-view-question--4": "JobContactFirstName",
        "np-view-question--5": "JobContactLastName",
        "np-view-question--6": "ContactTitle",
        "np-view-question--9": "Website",
        "np-view-question--10": "AddressLineOne",
        "np-view-question--12": "City",
        "np-view-question--13": "ProvinceState",
        "np-view-question--14": "PostalCodeZipCode",
        "np-view-question--15": "Country"
    };

    // Function to populate content dynamically
    const populateContent = () => {
        Object.entries(classToIdMap).forEach(([className, elementId]) => {
            // Select all elements with the given class name
            const elements = document.querySelectorAll(`.${className}`);
            if (elements.length === 0) {
                console.warn(`No elements found for class: ${className}`);
                return;
            }

            // Extract and join the text content of all matching <span> elements
            const content = Array.from(elements)
                .map(el => el.textContent.trim())
                .filter(text => text.length > 0) // Ensure non-empty text
                .join(", ") || "No data found.";

            // Find the target element by ID and update its content
            const targetElement = document.getElementById(elementId);
            if (targetElement) {
                targetElement.textContent = content;
                console.log(`Updated #${elementId} with content: "${content}"`);
            } else {
                console.warn(`No target element found with ID: ${elementId}`);
            }
        });
    };

    // Initial population of content
    populateContent();

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(() => {
        console.log("DOM changed, re-checking for elements...");
        populateContent();
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Send the parsed data back to the background script
    const parsedData = Object.entries(classToIdMap).map(([className, elementId]) => {
        const elements = document.querySelectorAll(`span.${className}`);
        return {
            className,
            content: Array.from(elements)
                .map(el => el.textContent.trim())
                .filter(text => text.length > 0) // Ensure non-empty text
        };
    });

    chrome.runtime.sendMessage({ type: "parsedData", data: parsedData }, (response) => {
        if (response && response.status === "success") {
            console.log("Data sent successfully to the background script.");
        }
    });
});