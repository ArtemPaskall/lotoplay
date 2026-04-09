document.querySelectorAll(".form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const messages = form.querySelector('[name="messages"]');

    clearError(name);
    clearError(email);
    clearError(messages);

    if (name.value.trim().length < 2) {
      showError(name, "Ім'я має містити мінімум 2 символи");
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, "Введіть коректний email");
      isValid = false;
    }

    if (messages.value.trim().length === 0) {
      showError(messages, "Повідомлення не може бути порожнім");
      isValid = false;
    }

    if (isValid) {
      const url = `https://example.com/api?name=${encodeURIComponent(
        name.value,
      )}&email=${encodeURIComponent(email.value)}&message=${encodeURIComponent(
        messages.value,
      )}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error();
          alert("Повідомлення відправлено!");
          form.reset();
        })
        .catch(() => {
          alert("Помилка при відправці");
        });
    }
  });

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => clearError(field));
  });
});

function showError(field, message) {
  const error = document.createElement("span");
  error.className = "form__error";
  error.textContent = message;
  field.parentNode.appendChild(error);
  field.classList.add("form__field--error");
}

function clearError(field) {
  const error = field.parentNode.querySelector(".form__error");
  if (error) error.remove();
  field.classList.remove("form__field--error");
}

const mobileMenuIcon = document.querySelector(".menu-icon");
const mobileMenuWrapp = document.querySelector(".mobile-menu-wrapp");
const mobileMenu = document.querySelector(".mobile-menu");
const popUpForm = document.querySelector(".pop-up-wrapp");
const menuClose = document.querySelector(".menu-close");
const formClose = document.querySelector(".form-close");
const openPopupFormButton = document.querySelectorAll(".open-popup-form");

mobileMenuIcon.addEventListener("click", function () {
  mobileMenuWrapp.style.display = "flex";
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    mobileMenu.classList.add("open");
  });
});

menuClose.addEventListener("click", closeMenu);
formClose.addEventListener("click", function () {
  popUpForm.style.display = "none";
  document.body.style.overflow = "";
});

[...openPopupFormButton].forEach((button) => {
  button.addEventListener("click", function () {
    popUpForm.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll(".mobile-menu__list a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(function () {
    mobileMenuWrapp.style.display = "none";
  }, 300);
}
