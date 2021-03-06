//ONLY CALLS FOR THE FUNCTIONS THAT NEEDS TO BE EXECUTED AT START AND HAVE THE MAXIMIZE AND MINIMIZE FEATURE
let chatMinimize = document.getElementById("chatMinimize");
let chatMaximize = document.getElementById("chatMaximize");
let mainWindow = document.getElementById("mainWindow");
let isChatBotOpened = true;

chatMinimize.addEventListener("click", () => {
    if (isChatBotOpened) {
        mainWindow.style.height = 0;
        mainWindow.style.transition = "0.5s ease-in-out";
        mainWindow.style.visibility = "hidden";
        chatMaximize.style.visibility = "visible";
        chatMaximize.style.transform = "translateY(0rem)";
        chatMaximize.style.opacity = 1;
        isChatBotOpened = false;
        chatMaximize.classList.add("jello-horizontal");
    }
});

chatMaximize.addEventListener("click", () => {
    if (!isChatBotOpened) {
        chatMaximize.classList.remove("jello-horizontal");
        setTimeout(() => {
            mainWindow.style.height = "46.25rem";
            mainWindow.style.transition = "0.5s ease-in-out";
            mainWindow.style.visibility = "visible";
        }, 500);
        chatMaximize.style.transform = "translateY(-137.5rem)";
        chatMaximize.style.visibility = "hidden";
        chatMaximize.style.opacity = 0;
        isChatBotOpened = true;
    }
});

DataService.getDataAsync();

UiService.firstMessage();

SearchInputService.getSearchInput();