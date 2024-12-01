package com.furkanerd.backend.service.impl;

import com.furkanerd.backend.exception.GeneralException;
import com.furkanerd.backend.model.entity.User;
import com.furkanerd.backend.model.enums.Role;
import com.furkanerd.backend.repository.UserRepository;
import com.furkanerd.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @Override
    public List<User> getUserByRole(Role role) {
        return  userRepository.findAllByRole(role);
    }

    @Override
    public List<User> getPotentialUsers(List<Integer> idList) {
        if (idList.isEmpty()) {
            getUserByRole(Role.STUDENT);
        }
        return userRepository.findAllByRoleAndIdIsNotIn(Role.STUDENT, idList);

    }
    @Override
    public User save(User user) {
        if(user.getId() == null){
            if(user.getIdentityNo() == null && user.getIdentityNo().length() != 11){
                throw new GeneralException("Invalid Indentity-No");
            }
            if(userRepository.existsByIdentityNo(user.getIdentityNo())){
                throw new GeneralException("This Identity-No already exsits");
            }
        }
        return userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new GeneralException("User not found");
        }
        return user.get();

    }

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public void delete(Integer id) {
        if(!userRepository.existsById(id)){
            throw new GeneralException("User not found");
        }
        userRepository.deleteById(id);
    }
}
