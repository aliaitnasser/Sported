import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error     : ServerError | null = null;
    token     : string      | null = null;
    appLoaded : boolean            = false;

    constructor() {
        makeAutoObservable(this)
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    //* Setting the JWT to the browser local storage
    setToken = (token: string | null) => {
        if (token) window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}