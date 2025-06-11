package com.example.back.service;

import com.example.back.models.Movie;
import com.example.back.models.Series;
import com.example.back.repository.MovieRepository;
import com.example.back.repository.SeriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {

    private final SeriesRepository seriesRepository;
    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Series> getAllSeries() {
        return seriesRepository.findAllByOrderByCreatedAtDesc();
    }
}
