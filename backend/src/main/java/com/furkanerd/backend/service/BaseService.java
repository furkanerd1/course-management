package com.furkanerd.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BaseService<T> {

        T save(T t);

        List<T> getAll();

        T findById(Integer id);

        Page<T> getAll(Pageable pageable);

        void delete(Integer id);


}
