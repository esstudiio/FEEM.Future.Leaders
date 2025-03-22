document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelector(".grancvelform").scrollIntoView({ 
            behavior: "smooth" 
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".registration form");
    const nameInput = form.querySelector("input[placeholder='Անուն']");
    const surnameInput = form.querySelector("input[placeholder='Ազգանուն']");
    const emailInput = form.querySelector("input[placeholder='Էլ. փոստ']");
    const submitBtn = form.querySelector("#formbtn");

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Կանխում ենք ձևի լռելյայն ուղարկումը
        
        let name = nameInput.value.trim();
        let surname = surnameInput.value.trim();
        let email = emailInput.value.trim();

        // Ստուգում՝ բոլոր դաշտերը լրացված են, թե ոչ
        if (name === "" || surname === "" || email === "") {
            alert("❌ Խնդրում ենք լրացնել բոլոր դաշտերը։");
            return;
        }

        // Email-ի ստուգում (regex)
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("⚠️ Խնդրում ենք մուտքագրել վավերական email հասցե։");
            return;
        }

        // Ստանում ենք արդեն գրանցված օգտատերերի ցուցակը (եթե կա)
        let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        // Ստուգում ենք՝ արդյոք տվյալ օգտատերը արդեն գրանցվել է
        let isUserExists = users.some(user => user.email === email);
        if (isUserExists) {
            alert("⚠️ Այս Օգտատերը արդեն գրանցված է։");
            return;
        }

        // Ավելացնում ենք նոր օգտատիրոջ տվյալները
        let newUser = { name, surname, email };
        users.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        alert("✅ Գրանցումը հաջողությամբ ավարտվեց!");

        // Մաքրում ենք դաշտերը
        form.reset();
    });
});