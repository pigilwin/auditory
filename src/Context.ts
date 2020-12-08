import { Database } from "./database/database";

export class Context {
    
    private static _instance: Context;
    
    private constructor(public readonly database: Database, public readonly audio: AudioContext){}

    public static load(database: Database, audio: AudioContext) {
        Context._instance = new Context(database, audio);
    }

    public static get(): Context {
        if (Context._instance === undefined) {
            throw new Error('Context has not been created correctly');
        }
        return Context._instance;
    }
}