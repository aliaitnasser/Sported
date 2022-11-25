import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity : Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this); 
    }

    //* Computed properties
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    //* Getting the activities from the API
    loadActivities = async () => {
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        }catch(error)
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    //* Setting the loading initial
    setLoadingInitial = (state : boolean) => {
        this.loadingInitial = state;
    }

    //* Selecting an activity
    selectActivity = (id : string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    //* Canceling the selected activity
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    //* Opening the form to edit an activity
    openForm = (id? : string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    //* Closing the form to edit an activity
    closeForm = () => {
        this.editMode = false;
    }

    //* Creating an activity
    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
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
                this.editMode = false;
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
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
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