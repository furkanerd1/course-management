package com.furkanerd.backend.controller;

import com.furkanerd.backend.model.entity.Course;
import com.furkanerd.backend.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService){
        this.courseService=courseService;
    }

    @GetMapping
    public ResponseEntity<Page<Course>> getAllUsers(@RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(courseService.getAll(PageRequest.of(page,pageSize, Sort.by("id"))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Integer id) {
        return ResponseEntity.ok(courseService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course){
        return ResponseEntity.ok(courseService.save(course));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Integer id){
        courseService.delete(id);
        return ResponseEntity.ok().build();
    }
}
