(() => {
    "use strict";

    // =========================
    // Dados da aplicação
    // =========================

    const routine = [
        {
            day: "Segunda-feira",
            icon: "🎵",
            theme: "Vogais",
            activities: ["Música das vogais", "Cartões A E I O U", "Encontrar objetos", "Traçar vogais", "Massinha"]
        },
        {
            day: "Terça-feira",
            icon: "🔤",
            theme: "Alfabeto (A-G)",
            activities: ["Aprender letras", "Sons das letras", "Procurar letras pela casa", "Pintura"]
        },
        {
            day: "Quarta-feira",
            icon: "🎨",
            theme: "Cores",
            activities: ["Separar brinquedos", "Pintura", "Caça às cores"]
        },
        {
            day: "Quinta-feira",
            icon: "🔢",
            theme: "Números",
            activities: ["Contagem", "Quantidades", "Traçado", "Jogos"]
        },
        {
            day: "Sexta-feira",
            icon: "🧩",
            theme: "Alfabeto H-Z",
            activities: ["Letras restantes", "Nome da criança", "Massinha", "Revisão"]
        },
        {
            day: "Sábado",
            icon: "🏆",
            theme: "Revisão Geral",
            activities: ["Bingo", "Memória", "Música", "Histórias"]
        },
        {
            day: "Domingo",
            icon: "🌳",
            theme: "Aprender Brincando",
            activities: ["Desenhos", "Passeios", "Contagem", "Histórias"]
        }
    ];

    const alphabet = [
        ["A", "Abelha", "🐝", "A de Abelha!"],
        ["B", "Bola", "⚽", "B de Bola!"],
        ["C", "Casa", "🏠", "C de Casa!"],
        ["D", "Dado", "🎲", "D de Dado!"],
        ["E", "Elefante", "🐘", "E de Elefante!"],
        ["F", "Foca", "🦭", "F de Foca!"],
        ["G", "Gato", "🐱", "G de Gato!"],
        ["H", "Hipopótamo", "🦛", "H de Hipopótamo!"],
        ["I", "Igreja", "⛪", "I de Igreja!"],
        ["J", "Jacaré", "🐊", "J de Jacaré!"],
        ["K", "Kiwi", "🥝", "K de Kiwi!"],
        ["L", "Leão", "🦁", "L de Leão!"],
        ["M", "Macaco", "🐒", "M de Macaco!"],
        ["N", "Navio", "🚢", "N de Navio!"],
        ["O", "Ovelha", "🐑", "O de Ovelha!"],
        ["P", "Pato", "🦆", "P de Pato!"],
        ["Q", "Queijo", "🧀", "Q de Queijo!"],
        ["R", "Rato", "🐭", "R de Rato!"],
        ["S", "Sapo", "🐸", "S de Sapo!"],
        ["T", "Tartaruga", "🐢", "T de Tartaruga!"],
        ["U", "Urso", "🐻", "U de Urso!"],
        ["V", "Vaca", "🐮", "V de Vaca!"],
        ["W", "Waffle", "🧇", "W de Waffle!"],
        ["X", "Xícara", "☕", "X de Xícara!"],
        ["Y", "Yoyo", "🪀", "Y de Yoyo!"],
        ["Z", "Zebra", "🦓", "Z de Zebra!"]
    ];

    const vowels = [
        ["A", "Abelha", "🐝"],
        ["E", "Elefante", "🐘"],
        ["I", "Igreja", "⛪"],
        ["O", "Ovelha", "🐑"],
        ["U", "Urso", "🐻"]
    ];

    const colors = [
        { name: "Vermelho", object: "Maçã", emoji: "🍎", bg: "#ffdede", color: "#b93434" },
        { name: "Azul", object: "Céu", emoji: "☁️", bg: "#dff3ff", color: "#2478b5" },
        { name: "Amarelo", object: "Sol", emoji: "☀️", bg: "#fff3bf", color: "#7a5b00" },
        { name: "Verde", object: "Folha", emoji: "🌿", bg: "#e2f7e3", color: "#318f3b" },
        { name: "Laranja", object: "Laranja", emoji: "🍊", bg: "#ffe7cf", color: "#ad5b11" },
        { name: "Roxo", object: "Uva", emoji: "🍇", bg: "#eee7ff", color: "#6844b5" },
        { name: "Rosa", object: "Flor", emoji: "🌷", bg: "#ffe3f0", color: "#b84478" },
        { name: "Preto", object: "Gato", emoji: "🐈‍⬛", bg: "#e6e9ed", color: "#26354a" },
        { name: "Branco", object: "Nuvem", emoji: "☁️", bg: "#f7f9fb", color: "#607080" }
    ];

    const numberEmoji = ["🍎", "⭐", "🐟", "🦋", "🍓", "🌼", "🚗", "🎈", "🐝", "🍪"];

    const state = {
        routineIndex: 0,
        score: 0,
        completed: new Set(),
        games: {
            colors: { target: "Vermelho", answered: false },
            letters: { target: "A", answered: false },
            numbers: { target: 3, answered: false }
        }
    };

    // =========================
    // Utilidades
    // =========================

    const $ = (selector) => document.querySelector(selector);

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char]));
    }

    function shuffle(items) {
        return [...items].sort(() => Math.random() - 0.5);
    }

    function showToast(message) {
        const toast = $("#toast");
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    function celebrate() {
        const container = $("#confetti");
        const pieces = 65;

        for (let i = 0; i < pieces; i++) {
            const piece = document.createElement("span");
            piece.className = "confetti";
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.setProperty("--x", `${(Math.random() - 0.5) * 220}px`);
            piece.style.background = ["#58b8f5", "#63c66a", "#ffd45c", "#f36d6d", "#9b7bea", "#f58bc0"][Math.floor(Math.random() * 6)];
            piece.style.animationDelay = `${Math.random() * .35}s`;
            piece.style.transform = `rotate(${Math.random() * 180}deg)`;
            container.appendChild(piece);

            setTimeout(() => piece.remove(), 2100);
        }
    }

    function addPoints(amount, key) {
        if (state.completed.has(key)) return;

        state.completed.add(key);
        state.score += amount;
        updateProgress();
        celebrate();
        showToast(`Muito bem! +${amount} pontos ⭐`);
    }

    function updateProgress() {
        const totalActivities = 7;
        const progress = Math.min(100, Math.round((state.completed.size / totalActivities) * 100));

        $("#score").textContent = `${state.score} pontos ⭐`;
        $("#progress-percent").textContent = `${progress}%`;
        $("#progress-bar").style.width = `${progress}%`;

        const badges = [
            ["explorer", "🧭 Explorador", 1],
            ["letters", "🔤 Mestre das Letras", 2],
            ["colors", "🎨 Mestre das Cores", 3],
            ["math", "🔢 Pequeno Matemático", 4]
        ];

        $("#badges").innerHTML = badges.map(([key, label, required]) => {
            const unlocked = state.score >= required * 10;
            return `<span class="badge ${unlocked ? "unlocked" : ""}">${label} ${unlocked ? "✓" : "🔒"}</span>`;
        }).join("");
    }

    // =========================
    // Menu responsivo
    // =========================

    function initMenu() {
        const toggle = $(".menu-toggle");
        const nav = $("#main-menu");

        toggle.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("menu-open", open);
            toggle.querySelector("span:last-child").textContent = open ? "✕" : "☰";
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
                toggle.querySelector("span:last-child").textContent = "☰";
            });
        });

        const sections = [...document.querySelectorAll("main section[id]")];
        const links = [...document.querySelectorAll(".nav-link")];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                links.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            });
        }, { rootMargin: "-30% 0px -60% 0px" });

        sections.forEach((section) => observer.observe(section));
    }

    // =========================
    // Rotina semanal
    // =========================

    function renderRoutine() {
        const grid = $("#routine-grid");

        grid.innerHTML = routine.map((item, index) => `
      <article
        class="routine-card ${index === state.routineIndex ? "selected" : ""}"
        data-routine="${index}"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(item.day)}: ${escapeHtml(item.theme)}"
      >
        <div class="routine-day">
          <span>${escapeHtml(item.day)}</span>
          <span class="routine-icon" aria-hidden="true">${item.icon}</span>
        </div>
        <h3>${escapeHtml(item.theme)}</h3>
        <p>Vamos aprender!</p>
        <ul class="activity-list">
          ${item.activities.map(activity => `<li>${escapeHtml(activity)}</li>`).join("")}
        </ul>
      </article>
    `).join("");

        grid.querySelectorAll(".routine-card").forEach((card) => {
            const select = () => {
                state.routineIndex = Number(card.dataset.routine);
                renderRoutine();
            };

            card.addEventListener("click", select);
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    select();
                }
            });
        });
    }

    function initRoutineControls() {
        $("#previous-activity").addEventListener("click", () => {
            state.routineIndex = (state.routineIndex - 1 + routine.length) % routine.length;
            renderRoutine();
        });

        $("#next-activity").addEventListener("click", () => {
            const current = routine[state.routineIndex];
            addPoints(10, `routine-${state.routineIndex}`);
            state.routineIndex = (state.routineIndex + 1) % routine.length;
            renderRoutine();
            showToast(`Próxima aventura: ${current.day}!`);
        });
    }

    // =========================
    // Alfabeto
    // =========================

    function renderAlphabet() {
        const grid = $("#alphabet-grid");

        grid.innerHTML = alphabet.map(([letter]) => `
      <button class="letter-card" type="button" data-letter="${letter}" aria-label="Letra ${letter}">
        ${letter}
      </button>
    `).join("");

        grid.querySelectorAll(".letter-card").forEach((button) => {
            button.addEventListener("click", () => {
                const data = alphabet.find(item => item[0] === button.dataset.letter);
                showAlphabetDetail(data);
                addPoints(10, `letter-${data[0]}`);
            });
        });
    }

    function showAlphabetDetail(data) {
        const [letter, word, emoji, phrase] = data;
        $("#alphabet-detail").innerHTML = `
      <div class="detail-illustration">${emoji}</div>
      <div>
        <span class="detail-label">Exemplo</span>
        <h3>${letter} — ${word}</h3>
        <p>${phrase} ${emoji}</p>
      </div>
    `;

        document.querySelectorAll(".letter-card").forEach((button) => {
            button.classList.toggle("selected", button.dataset.letter === letter);
        });
    }

    // =========================
    // Vogais
    // =========================

    function renderVowels() {
        $("#vowels-grid").innerHTML = vowels.map(([letter, word, emoji], index) => `
      <button class="vowel-card" type="button" data-vowel="${letter}" aria-label="Vogal ${letter}, ${word}">
        <span class="vowel-letter">${letter}</span>
        <span class="vowel-word">${emoji} ${word}</span>
      </button>
    `).join("");

        document.querySelectorAll(".vowel-card").forEach((button) => {
            button.addEventListener("click", () => {
                const data = vowels.find(item => item[0] === button.dataset.vowel);
                button.animate(
                    [
                        { transform: "scale(1)" },
                        { transform: "scale(1.08) rotate(-2deg)" },
                        { transform: "scale(1)" }
                    ],
                    { duration: 420, easing: "ease-out" }
                );
                showToast(`${data[0]} de ${data[1]}! ${data[2]}`);
                addPoints(10, `vowel-${data[0]}`);
            });
        });
    }

    // =========================
    // Cores
    // =========================

    function renderColors() {
        $("#colors-grid").innerHTML = colors.map((item, index) => `
      <button
        class="color-card"
        type="button"
        data-color="${escapeHtml(item.name)}"
        style="background:${item.bg}; color:${item.color};"
        aria-label="${escapeHtml(item.name)}, exemplo ${escapeHtml(item.object)}"
      >
        <span class="color-swatch" aria-hidden="true">${item.emoji}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <p>Exemplo: ${escapeHtml(item.object)}</p>
      </button>
    `).join("");

        document.querySelectorAll(".color-card").forEach((button) => {
            button.addEventListener("click", () => {
                const data = colors.find(item => item.name === button.dataset.color);
                showToast(`${data.name}: ${data.object} ${data.emoji}`);
                addPoints(10, `color-${data.name}`);
            });
        });
    }

    // =========================
    // Números
    // =========================

    function renderNumbers() {
        $("#numbers-grid").innerHTML = Array.from({ length: 10 }, (_, index) => {
            const number = index + 1;
            const emoji = numberEmoji[index];

            return `
        <button class="number-card" type="button" data-number="${number}" aria-label="Número ${number}, ${number} figuras">
          <span class="number-value">${number}</span>
          <span class="number-objects" aria-hidden="true">${emoji.repeat(number)}</span>
          <span class="number-label">${number} ${number === 1 ? "figura" : "figuras"}</span>
        </button>
      `;
        }).join("");

        document.querySelectorAll(".number-card").forEach((button) => {
            button.addEventListener("click", () => {
                const number = Number(button.dataset.number);
                addPoints(10, `number-${number}`);
                showToast(`Você contou ${number}! Muito bem! ⭐`);
            });
        });
    }

    // =========================
    // Jogos
    // =========================

    function createOptions(container, values, target, type, feedbackElement) {
        container.innerHTML = shuffle(values).map(value => `
      <button class="game-option" type="button" data-answer="${escapeHtml(String(value))}">
        ${escapeHtml(String(value))}
      </button>
    `).join("");

        container.querySelectorAll(".game-option").forEach((button) => {
            button.addEventListener("click", () => {
                const correct = String(button.dataset.answer) === String(target);

                if (correct) {
                    button.classList.add("correct");
                    feedbackElement.textContent = "🎉 Acertou! Muito bem!";
                    feedbackElement.className = "feedback success";
                    addPoints(10, `game-${type}-${target}`);
                } else {
                    button.classList.add("wrong");
                    feedbackElement.textContent = "💡 Quase! Tente outra vez.";
                    feedbackElement.className = "feedback error";
                }
            });
        });
    }

    function renderColorGame() {
        const target = state.games.colors.target;
        $("#color-question").textContent = `Qual é a cor ${target.toLowerCase()}?`;

        const values = shuffle(colors.map(item => item.name)).slice(0, 4);
        if (!values.includes(target)) values[0] = target;

        createOptions(
            $("#color-options"),
            values,
            target,
            "color",
            $("#color-feedback")
        );
    }

    function renderLetterGame() {
        const targetData = alphabet[Math.floor(Math.random() * alphabet.length)];
        state.games.letters.target = targetData[0];
        const target = targetData[0];

        $("#letter-target").textContent = target;
        $("#letter-target").setAttribute("aria-label", `Letra ${target}`);

        const alternatives = shuffle(alphabet.map(item => item[0])).slice(0, 4);
        if (!alternatives.includes(target)) alternatives[0] = target;

        createOptions(
            $("#letter-options"),
            alternatives,
            target,
            "letter",
            $("#letter-feedback")
        );
    }

    function renderNumberGame() {
        const target = Math.floor(Math.random() * 8) + 1;
        state.games.numbers.target = target;

        $("#number-target").textContent = "🍎 ".repeat(target).trim();
        $("#number-target").setAttribute("aria-label", `Quantidade: ${target}`);

        const alternatives = shuffle(
            Array.from(new Set([
                target,
                Math.max(1, target - 1),
                Math.min(10, target + 1),
                Math.max(1, Math.floor(Math.random() * 10) + 1)
            ]))
        ).slice(0, 4);

        if (!alternatives.includes(target)) alternatives[0] = target;

        createOptions(
            $("#number-options"),
            alternatives,
            target,
            "number",
            $("#number-feedback")
        );
    }

    function initGames() {
        renderColorGame();
        renderLetterGame();
        renderNumberGame();

        $("#new-challenges").addEventListener("click", () => {
            state.games.colors.target = colors[Math.floor(Math.random() * colors.length)].name;
            $("#color-feedback").textContent = "";
            $("#color-feedback").className = "feedback";
            $("#letter-feedback").textContent = "";
            $("#letter-feedback").className = "feedback";
            $("#number-feedback").textContent = "";
            $("#number-feedback").className = "feedback";
            renderColorGame();
            renderLetterGame();
            renderNumberGame();
            showToast("Novos desafios preparados! 🎲");
        });

        $("#reset-games").addEventListener("click", () => {
            state.score = 0;
            state.completed.clear();
            updateProgress();
            $("#color-feedback").textContent = "";
            $("#letter-feedback").textContent = "";
            $("#number-feedback").textContent = "";
            renderColorGame();
            renderLetterGame();
            renderNumberGame();
            showToast("Tudo reiniciado. Vamos começar! 🚀");
        });
    }

    // =========================
    // Inicialização
    // =========================

    function init() {
        initMenu();
        renderRoutine();
        initRoutineControls();
        renderAlphabet();
        renderVowels();
        renderColors();
        renderNumbers();
        initGames();
        updateProgress();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
