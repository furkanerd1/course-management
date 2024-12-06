package com.furkanerd.backend.service.impl;

import com.furkanerd.backend.exception.GeneralException;
import com.furkanerd.backend.model.entity.Course;
import com.furkanerd.backend.repository.CourseRepository;
import com.furkanerd.backend.repository.UserRepository;
import com.furkanerd.backend.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, UserRepository userRepository){
        this.courseRepository=courseRepository;
    }

    @Override
    public Course save(Course course) {
        if(course.getName().isBlank()){
            throw  new GeneralException("Name cannot be empty!");
        }else if (course.getTeacher() == null) {
            throw  new GeneralException("Teacher cannot be empty!");
        }
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @Override
    public Course findById(Integer id) {
        Optional<Course> course = courseRepository.findById(id);
        if(course.isEmpty()){
            throw new GeneralException("Course not found!");
        }
        return course.get();
    }

    @Override
    public Page<Course> getAll(Pageable pageable) {
        return courseRepository.findAll(pageable);
    }

    @Override
    public void delete(Integer id) {
        if(!courseRepository.existsById(id)){
            throw new GeneralException("Course not found!");
        }
        courseRepository.deleteById(id);
    }
}
