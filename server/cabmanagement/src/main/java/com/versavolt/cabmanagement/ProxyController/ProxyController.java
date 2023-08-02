package com.versavolt.cabmanagement.ProxyController;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ProxyController {

    @GetMapping("/proxy")
    public ResponseEntity<?> proxyRequest() {
        String apiUrl = "http://65.1.211.114:8080/driverapi"; // Replace with your API endpoint

        // Create a RestTemplate instance to make the API request
        RestTemplate restTemplate = new RestTemplate();

        // Make the request to the API and retrieve the response
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, null, String.class);

        // Return the API response back to the frontend
        return response;
    }
}