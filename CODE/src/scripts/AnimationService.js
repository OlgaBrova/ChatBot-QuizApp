const AnimationsService = {
    avatarImgDiv: document.getElementById("imgLogo"),
    chatGames: document.getElementById("chatGames"),
    chatQuizzes: document.getElementById("chatQuizzes"),
    chatName : document.getElementById("chatName"),
    recommendedSlide: document.getElementById("recommendedSlide"),
    chatWindow: document.getElementById("chatWindow"),
    mainWindow: document.getElementById("mainWindow"),

    //Animates the header - Image, Name, Icons
    headerAnimation: function () {
        this.avatarImgDiv.classList.add("avatarAnimation");

        this.avatarImgDiv.addEventListener("animationend", () => {
            this.avatarImgDiv.style.marginTop = "-1.25rem";
            this.avatarImgDiv.style.marginLeft = "1.25rem";
        });

        this.chatName.classList.add("fadeIn-avatarName");
        this.chatName.addEventListener("animationend", () => {
            this.chatName.style.opacity = "1";
        });

        this.chatGames.classList.add("games-quizzesAnimation");
        this.avatarImgDiv.addEventListener("animationend", () => {
            this.chatGames.classList.remove("chat-games");
            this.chatGames.classList.add("chat-games-icon");
            this.chatGames.innerHTML = `<img src="./src/img-avatars/games.png" height="25rem">`;
        });

        this.chatQuizzes.classList.add("games-quizzesAnimation");
        this.chatQuizzes.addEventListener("animationend", () => {
            this.chatQuizzes.classList.remove("chat-quizzes");
            this.chatQuizzes.classList.add("chat-quizzes-icon");
            this.chatQuizzes.innerHTML = `<img src="./src/img-avatars/quizzes.png" height="25rem">`;

        });
    },

    //Animates the recommendations slide
    recommendedBtnsAnimations: function () {
        this.chatWindow.style.height = "28.75rem";

        ButtonsService.recommendationsButtons();

        UiService.recommendedDiv.style.display = "block";
        AnimationsService.recommendedSlide.classList.add("slider");

        this.recommendedSlide.addEventListener("animationiteration", () => {
            ButtonsService.recommendationsButtons();
        })
    }
};//PROPERTIES: The image div, Games button, Quizzes button, Name div, Recommended buttons slide, Chat div, Main div