import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { history } from '../..';

// set the base url for the api
axios.defaults.baseURL = 'https://localhost:5001/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

// sleep function to simulate delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

// Making fake delay to simulate real world
axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error) => {
  const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if(typeof data === 'string') {
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/notfound');
            }
            if(data.errors){
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 404:
            history.push('/notfound');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get  : <T> (url: string) => axios.get<T>(url).then(responseBody),
    post : <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put  : <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del  : <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list   : () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create : (activity: Activity) => requests.post<void>('/activities', activity),
    update : (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete : (id: string) => requests.del<void>(`/activities/${id}`)
}

const Account = {
    current : () => requests.get<User>('/account'),
    login   : (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
}

export default agent;