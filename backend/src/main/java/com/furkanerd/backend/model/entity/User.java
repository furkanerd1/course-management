package com.furkanerd.backend.model.entity;

import com.furkanerd.backend.model.enums.Gender;
import com.furkanerd.backend.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "surname")
    private String surName;

    @Column(name = "identity_no" , unique = true)
    private String identityNo;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "urole")
    @Enumerated(EnumType.STRING)
    private Role role;
}
