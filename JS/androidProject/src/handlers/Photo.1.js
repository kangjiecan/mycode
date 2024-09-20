class Photo {
    String; #name;
    String; #path;
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }

    update(photo) {
        this.photos.push(photo);
    }

    get() {
        return this.photos;
    }
}
