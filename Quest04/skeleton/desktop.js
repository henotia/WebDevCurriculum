class Dragable {
    addDragEvent(containerEl) {
        let drag = false;
        let firstX;
        let firstY;

        containerEl.addEventListener('mousedown', (e) => {
            if (!drag) {
                console.log('mousedown');
                drag = true;
                if (!containerEl.style.transform) {
                    firstX = e.pageX;
                    firstY = e.pageY;
                }
                containerEl.classList.add("drag");
            }
        })
        containerEl.addEventListener('mousemove', (e) => {
            if (drag) {
                console.log('mousemove');
                //마우스가 움직일 때 container에 위치 변경
                console.log(e.pageX, e.pageY);
                containerEl.style.transform = `translate(${e.pageX - firstX}px,${e.pageY - firstY}px)`;
            }
        })
        containerEl.addEventListener('mouseleave', (e) => {
            if (drag) {
                console.log('mouseleave');
                drag = false;
                containerEl.classList.remove("drag");
            }
        })
        containerEl.addEventListener('mouseup', (e) => {
            if (drag) {
                console.log('mouseup');
                drag = false;
                containerEl.classList.remove('drag');
            }
        })
    }
}

class Desktop {
    folders = [];
    icons = [];

    constructor(elementId, countOfFolder, countOfIcon) {
        this.elementId = elementId;
        this.desktopEl = document.getElementById(elementId);

        this.countOfIcon = countOfIcon;
        this.countOfFolder = countOfFolder;

        for (let i = 0; i < this.countOfIcon; i++) {
            const folder = new Folder(`folder ${i}`);
            this.folders.push(folder);
        }

        for (let i = 0; i < this.countOfFolder; i++) {
            const icon = new Icon(`icon ${i}`);
            this.icons.push(icon);
        }

    }

    render() {
        this.folders.forEach(folder => {

            const folderContainer = folder.render();

            this.addDoubleClick(folder.name, folderContainer);
            this.desktopEl.appendChild(folderContainer);
        });
        this.icons.forEach(icon => {
            const iconContainer = icon.render();
            this.desktopEl.appendChild(iconContainer);
        });
    }

    addDoubleClick(folderName, containerEl) {
        containerEl.addEventListener('dblclick', e => {
            console.log('dblClick');
            const window = new Window(folderName);

            const windowEl = window.render();
            this.desktopEl.appendChild(windowEl);

        })
    }

};

class Window extends Dragable {
    constructor(name) {
        super();
        this.name = name;
    }

    render() {
        const windowEl = document.createElement("div");
        windowEl.classList.add("window"   );

        const headerEl = document.createElement("h1");
        headerEl.textContent = this.name;

        windowEl.appendChild(headerEl);

        this.addDragEvent(windowEl);

        return windowEl;
    }

};


class Item extends Dragable {
    name;
    type;
    image;

    constructor(name, type) {
        super();
        this.name = name;
        this.type = type;
    }

    render() {
        //const folder = new Folder();
        // 화면에 그려줌
        // HTML ELEMEMENT
        const containerEl = document.createElement('div');
        containerEl.classList.add("container", this.type);

        //폴더 아이콘
        const imageEl = document.createElement('img');
        //폴더 이름
        const nameEl = document.createElement('p');
        nameEl.textContent = this.name;

        containerEl.appendChild(imageEl);
        containerEl.appendChild(nameEl);

        this.addDragEvent(containerEl);

        // document.body.appendChild(containerEl);
        return containerEl;
    }

}

class Icon extends Item {

    constructor(name) {
        super(name, 'icon');
    }
};

class Folder extends Item {

    constructor(name) {
        super(name, 'folder');
    }
};

//IIFE
(function () {
//    익명 즉시 실행
})()

function namedFunction() {
    //네임드펑션
    //function body
}

const arrowFunction = (parameter) => {
    //function body
    return 10;
}

const arrowFunc = () => 10;
const sum = (arr) => arr.reduce((s, v) => s + v);

const log = (str) => console.log(str);

const checkMax1 = (a, b) => Math.max(a, b);

const checkMax2 = (a, b) => {
    return Math.max(a, b);
}
