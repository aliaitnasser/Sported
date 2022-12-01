import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error     : ServerError | null = null;
    token     : string      | null = window.localStorage.getItem('jwt');
    appLoaded : boolean            = false;

    constructor() {
        makeAutoObservable(this)

        //* reaction is a mobx function that will run when the token changes
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }
    
    setServerError = (error: ServerError) => {
        this.error = error;
    }

    //* Setting the JWT to the browser local storage
    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}