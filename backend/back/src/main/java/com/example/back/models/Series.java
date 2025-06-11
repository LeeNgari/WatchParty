package com.example.back.models;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "series")
public class Series {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 1000)
    private String description;
    private String duration;
    private String releaseDate;

    @ElementCollection
    @Column(columnDefinition = "text[]")
    private List<String> genre;

    private String displayPic;

    @ElementCollection
    @Column(columnDefinition = "text[]")
    private List<String> episodes;

    @Column(updatable = false)
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }
}