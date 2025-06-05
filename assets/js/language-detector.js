// Função para detectar o idioma do navegador
function detectBrowserLanguage() {
  // Obtém o idioma do navegador
  let browserLang = navigator.language || navigator.userLanguage;
  browserLang = browserLang.toLowerCase();

  // Mapeia o idioma do navegador para os idiomas suportados
  if (browserLang.startsWith("pt-br") || browserLang === "pt-br") {
    return "pt-BR";
  } else if (browserLang.startsWith("pt") || browserLang === "pt") {
    return "pt-PT";
  } else if (browserLang.startsWith("es") || browserLang === "es") {
    return "es";
  } else {
    // Padrão para inglês se não for um dos idiomas suportados
    return "en";
  }
}

// Função para carregar o idioma salvo ou detectar o idioma do navegador
function loadLanguagePreference() {
  // Verifica se há uma preferência de idioma salva
  const savedLang = localStorage.getItem("preferredLanguage");

  if (savedLang) {
    return savedLang;
  } else {
    // Se não houver preferência salva, detecta o idioma do navegador
    const detectedLang = detectBrowserLanguage();
    // Salva a preferência de idioma
    localStorage.setItem("preferredLanguage", detectedLang);
    return detectedLang;
  }
}

// Função para alterar o idioma da página
function changeLanguage(lang) {
  // Verifica se o idioma é suportado
  if (!translations[lang]) {
    console.error(`Idioma não suportado: ${lang}`);
    return;
  }

  // Salva a preferência de idioma
  localStorage.setItem("preferredLanguage", lang);

  // Atualiza o texto do idioma atual no seletor
  const currentLangElement = document.getElementById("current-language");
  if (currentLangElement) {
    currentLangElement.textContent = lang;
  }

  // Atualiza o atributo lang do HTML
  document.documentElement.lang = lang.toLowerCase();

  // Traduz todos os elementos com atributo data-i18n
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      // Se o elemento for um input com placeholder
      if (element.hasAttribute("placeholder")) {
        element.placeholder = translations[lang][key];
      }
      // Se for um elemento com texto
      else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Traduz elementos específicos que não têm data-i18n
  translateSpecificElements(lang);
}

// Função para traduzir elementos específicos que não têm data-i18n
function translateSpecificElements(lang) {
  // Exemplo: traduzir mensagens de erro do formulário
  const errorMessages = document.querySelectorAll(".error-message");
  if (errorMessages.length > 0) {
    const nameError = document.querySelector(".error-message:nth-of-type(1)");
    const emailError = document.querySelector(".error-message:nth-of-type(2)");
    const subjectError = document.querySelector(
      ".error-message:nth-of-type(3)"
    );
    const messageError = document.querySelector(
      ".error-message:nth-of-type(4)"
    );

    if (nameError)
      nameError.textContent = translations[lang]["contact_name_error"];
    if (emailError)
      emailError.textContent = translations[lang]["contact_email_error"];
    if (subjectError)
      subjectError.textContent = translations[lang]["contact_subject_error"];
    if (messageError)
      messageError.textContent = translations[lang]["contact_message_error"];
  }
}

// Inicializa o idioma quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Carrega o idioma preferido ou detecta o idioma do navegador
  const currentLang = loadLanguagePreference();

  // Configura os eventos de clique para os itens do dropdown de idioma
  const langItems = document.querySelectorAll(".dropdown-item[data-lang]");
  langItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");
      changeLanguage(lang);

      // Fecha o dropdown
      const dropdownMenu = document.getElementById("language-dropdown-menu");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("is-active");
      }
    });
  });

  // Define o idioma inicial
  changeLanguage(currentLang);
});
