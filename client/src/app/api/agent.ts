import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

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
    try {
        await sleep(1500);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;