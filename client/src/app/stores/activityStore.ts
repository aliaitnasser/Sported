import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity : Activity | undefined = undefined;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this); 
    }

    //* Computed propertie : sorter by date
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    //* Computed propertie : grouped by date
    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    //* Getting the activities from the API
    loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        }catch(error)
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    //* Loading a single activity
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            this.setLoadingInitial(false);
            return activity;
        }else{
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    //* Getting the activity from the registry
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    //* Setting the activity
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    //* Setting the loading initial
    setLoadingInitial = (state : boolean) => {
        this.loadingInitial = state;
    }

    //* Creating an activity
    createActivity = async (activity : Activity) => {
        this.loading = true;
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
            })
        }catch(error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    //* Updating an activity
    updateActivity = async (activity : Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
            })
        }catch(error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    //* Deleting an activity
    deleteActivity = async (id : string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        }catch(error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}