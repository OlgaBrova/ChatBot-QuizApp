const SearchInputService = {
    input : document.getElementById("input"),
    inputButton : document.getElementById("inputButton"),
    inputString : "",

    getSearchInput : function(){
        this.inputButton.addEventListener("click", function(){
            if(SearchInputService.input.value === "") return;

            SearchInputService.inputString = SearchInputService.input.value;
            input.value = "";

            let found = SearchInputService.searchThroughHighTier();
            if(found !== undefined){
                UiService.replyMessages(SearchInputService.inputString, found.item.reply);
                UiService.sleep().then(() => { ButtonsService.getInfoButtons(found.item, found.branch); });
            }
            else{
                let found = SearchInputService.searchThroughMidTier();
                if(found !== undefined){
                    ButtonsService.getDataButtons(found.item, found.branch, SearchInputService.inputString);
                }else{
                    let found = SearchInputService.searchThroughLowTier();
                    ButtonsService.mainButtonsLogic(found, SearchInputService.inputString);
                }
            }

            // UiService.replySearchMessage(SearchInputService.inputString, "Neshto vrakja");
        });

        this.input.addEventListener("keypress", function(e){
            if(e.which === 13){
                SearchInputService.inputButton.click();
            }
        });
    },

    searchThroughHighTier : function(){
        for(let branch in DataService.cachedData){
            for(let item of DataService.cachedData[branch]){
                if(item.studyPrograms !== undefined){
                    for(let program of item.studyPrograms){
                        if(SearchInputService.inputString.toLowerCase().includes(program.name.toLowerCase())){
                            return{
                                item : program,
                                branch : branch
                            }
                        }
                    }
                }
            }
        }
    },

    searchThroughMidTier : function(){
        for(let branch in DataService.cachedData){
            for(let item of DataService.cachedData[branch]){
                if(SearchInputService.inputString.toLowerCase().includes(item.name.toLowerCase())){
                    return {
                        branch: branch,
                        item: item.nameId
                    }
                }
            }
        }
    },

    searchThroughLowTier: function(){
        for(let branch in DataService.cachedData){
            if(SearchInputService.inputString.toLowerCase().includes(branch.toLowerCase())){
                return branch;
            }
        }
    }
};