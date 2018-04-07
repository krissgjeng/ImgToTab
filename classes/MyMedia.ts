abstract class MyMedia {
    public url:string;
    public html:string;

    public 
    public get fileName() : string {
        return this.url.substring(this.url.lastIndexOf("/"));
    }
    
}