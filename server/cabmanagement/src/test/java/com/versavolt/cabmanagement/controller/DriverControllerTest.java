package com.versavolt.cabmanagement.controller;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.service.DriverService;
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

class DriverControllerTest {

    @Mock
    private DriverService driverService;
    private DriverController driverController;
    private Driver testDriver;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        driverController = new DriverController(driverService);

        // Create a test Driver object
        testDriver = new Driver("123456789", "John Doe",
                "johndoe@example.com", "1234567890");
    }

    @AfterEach
    void tearDown() {
        // Clean up or reset any changes made during the test
        testDriver = null;
    }

    @Test
    void createDriverDetails() {

        Driver driver = testDriver;
        String result = driverController.createDriverDetails(driver);

        assertThat(result).isEqualTo("Driver added successfully!");
        verify(driverService).createDriver(driver);
    }

    @Test
    void getDriverDetails() {

        List<Driver> drivers = new ArrayList<>();
        drivers.add(testDriver);
        when(driverService.getAllDriver()).thenReturn(drivers);
        List<Driver> result = driverController.getDriverDetails();
        assertThat(result).hasSize(1);
        assertThat(result).containsExactlyElementsOf(drivers);
        verify(driverService).getAllDriver();
    }

    @Test
    void updateDriverDetails() {

        Driver driver = testDriver;

        String result = driverController.updateDriverDetails(driver);

        assertThat(result).isEqualTo("Driver details updated successfully!");
        verify(driverService).updateDriver(driver);
    }

    @Test
    void deleteDriverDetails() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        String result = driverController.deleteDriverDetails(driverIdNumber);

        assertThat(result).isEqualTo("Driver details deleted successfully!");
        verify(driverService).deleteDriver(driverIdNumber);
    }

    @Test
    void assignCabToDriver_Success() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        String cabRegistrationNumber = "ABC123";
        when(driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber)).thenReturn(testDriver);
        ResponseEntity<String> response = driverController.assignCabToDriver(driverIdNumber, cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Cab assigned to driver successfully");
        verify(driverService).assignCabToDriver(driverIdNumber, cabRegistrationNumber);
    }

    @Test
    void assignCabToDriver_DriverOrCabNotFound() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        String cabRegistrationNumber = "ABC123";
        when(driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber)).thenReturn(null);

        ResponseEntity<String> response = driverController.assignCabToDriver(driverIdNumber, cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(driverService).assignCabToDriver(driverIdNumber, cabRegistrationNumber);
    }

    @Test
    void assignCabToDriver_ExceptionThrown() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        String cabRegistrationNumber = "ABC123";
        when(driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber))
                .thenThrow(new RuntimeException("Failed to assign cab to driver"));

        ResponseEntity<String> response = driverController.assignCabToDriver(driverIdNumber, cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo("Error assigning cab to driver: Failed to assign cab to driver");
        verify(driverService).assignCabToDriver(driverIdNumber, cabRegistrationNumber);
    }

    @Test
    void updateAssignedCab_Success() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        String cabRegistrationNumber = "ABC123";
        when(driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber)).thenReturn(testDriver);

        ResponseEntity<String> response = driverController.updateAssignedCab(driverIdNumber, cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Assigned cab updated successfully");
        verify(driverService).updateAssignedCab(driverIdNumber, cabRegistrationNumber);
    }

    @Test
    void updateAssignedCab_DriverOrCabNotFound() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        String cabRegistrationNumber = "ABC123";
        when(driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber)).thenReturn(null);

        ResponseEntity<String> response = driverController.updateAssignedCab(driverIdNumber, cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(driverService).updateAssignedCab(driverIdNumber, cabRegistrationNumber);
    }

    @Test
    void updateAssignedCab_ExceptionThrown() {
        // Arrange
        String driverIdNumber = testDriver.getDriverIdNumber();
        String cabRegistrationNumber = "ABC123";
        when(driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber))
                .thenThrow(new RuntimeException("Failed to update assigned cab"));

        ResponseEntity<String> response = driverController.updateAssignedCab(driverIdNumber, cabRegistrationNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo("Error updating assigned cab: Failed to update assigned cab");
        verify(driverService).updateAssignedCab(driverIdNumber, cabRegistrationNumber);
    }

    @Test
    void getAssignedCab_Success() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        Cab cab = new Cab("ABC123", "Sedan", "Black");
        when(driverService.getAssignedCab(driverIdNumber)).thenReturn(cab);

        ResponseEntity<Cab> response = driverController.getAssignedCab(driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(cab);
        verify(driverService).getAssignedCab(driverIdNumber);
    }

    @Test
    void getAssignedCab_DriverNotFound() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        when(driverService.getAssignedCab(driverIdNumber)).thenReturn(null);

        ResponseEntity<Cab> response = driverController.getAssignedCab(driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(driverService).getAssignedCab(driverIdNumber);
    }

    @Test
    void getAssignedCab_ExceptionThrown() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        when(driverService.getAssignedCab(driverIdNumber))
                .thenThrow(new RuntimeException("Failed to get assigned cab"));

        ResponseEntity<Cab> response = driverController.getAssignedCab(driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        verify(driverService).getAssignedCab(driverIdNumber);
    }

    @Test
    void removeAssignedCab_Success() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        when(driverService.removeAssignedCab(driverIdNumber)).thenReturn(true);

        ResponseEntity<String> response = driverController.removeAssignedCab(driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("Assigned cab removed successfully");
        verify(driverService).removeAssignedCab(driverIdNumber);
    }

    @Test
    void removeAssignedCab_DriverNotFound() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        when(driverService.removeAssignedCab(driverIdNumber)).thenReturn(false);

        ResponseEntity<String> response = driverController.removeAssignedCab(driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        verify(driverService).removeAssignedCab(driverIdNumber);
    }

    @Test
    void removeAssignedCab_ExceptionThrown() {

        String driverIdNumber = testDriver.getDriverIdNumber();
        when(driverService.removeAssignedCab(driverIdNumber))
                .thenThrow(new RuntimeException("Failed to remove assigned cab"));

        ResponseEntity<String> response = driverController.removeAssignedCab(driverIdNumber);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        assertThat(response.getBody()).isEqualTo("Error removing assigned cab: Failed to remove assigned cab");
        verify(driverService).removeAssignedCab(driverIdNumber);
    }
}
