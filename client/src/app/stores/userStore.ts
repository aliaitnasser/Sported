import { makeAutoObservable, runInAction } from 'mobx';
import { User, UserFormValues } from '../models/user';
import agent from '../api/agent';
import { store } from './store';
import { history } from '../..';
export default class UserStore {

    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    //* Check if there is a user logged in
    get isLoggedIn(){
        // the double exclamation to convert the user to boolean
        return !!this.user;
    }

    //* Handle the login
    login = async (creds : UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            console.log(user);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    //* Handle Register
    Register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            history.push('/activities')
            console.log(user)
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    //* Handle logout
    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
        window.location.reload();
    }


    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}