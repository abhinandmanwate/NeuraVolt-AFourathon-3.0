package com.versavolt.cabmanagement.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // Update with your frontend origin
        configuration.addAllowedOrigin("https://stable-frontend--incredible-salamander-51e48a.netlify.app/");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        source.registerCorsConfiguration("/**", configuration);
        source.registerCorsConfiguration("/proxy", configuration);

        return new CorsFilter(source);
    }
}
