package com.furkanerd.backend.repository;

import com.furkanerd.backend.model.entity.User;
import com.furkanerd.backend.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    boolean existsByIdentityNo(String identityNo);

    List<User> findAllByRole(Role role);

    List<User> findAllByRoleAndIdIsNotIn(Role role,List<Integer> idList);
}
