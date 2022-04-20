let notePadStorage = window.localStorage;

class Notepad {

    constructor() {
        console.log("NotePadConstructor");// NotePad 클래스 인스턴스 확인
        this.render(); // render 메소드 실행
    }

    //File 버튼 클릭시 메뉴 숨김/표현
    fileMenuHidDisplay() {
        let menu_drop = document.getElementById("menu_drop");

        if (menu_drop.style.display === "none") {
            menu_drop.style.display = "block";
            menu_drop.style.zIndex = "15";
            console.log("oho");
        } else if (menu_drop.style.display === "block") {
            menu_drop.style.display = "none";
            menu_drop.style.zIndex = "0";
        }

    }

    newTextPanelCreate() {
        let newTextElement = document.createElement("div");
        newTextElement.setAttribute("id", `editPanel_${countCreatedPanel}`);
        newTextElement.classList.add("edit_panel");
        newTextElement.style.zIndex = "10";
        newTextElement.style.position = "absolute";
        newTextElement.innerHTML += textEditorPanel;
        document.getElementById("content_box").append(newTextElement);
    }

    newPanelTabCreate() {
        let newTextTab = document.createElement("div");

        newTextTab.classList.add("tabs");
        newTextTab.style.width = "150px";
        newTextTab.style.height = "max-content";
        newTextTab.style.backgroundColor = "green";
        newTextTab.innerText = "noName" + countCreatedPanel;
        newTextTab.setAttribute("id", `tab_${countCreatedPanel}`);
        newTextTab.setAttribute("contenteditable", "true");

        newTextTab.addEventListener("click", (e) => {
            let targetPanel = e.target.getAttribute("id").split("_")[1];
            this.convertTab(targetPanel);
        });

        document.getElementById("tabList_box").append(newTextTab);
    }

    convertTab(e) {
        let targetPanelNumber = Number(e);
        let pullUpPanel = document.getElementById(`editPanel_${targetPanelNumber}`);
        this.pushDownPanels();
        pullUpPanel.style.zIndex = "10";
    }

    pushDownPanels() {

        let edit_panels = document.getElementsByClassName("edit_panel");

        if (edit_panels.length !== 0) {
            for (let i = 0; i < edit_panels.length; i++) {
                edit_panels.item(i).style.zIndex = "0";
            }
        }
    }

    newTextFileCreate() {
        this.pushDownPanels();
        this.newTextPanelCreate();
        this.newPanelTabCreate();
        this.fileMenuHidDisplay();

        countCreatedPanel++;
        console.log(countCreatedPanel);
    }

    eventListeners() {
        let fileButton = document.getElementById("file_button");
        let newFileCreateButton = document.getElementById("fileNew_button");
        let saveFileButton = document.getElementById("fileSave_button");

        fileButton.addEventListener("click", (e) => {
            this.fileMenuHidDisplay();
        });

        newFileCreateButton.addEventListener("click", (e) => {
            this.newTextFileCreate();
        });
        saveFileButton.addEventListener("click", (e) => {
            this.saveFile();
        });

    }

    findEditedNotePad(){

    }

    saveFileAsName() {

    }

    saveFile() {
        let edit_panels = document.getElementsByClassName("edit_panel");
        for (let i = 0; i < edit_panels.length; i++) {

            if (window.getComputedStyle(edit_panels[i]).zIndex == 10) {
                let saveTargetPanel_id = edit_panels[i].getAttribute("id").split("_")[1];
                let contentToSaving = edit_panels[i].children[1].children[0].textContent;
                let saveTargetTab_title = document.getElementById(`tab_${saveTargetPanel_id}`).textContent;
                console.log(saveTargetTab_title);
                console.log(contentToSaving);
                console.log(saveTargetPanel_id);
                notePadStorage.setItem(saveTargetTab_title, contentToSaving);

            }

        }
    }

    render() {
        this.eventListeners();
    }

}


const textEditorPanel =
    "<div class=\"textEdit_box\">" +
    "<ul class=\"edit_tool_list\">" +
    "<li style=\"font-weight: bolder\"><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'bold\')\">B</a></li>" +
    "<li style=\"font-style: italic\"><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'italic\')\">I</a></li>" +
    "<li style=\"text-decoration: underline\"><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'underline\')\">U</a></li>" +
    "<li style=\"text-decoration: line-through\"><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'strikeThrough\')\">S</a></li>" +
    "<li><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'justifyLeft\')\">Left</a></li>" +
    "<li><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'justifyCenter\')\">Center</a></li>" +
    "<li><a class=\"editor_tool_button\" onClick=\"document.execCommand(\'justifyRight\'),console.log(\'aaa\')\">Right</a></li>" +
    "</ul>" +
    "</div>" +
    "<div class=\"textArea_box\" style=\"user-select: none\">" +
    "<div class=\"textArea\" contentEditable=\"true\" style=\"resize: none; user-select: none\">" +
    "</div>" +
    "</div>";
let countCreatedPanel = 0;