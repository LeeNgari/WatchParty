package com.example.back.repository;

import com.example.back.models.Series;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import java.util.List;

public interface SeriesRepository extends JpaRepositoryImplementation<Series,Long> {
    List<Series> findAllByOrderByCreatedAtDesc();
}
