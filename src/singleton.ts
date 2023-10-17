class Singleton {
    private static instance: Singleton;
    public id: string;

     private constructor() {
        this.id = Math.random().toString(16).slice(2);
     }

     public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
     }
}

export default Singleton;