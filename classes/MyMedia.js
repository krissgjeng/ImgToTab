class MyMedia {
    get fileName() {
        return this.url.substring(this.url.lastIndexOf("/")).replace("/", "");
    }
}
