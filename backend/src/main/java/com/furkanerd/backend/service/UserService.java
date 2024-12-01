package com.furkanerd.backend.service;

import com.furkanerd.backend.model.entity.User;
import com.furkanerd.backend.model.enums.Role;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService extends  BaseService<User> {

    List<User> getUserByRole(Role role);

    List<User> getPotentialUsers(List<Integer> ids);

}
