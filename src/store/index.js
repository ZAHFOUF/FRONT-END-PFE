/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit' ;
import users from '../store/res/users';
import organismes from './res/organismes';
import projects from './res/projects';
import phases from './res/phases';
import deliverables from './res/deliverables';





export const store = configureStore ({
     reducer : {
        users : users.reducer ,
        organismes : organismes.reducer ,
        projects:projects.reducer ,
        phases : phases.reducer , 
        deliverables : deliverables.reducer
     }
})
export const actionsUsers = users.actions

export const actionsOrganismes = organismes.actions

export const actionsProjects = projects.actions

export const actionsDeliverables = deliverables.actions

export const actionsPhases = phases.actions




/* store.dispatch({
     type:"users/addUsers",
     payload:{name:"Younes",id:uuid()}
}) */

