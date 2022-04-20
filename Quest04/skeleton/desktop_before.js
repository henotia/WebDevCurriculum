

class Desktop {
    folders =[];
    icons = [];
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(elementId,countOfFolder, countOfIcon) {
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
    render(){
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

    addDoubleClick(folderName, containerEl){
        containerEl.addEventListener('dblclick', e =>{
            console.log('dblClick');
            const window = new Window(folderName);

            const windowEl = window.render();
            this.addDragEvent(windowEl);
            this.desktopEl.appendChild(windowEl);

        })
    }

    addDragEvent(containerEl){
        let drag = false;
        let firstX;
        let firstY;

        containerEl.addEventListener('mousedown', (e)=> {
            if (!drag){
                console.log('mousedown');
                drag = true;
                if (!containerEl.style.transform){
                    firstX = e.pageX;
                    firstY = e.pageY;
                }
                containerEl.classList.add("drag");
            }
        })
        containerEl.addEventListener('mousemove', (e)=> {
            if (drag){
                console.log('mousemove');
                //마우스가 움직일 때 container에 위치 변경
                console.log(e.pageX,e.pageY);
                containerEl.style.transform = `translate(${e.pageX - firstX}px,${e.pageY - firstY}px)`;
            }
        })
        containerEl.addEventListener('mouseleave', (e)=> {
            if (drag){
                console.log('mouseleave');
                drag = false;
                containerEl.classList.remove("drag");
            }
        })
        containerEl.addEventListener('mouseup', (e)=> {
            if (drag){
                console.log('mouseup');
                drag = false;
                containerEl.classList.remove('drag');
            }
        })
    }

    test(){
        this.folders.forEach(folder => {
            console.log('folder : ', folder);
        })
        this.icons.forEach(icon => {
                console.log('icon : ',icon);
            }
        )
    }
};

class Icon {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    name;
    image;
    constructor(name) {
        this.name = name;
    }

    render() {
        //const folder = new Folder();
        // 화면에 그려줌
        // HTML ELEMEMENT
        const containerEl = document.createElement('div');
        containerEl.classList.add("container", "icon");

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

    addDragEvent(containerEl){
        let drag = false;
        let firstX;
        let firstY;

        containerEl.addEventListener('mousedown', (e)=> {
           if (!drag){
               console.log('mousedown');
               drag = true;
               if (!containerEl.style.transform){
                   firstX = e.pageX;
                   firstY = e.pageY;
               }
               containerEl.classList.add("drag");
           }
        })
        containerEl.addEventListener('mousemove', (e)=> {
            if (drag){
                console.log('mousemove');
                //마우스가 움직일 때 container에 위치 변경
                console.log(e.pageX,e.pageY);
                containerEl.style.transform = `translate(${e.pageX - firstX}px,${e.pageY - firstY}px)`;
            }
        })
        containerEl.addEventListener('mouseleave', (e)=> {
            if (drag){
                console.log('mouseleave');
                drag = false;
                containerEl.classList.remove("drag");
            }
        })
        containerEl.addEventListener('mouseup', (e)=> {
            if (drag){
                console.log('mouseup');
                drag = false;
                containerEl.classList.remove('drag');
            }
        })
    }
};

class Folder {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    name;
    image;

    constructor(name) {
        this.name = name;
    }
    render() {
        //const folder = new Folder();
        // 화면에 그려줌
        // HTML ELEMEMENT
        const containerEl = document.createElement('div');
        containerEl.classList.add("container", "folder");
        
        //폴더 아이콘
        const imageEl = document.createElement('img');
        //폴더 이름
        const nameEl = document.createElement('p');
        nameEl.textContent = this.name;

        containerEl.appendChild(imageEl);
        containerEl.appendChild(nameEl);

        this.addDragEvent(containerEl);

        document.body.appendChild(containerEl);
        return containerEl;
   }

    addDragEvent(containerEl){
        let drag = false;
        let firstX;
        let firstY;

        containerEl.addEventListener('mousedown', (e)=> {
            if (!drag){
                console.log('mousedown');
                drag = true;
                if (!containerEl.style.transform){
                    firstX = e.pageX;
                    firstY = e.pageY;
                }
                containerEl.classList.add("drag");
            }
        })
        containerEl.addEventListener('mousemove', (e)=> {
            if (drag){
                console.log('mousemove');
                //마우스가 움직일 때 container에 위치 변경
                console.log(e.pageX,e.pageY);
                containerEl.style.transform = `translate(${e.pageX - firstX}px,${e.pageY - firstY}px)`;
            }
        })
        containerEl.addEventListener('mouseleave', (e)=> {
            if (drag){
                console.log('mouseleave');
                drag = false;
                containerEl.classList.remove("drag");
            }
        })
        containerEl.addEventListener('mouseup', (e)=> {
            if (drag){
                console.log('mouseup');
                drag = false;
                containerEl.classList.remove('drag');
            }
        })
    }


};

class Window {
    constructor(name) {
        this.name = name;
    }
    render(){
        const windowEl = document.createElement("div");
        windowEl.classList.add("window");

        const headerEl = document.createElement("h1");
        headerEl.textContent = this.name;

        windowEl.appendChild(headerEl);
        return windowEl;
    }
};