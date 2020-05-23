
let Events = require('events');

class СameraMenu extends Events
{
    constructor(domObjectId, menuItemsArray, callbacks = [], disableItems)
    {
        super();
        if (domObjectId && menuItemsArray && callbacks && disableItems) {
            this.m_menu = document.getElementById(domObjectId);
            this.m_callbacks = callbacks;
            this.m_menuItemsArray = menuItemsArray;
            if (this.m_menu) {
                this._fillMenu();
            }
            this.m_disableItems = disableItems;
        }
    }

    _fillMenu()
    {
        if (this.m_menuItemsArray) {
            for (let index in this.m_menuItemsArray)
            {
                let temporaryElement = document.createElement("button");
                temporaryElement.onclick = this.m_callbacks[index];
                
                let internalImage = document.createElement("img");
                let internalCaption  = document.createElement("p");

                internalImage.src = this.m_menuItemsArray[index]["iconPath"];
                internalCaption.innerHTML = this.m_menuItemsArray[index]["caption"];
                temporaryElement.append(internalImage);
                temporaryElement.append(internalCaption);
                
                temporaryElement.classList.add("menuItem");
                internalImage.classList.add("image");

                this.m_menu.append(temporaryElement);
            }
            this._resize();
        }
    }

    _resize()
    {
        let afterElement = document.getElementById("pointer");
        afterElement.style.left = this.m_menu.clientWidth / 2 - 85/2 + "px";
    };

    _onCameraStateChanged(state)
    {
        this._checkMenuItems(state);
    }

    _checkMenuItems(objects)
    {
        let currentItem = 0
        for(let item in this.m_disableItems)
        {
            
            if (!this.m_disableItems[item]["disableInformation"])
            {
                currentItem++;
                continue;
            }
            if (this.m_disableItems[item]["disableInformation"]["name"]
            && this.m_disableItems[item]["disableInformation"]["state"] === objects[this.m_disableItems[item]["disableInformation"]["name"]])
            {
                this._disableMenuItem(currentItem, true);
            }
            else 
            {
                this._disableMenuItem(currentItem, false)
            }

            currentItem++;
        }
    }
    _disableMenuItem(index, disable)
    {
        this.m_menu.childNodes[index + 3].disabled = disable;
    }
}


if (module.parent === null) {
    console.log("Local using.");
}
else {
    module.exports = СameraMenu;
}
