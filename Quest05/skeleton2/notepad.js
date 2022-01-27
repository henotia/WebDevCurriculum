class Notepad {
    #files = [];
    #command;
    #tab;
    $sidebar;
    activeFile;
    openFiles = [];

    constructor() {
        this.init();
    }

    init() {
        this.#sidebarInit();
        this.#commandInit();
        this.#tabInit();
        this.render();
    }

    #sidebarInit() {
        this.$sidebar = document.getElementById("sidebar");
        this.#sidebarUpdate();
    }

    #sidebarUpdate() {
        const $fileWrapper = document.getElementById("files");
        $fileWrapper.innerHTML = "";

        const $files = this.#files.map(file => {
            const fileItem = document.createElement("li");
            fileItem.innerHTML = file.name;
            fileItem.classList.add("file");

            fileItem.onclick = () => {
                this.activeFile = file;

                const isAlreadyOpened = this.openFiles.find(openFile => openFile.name === file.name);
                if (!isAlreadyOpened) {
                    this.openFiles.push(file);
                }
                this.#tabUpdate();
            }
            return fileItem;
        });

        $fileWrapper.append(...$files);
    }

    //이름 중복 파일 체크
    #duplicateNameCheck(filename) {
        const hasSameFile = this.#files.some(file => file.name === filename);
        console.log(hasSameFile);
        if (hasSameFile) {
            alert("같은 이름이 이미 존재합니다.");
        }
        return hasSameFile;
    }

    #commandInit() {
        this.#command = new Command();

        this.#command.onNewFile = () => {
            const filename = prompt("만들 파일 이름");
            if (!filename.trim()) alert(" 파일명을 입력하세요.");

            if(!this.#duplicateNameCheck(filename)){

            const file = new File(filename);
                console.log("file====>"+file);
            this.#files.push(file);
            console.log("this.#files====>"+this.#files);
            this.#sidebarUpdate();
            }
        }
        this.#command.onLoad = () => {
            const filename = prompt("불러올 파일 이름은?");
            const loaded = new File(filename).load(filename);
            this.#files.push(loaded);
            console.log(this.#files);
            if (!this.#duplicateNameCheck(filename)){
            this.#sidebarUpdate();
            }
        }

        this.#command.onSave = () => {
            const filename = document.getElementsByClassName('active')[0].textContent;
            const text = document.getElementById("editor").textContent;
            console.log("save");
            new File().save(filename,text);
        }
        this.#command.onSaveAs = () => console.log("save as");
    }

    #tabInit() {
        this.#tab = new Tab(this.activeFile);
        this.#tab.onTabClick((activeFile) => {
            this.activeFile = activeFile;
            this.#tabUpdate();
        });
    }

    #tabUpdate() {
        this.#tab.render(this.openFiles, this.activeFile);
    }

    render() {
        this.#command.render();
    }
}

class Tab {
    activeFile;
    callback;

    constructor(activeFile) {
        this.$tab = document.getElementById("tab-area");
        this.activeFile = activeFile;
    }

    onTabClick(callback) {
        this.callback = callback;
    }

    render(openFiles, activeFile) {
        const $tabs = openFiles.map(file => {
            const tabItem = document.createElement("div");
            tabItem.classList.add("tab");
            if (file.name === activeFile.name) {
                this.activeFile = activeFile;
                tabItem.classList.add("active");
            }
            tabItem.innerHTML = file.name;

            tabItem.onclick = () => {
                this.activeFile = file;
                this.callback(file);
            }
            return tabItem;
        });
        this.$tab.replaceChildren(...$tabs)
    }
}

class File {
    name;
    text;
    isEdited = false;

    constructor(name, text) {
        this.name = name;
        this.text = text;
    }

    update(text) {
        this.text = text;
        this.isEdited = true;
    }

    save(filename,text) {
        this.isEdited = false;
        console.log(filename);
        localStorage.setItem(filename,"");// 내용 저장 기능 필요. // 변수 안에 넣어서 사용하려면 어떤 클래스에서 선언해서 관리할래? 새로 클래스 메소드를 파는건 어떤가?
        alert("저장완료");
    }

    load(filename) {
        this.name = filename;
        this.text = localStorage.getItem(filename);
        this.isEdited = true;
        return this;
    }
}

class Command {
    commands = [
        {id: "new-file",label: "새 파일",callback: () => {} },
        {id: 'load', label: '로드', callback: () => {} },
        {id: 'save', label: '저장', callback: () => {} },
        {id: 'save-as', label: '다른 이름으로 저장', callback: () => {}  }
    ];

    constructor() {
        this.$el = document.getElementById("commands");
    }

    #makeButton(command) {
        const button = document.createElement("button");
        button.id = command.id;
        button.innerText = command.label;
        button.onclick = command.callback;

        return button;
    }

    render() {
        const buttons = this.commands.map(command => this.#makeButton(command));
        console.log(buttons);
        this.$el.append(...buttons);
    }

    set onSave(callback) {
        const id = "save";
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

    set onLoad(callback) {
        const id = "load";
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

    set onNewFile(callback) {
        const id = "new-file";
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

    set onSaveAs(callback) {
        const id = "save-as";
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

}

class Editor {
}