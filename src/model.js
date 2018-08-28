export class PasswordList {

    constructor() {
        this.items = new Array();
        this.addListener = new Array();
        this.removeListener = new Array();
    }

    add(item) {
        var index = this.items.push(item);
        this.addListener.forEach((listener) => {
            listener(index, item);
        });
    }

    remove(index) {
        this.removeListener.forEach((listener) => {
            listener(index, this.items[index]);
        }, this);
        this.items.splice(index, 1);
    }

    list() {
        return this.items;
    }

    export() {
        return JSON.stringify(this.items);
    }

    import(data) {
        if (data) {
            var newData = JSON.parse(data);
            newData.forEach((item) => {
                this.add(item);
            }, this);
        }
    }

    registerAddListener(callback) {
        this.addListener.push(callback);
    }

    unregisterAddListener(callback) {
        var index = this.addListener.indexOf(callback);
        this.addListener.splice(index, 1);
    }

    registerRemoveListener(callback) {
        this.removeListener.push(callback);
    }

    unregisterRemoveListener(callback) {
        var index = this.removeListener.indexOf(callback);
        this.removeListener.splice(index, 1);
    }

}

export class PasswordModel {

    constructor(name, account, password) {
        this.name = name;
        this.account = account;
        this.password = password;
    }

}