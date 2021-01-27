import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';

// Action Creator
export function saveCourse(course){
    return courseApi.saveCourse(course).then(savedCourse => {
        // Dispatcher, "go tell all the stores that a course was created"
        dispatcher.dispatch({
            actionType: actionTypes.CREATE_COURSE,
            course: savedCourse
        });
    })
}