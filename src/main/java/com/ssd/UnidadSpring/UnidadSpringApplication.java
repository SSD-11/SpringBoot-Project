package com.ssd.UnidadSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("repositories")
public class UnidadSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnidadSpringApplication.class, args);
    }

}
