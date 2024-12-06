package com.furkanerd.backend.controller;

import com.furkanerd.backend.model.entity.User;
import com.furkanerd.backend.model.enums.Role;
import com.furkanerd.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(userService.getAll(PageRequest.of(page,pageSize, Sort.by("id"))));

    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/by-role")
    public ResponseEntity<List<User>> getUserByRole(@RequestParam Role role){
       return  ResponseEntity.ok(userService.getUserByRole(role));
    }

    @GetMapping("/potential-students")
    public ResponseEntity<List<User>> getPotential(@RequestBody List<Integer> idList){
        return  ResponseEntity.ok(userService.getPotentialUsers(idList));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id){
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

}
