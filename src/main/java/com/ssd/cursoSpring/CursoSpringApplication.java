package com.ssd.cursoSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("repositories")
public class CursoSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(CursoSpringApplication.class, args);
    }

}
