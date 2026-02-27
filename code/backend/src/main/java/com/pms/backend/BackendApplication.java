package com.pms.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// 1. Check the variable first
		String secret = System.getenv("JWT_SECRET");

		System.out.println("=======================================");
		System.out.println("JWT Secret check: " + (secret != null ? "FOUND " : "NOT FOUND "));
		System.out.println("=======================================");

		// 2. Then start the Spring app
		SpringApplication.run(BackendApplication.class, args);
	}
}