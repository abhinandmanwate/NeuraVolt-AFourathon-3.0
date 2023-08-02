package com.versavolt.cabmanagement.controller;

import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.service.CabService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CabControllerTest {

    @Mock
    private CabService cabService;

    private CabController cabController;

    private Cab testCab;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cabController = new CabController(cabService);

        // Create a test Cab object
        testCab = new Cab("ABC123", "Sedan", "Black");
    }

    @AfterEach
    void tearDown() {
        // Clean up or reset any changes made during the test
        testCab = null;
    }

    @Test
    void createCabDetails() {
        // Arrange
        Cab cab = testCab;

        // Act
        String result = cabController.createCabDetails(cab);

        // Assert
        assertThat(result).isEqualTo("Cab added successfully!");
        verify(cabService).createCab(cab);
    }

    @Test
    void getCabDetails() {

        List<Cab> cabs = new ArrayList<>();
        cabs.add(testCab);
        when(cabService.getAllCab()).thenReturn(cabs);

        List<Cab> result = cabController.getCabDetails();

        assertThat(result).hasSize(1);
        assertThat(result).containsExactlyElementsOf(cabs);
        verify(cabService).getAllCab();
    }

    @Test
    void updateCabDetails() {

        Cab cab = testCab;

        String result = cabController.updateCabDetails(cab);

        assertThat(result).isEqualTo("Cab details updated successfully!");
        verify(cabService).updateCab(cab);
    }

    @Test
    void deleteCabDetails() {
        // Arrange
        String cabRegistrationNumber = "ABC123";
        String result = cabController.deleteCabDetails(cabRegistrationNumber);

        assertThat(result).isEqualTo("Cab details deleted successfully!");
        verify(cabService).deleteCab(cabRegistrationNumber);
    }

    @Test
    void assignDriverToCab_Success() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        String driverIdNumber = "123456789";
        when(cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber)).thenReturn(testCab);
        ResponseEntity<String> response = cabController.assignDriverToCab(cabRegistrationNumber, driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Driver assigned to cab successfully");
        verify(cabService).assignDriverToCab(cabRegistrationNumber, driverIdNumber);
    }

    @Test
    void assignDriverToCab_CabOrDriverNotFound() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        String driverIdNumber = "123456789";
        when(cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber)).thenReturn(null);

        ResponseEntity<String> response = cabController.assignDriverToCab(cabRegistrationNumber, driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(cabService).assignDriverToCab(cabRegistrationNumber, driverIdNumber);
    }

    @Test
    void assignDriverToCab_ExceptionThrown() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        String driverIdNumber = "123456789";
        when(cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber))
                .thenThrow(new RuntimeException("Failed to assign driver to cab"));

        ResponseEntity<String> response = cabController.assignDriverToCab(cabRegistrationNumber, driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo("Error assigning driver to cab: Failed to assign driver to cab");
        verify(cabService).assignDriverToCab(cabRegistrationNumber, driverIdNumber);
    }

    @Test
    void updateAssignedDriver_Success() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        String driverIdNumber = "123456789";
        when(cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber)).thenReturn(testCab);
        ResponseEntity<String> response = cabController.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Assigned driver updated successfully");
        verify(cabService).updateAssignedDriver(cabRegistrationNumber, driverIdNumber);
    }

    @Test
    void updateAssignedDriver_CabOrDriverNotFound() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        String driverIdNumber = "123456789";
        when(cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber)).thenReturn(null);
        ResponseEntity<String> response = cabController.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);


        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(cabService).updateAssignedDriver(cabRegistrationNumber, driverIdNumber);
    }

    @Test
    void updateAssignedDriver_ExceptionThrown() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        String driverIdNumber = "123456789";
        when(cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber))
                .thenThrow(new RuntimeException("Failed to update assigned driver"));

        ResponseEntity<String> response = cabController.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo("Error updating assigned driver: Failed to update assigned driver");
        verify(cabService).updateAssignedDriver(cabRegistrationNumber, driverIdNumber);
    }

    @Test
    void getAssignedDriver_Success() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        Driver driver = new Driver("123456789", "John Doe",
                "johndoe@example.com", "1234567890");
        when(cabService.getAssignedDriver(cabRegistrationNumber)).thenReturn(driver);

        ResponseEntity<Driver> response = cabController.getAssignedDriver(cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(driver);
        verify(cabService).getAssignedDriver(cabRegistrationNumber);
    }

    @Test
    void getAssignedDriver_CabNotFound() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        when(cabService.getAssignedDriver(cabRegistrationNumber)).thenReturn(null);

        ResponseEntity<Driver> response = cabController.getAssignedDriver(cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(cabService).getAssignedDriver(cabRegistrationNumber);
    }

    @Test
    void getAssignedDriver_ExceptionThrown() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        when(cabService.getAssignedDriver(cabRegistrationNumber))
                .thenThrow(new RuntimeException("Failed to get assigned driver"));

        ResponseEntity<Driver> response = cabController.getAssignedDriver(cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        verify(cabService).getAssignedDriver(cabRegistrationNumber);
    }

    @Test
    void removeAssignedDriver_Success() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        when(cabService.removeAssignedDriver(cabRegistrationNumber)).thenReturn(true);

        ResponseEntity<String> response = cabController.removeAssignedDriver(cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Assigned driver removed successfully");
        verify(cabService).removeAssignedDriver(cabRegistrationNumber);
    }

    @Test
    void removeAssignedDriver_CabNotFound() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        when(cabService.removeAssignedDriver(cabRegistrationNumber)).thenReturn(false);

        ResponseEntity<String> response = cabController.removeAssignedDriver(cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(cabService).removeAssignedDriver(cabRegistrationNumber);
    }

    @Test
    void removeAssignedDriver_ExceptionThrown() {

        String cabRegistrationNumber = testCab.getCabRegistrationNumber();
        when(cabService.removeAssignedDriver(cabRegistrationNumber))
                .thenThrow(new RuntimeException("Failed to remove assigned driver"));

        ResponseEntity<String> response = cabController.removeAssignedDriver(cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo("Error removing assigned driver: Failed to remove assigned driver");
        verify(cabService).removeAssignedDriver(cabRegistrationNumber);
    }
}
