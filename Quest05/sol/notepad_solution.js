class Notepad {
    #files = [];
    #command;
    #tab;
    #indicator;
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
        this.#indicatorInit();
        this.render();
    }

    #sidebarInit() {
        this.$sidebar = document.getElementById('sidebar');
        this.#sidebarUpdate();
    }

    #sidebarUpdate() {
        const $fileWrapper = document.getElementById('files');
        $fileWrapper.innerHTML = '';

        const $files = this.#files.map(file => {
            const fileItem = document.createElement('li');
            fileItem.innerHTML = file.name;
            fileItem.classList.add('file');

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

    #commandInit() {
        this.#command = new Command();
        this.#command.onNewFile = () => {
            const filename = prompt('만들 파일 이름');
            if (!filename.trim()) alert('파일명을 입력하세요');

            // 같은 파일 체크
            const hasSameFile = this.#files.some(file => file.name === filename)
            if (hasSameFile) {
                alert('같은 파일이 이미 존재합니다');
                return;
            }

            const file = new File(filename);
            this.#files.push(file);
            this.#sidebarUpdate();
        }
        this.#command.onLoad = () => {
            console.log('load');
        }
        this.#command.onSave = () => console.log('save');
        this.#command.onSaveAs = () => console.log('save as');
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
        this.#indicator.render();
    }
    #indicatorInit(){
        this.#indicator = new Indicator();
    }

    render() {
        this.#command.render();
    }
}

class Tab {
    activeFile;
    callback;
    indicator;
    constructor(activeFile) {
        this.$tab = document.getElementById('tab-area');
        this.activeFile = activeFile;
    }

    onTabClick(callback) {
        this.callback = callback;
    }

    render(openFiles, activeFile) {
        const $tabs = openFiles.map(file => {
            const tabItem = document.createElement('div');
            tabItem.classList.add('tab');
            if (file.name === activeFile.name) {
                this.activeFile = activeFile;
                tabItem.classList.add('active');
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

    save() {
        this.isEdited = false;
        // Save Logic
        // ~~
    }
}

class Command {
    commands = [{
        id: 'new-file',
        label: '새 파일',
        callback: () => {
        }
    }, {
        id: 'load', label: '로드', callback: () => {
        }
    }, {
        id: 'save', label: '저장', callback: () => {
        }
    }, {
        id: 'save-as', label: '다른 이름으로 저장', callback: () => {
        }
    }];

    constructor() {
        this.$el = document.getElementById('commands');
    }

    render() {
        const buttons = this.commands.map(command => this.#makeButton(command))
        console.log(buttons);
        this.$el.append(...buttons);
    }

    #makeButton(command) {
        const button = document.createElement('button');
        button.id = command.id;
        button.innerText = command.label;
        button.onclick = command.callback;

        return button;
    }

    set onSave(callback) {
        const id = 'save';
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

    set onLoad(callback) {
        const id = 'load';
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

    set onNewFile(callback) {
        const id = 'new-file';
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }

    set onSaveAs(callback) {
        const id = 'save-as';
        const command = this.commands.find(command => command.id === id);
        if (command) {
            command.callback = callback;
        }
    }
}

class Editor {
    constructor() {
    }
}
class Indicator{
    constructor() {
        this.$el = document.getElementsByClassName("tab");
        console.log("Indicator Constructor");
    }

    #makeIndicatorCircle(){
        const indicatorCircle = document.createElement('div');
        indicatorCircle.classList.add("indicatorCircle");
        console.log("indicator #makeIndicator");
        return indicatorCircle;
    }
    render(){
        const indicator = this.#makeIndicatorCircle;
        this.$el.append(indicator);
        console.log("indicator render");

    }

}


