document.addEventListener("DOMContentLoaded", function () {
    // Define a mapping of labels to IDs in index.html
    const labelToIdMap = {
        "Organization:": "Organization",
        "Salutation:": "Salutation",
        "Job Contact First Name:": "JobContactFirstName",
        "Job Contact Last Name:": "JobContactLastName",
        "Contact Title:": "ContactTitle",
        "Website:": "Website",
        "Address Line One:": "AddressLineOne",
        "City:": "City",
        "Province / State:": "ProvinceState",
        "Postal Code / Zip Code:": "PostalCodeZipCode",
        "Country:": "Country"
    };

    // Find the table containing the data
    const table = document.querySelector(".panel-body table");
    if (!table) {
        console.error("Data table not found.");
        return;
    }

    // Loop through each row in the table and extract data
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
        const labelElement = row.querySelector("td:first-child strong");
        const valueElement = row.querySelector("td:last-child");
        if (labelElement && valueElement) {
            const label = labelElement.textContent.trim();
            const value = valueElement.textContent.trim();

            // Check if the label matches one in the mapping
            if (labelToIdMap[label]) {
                const targetId = labelToIdMap[label];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.textContent = value;
                }
            }
        }
    });
});