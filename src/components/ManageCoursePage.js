import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi';
import { toast, Toast } from "react-toastify";

const ManageCoursesPage = props => {
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState({
        id: null,
        slug: '',
        title: '',
        authorId: null,
        category: ''
    });

    useEffect( () => {
        const slug = props.match.params.slug;  // From the path /courses/:slug
        if(slug){
            courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
        }
    }, [props.match.params.slug]);

    const onChange = (event) => {
        //                                v COMPUTED PROPERTY
        const updatedCourse = {...course, [event.target.name]: event.target.value};
        setCourse(updatedCourse);
    }

    const formIsValid = () => {
        const _errors = {};

        if (!course.title) _errors.title = 'Title is required';
        if (!course.authorId) _errors.authorId = 'Author ID is required';
        if (!course.category) _errors.category = 'Category is required';

        setErrors(_errors);

        // Form is valid if errors has no properties
        return Object.keys(_errors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formIsValid()) return;

        courseApi.saveCourse(course).then( () => {
            props.history.push('/courses');
            toast.success('Course saved.');
        });
    }

    return (
        <>
        <h2>Manage Course</h2>
        <CourseForm course={course} onChange={onChange} onSubmit={handleSubmit} errors={errors} />
        </>
    )
}

export default ManageCoursesPage;