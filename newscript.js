document.addEventListener("DOMContentLoaded", () => {
    const Salutation = document.querySelector(".np-view-question--3")?.textContent.trim();
    const JobContactFirstName = document.querySelector(".np-view-question--4")?.textContent.trim();
    const JobContactLastName = document.querySelector(".np-view-question--5")?.textContent.trim();
    const ContactTitle = document.querySelector(".np-view-question--6")?.textContent.trim();
    const Website = document.querySelector(".np-view-question--9")?.href.trim();
    const AddressLineOne = document.querySelector(".np-view-question--10")?.textContent.trim();
    const City = document.querySelector(".np-view-question--12")?.textContent.trim();
    const ProvinceState = document.querySelector(".np-view-question--13")?.textContent.trim();
    const PostalCodeZipCode = document.querySelector(".np-view-question--14")?.textContent.trim();
    const Country = document.querySelector(".np-view-question--15")?.textContent.trim();

    console.log({
        Salutation,
        JobContactFirstName,
        JobContactLastName,
        ContactTitle,
        Website,
        AddressLineOne,
        City,
        ProvinceState,
        PostalCodeZipCode,
        Country
    });
});