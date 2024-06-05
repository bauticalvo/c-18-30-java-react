package com.telemedicina.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin(""); // Permite solicitudes desde cualquier origen. Puedes ajustarlo según tus necesidades.
        config.addAllowedMethod(""); // Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.).
        config.addAllowedHeader("*"); // Permite todos los encabezados en las solicitudes.
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

