package com.example.back.dto;

import com.example.back.models.Movie;

import java.security.Timestamp;
import java.util.List;

public class MovieDTO {
    private Long id;
    private String title;
    private String description;
    private String duration;
    private String releaseDate;
    private List<String> genre;
    private String movieUrl;
    private String displayPic;
    private Timestamp createdAt;

    public MovieDTO(Movie movie) {
        this.id = movie.getId();
        this.title = movie.getTitle();
        this.description = movie.getDescription();
        this.duration = movie.getDuration();
        this.releaseDate = movie.getReleaseDate();
        this.genre = movie.getGenre();
        this.movieUrl = movie.getMovieUrl();
        this.displayPic = movie.getDisplayPic();
    }
}