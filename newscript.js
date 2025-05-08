document.addEventListener("DOMContentLoaded", parseContact);
    
async function parseContact() {
    const Salutation = document.querySelector(".np-view-question--3");
    const JobContactFirstName = document.querySelector(".np-view-question--4");
    const JobContactLastName = document.querySelector(".np-view-question--5");
    const ContactTitle = document.querySelector(".np-view-question--6");
    const Website = document.querySelector(".np-view-question--9");
    const AddressLineOne = document.querySelector(".np-view-question--10");
    const City = document.querySelector(".np-view-question--12");
    const ProvinceState = document.querySelector(".np-view-question--13");
    const PostalCodeZipCode = document.querySelector(".np-view-question--14");
    const Country = document.querySelector(".np-view-question--15");
    const test = document.querySelector(".eat--bootstrap");

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
        Country,
        test
    })};