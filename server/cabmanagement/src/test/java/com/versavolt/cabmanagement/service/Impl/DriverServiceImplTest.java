package com.versavolt.cabmanagement.service.Impl;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.repository.CabRepository;
import com.versavolt.cabmanagement.repository.DriverRepository;
import com.versavolt.cabmanagement.service.DriverService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Answers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

class DriverServiceImplTest {

    @Mock
    private DriverRepository driverRepository;
    @Mock
    private CabRepository cabRepository;
    private DriverService driverService;
    private AutoCloseable autoCloseable;
    private Driver driver;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        driverService = new DriverServiceImpl(cabRepository, driverRepository);
        driver = new Driver("123456789", "John Doe", "johndoe@example.com", "1234567890");
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void testCreateDriver_Success() {
        when(driverRepository.existsById(driver.getDriverIdNumber())).thenReturn(false);
        when(driverRepository.save(driver)).thenReturn(driver);
        String result = driverService.createDriver(driver);

        assertThat(result).isEqualTo("Driver successfully added");
    }

    @Test
    void testCreateDriver_DuplicateDriver() {
        when(driverRepository.existsById(driver.getDriverIdNumber())).thenReturn(true);
        String result = driverService.createDriver(driver);

        assertThat(result).isEqualTo("Driver Already Added");
    }

    @Test
    void testUpdateDriver_Success() {
        when(driverRepository.existsById(driver.getDriverIdNumber())).thenReturn(true);
        when(driverRepository.save(driver)).thenReturn(driver);
        String result = driverService.updateDriver(driver);

        assertThat(result).isEqualTo("Driver successfully updated");
    }

    @Test
    void testUpdateDriver_DriverNotFound() {
        when(driverRepository.existsById(driver.getDriverIdNumber())).thenReturn(false);
        String result = driverService.updateDriver(driver);

        assertThat(result).isEqualTo("Driver does not exist");
    }

    @Test
    void testGetAllDriver() {
        List<Driver> expectedDrivers = Collections.singletonList(driver);
        when(driverRepository.findAll()).thenReturn(expectedDrivers);
        List<Driver> actualDrivers = driverService.getAllDriver();

        assertThat(actualDrivers).isEqualTo(expectedDrivers);
    }

    @Test
    void testDeleteDriver_Success() {
        when(driverRepository.existsById(driver.getDriverIdNumber())).thenReturn(true);
        doAnswer(Answers.CALLS_REAL_METHODS).when(driverRepository).deleteById(any());
        String result = driverService.deleteDriver(driver.getDriverIdNumber());

        assertThat(result).isEqualTo("Driver Successfully Deleted");
    }

    @Test
    void testDeleteDriver_DriverNotFound() {
        when(driverRepository.existsById(driver.getDriverIdNumber())).thenReturn(false);
        String result = driverService.deleteDriver(driver.getDriverIdNumber());

        assertThat(result).isEqualTo("Driver does not exist");
    }

    @Test
    void testAssignCabToDriver_DriverNotFound() {
        String driverIdNumber = "123456789";
        String cabRegistrationNumber = "ABC123";
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(null);

        Driver assignedDriver = driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber);

        assertThat(assignedDriver).isNull();
    }

    @Test
    void testAssignCabToDriver_CabNotFound() {
        String driverIdNumber = "123456789";
        String cabRegistrationNumber = "ABC123";
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);
        when(driverRepository.save(driver)).thenReturn(driver);
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(null);

        Driver assignedDriver = driverService.assignCabToDriver(driverIdNumber, cabRegistrationNumber);

        assertThat(assignedDriver).isNull();
    }

    @Test
    void testUpdateAssignedCab_Success() {
        String driverIdNumber = "123456789";
        String cabRegistrationNumber = "ABC123";
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        Cab cab = new Cab(cabRegistrationNumber, "Sedan", "Black");
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);
        when(driverRepository.save(any(Driver.class))).thenAnswer(invocation -> invocation.getArgument(0)); // Save and return the driver argument
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(cab);

        Driver updatedDriver = driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber);

        assertThat(updatedDriver).isEqualTo(driver);
        assertThat(updatedDriver.getCab()).isEqualTo(cab);
    }

    @Test
    void testUpdateAssignedCab_DriverNotFound() {
        String driverIdNumber = "123456789";
        String cabRegistrationNumber = "ABC123";
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(null);

        Driver updatedDriver = driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber);

        assertThat(updatedDriver).isNull();
    }

    @Test
    void testUpdateAssignedCab_CabNotFound() {
        String driverIdNumber = "123456789";
        String cabRegistrationNumber = "ABC123";
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);
        when(driverRepository.save(driver)).thenReturn(driver);
        when(cabRepository.findByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(null);

        Driver updatedDriver = driverService.updateAssignedCab(driverIdNumber, cabRegistrationNumber);

        assertThat(updatedDriver).isNull();
    }

    @Test
    void testGetAssignedCab_Success() {
        String driverIdNumber = "123456789";
        String cabRegistrationNumber = "ABC123";
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        Cab cab = new Cab(cabRegistrationNumber, "Sedan", "Black");
        driver.setCab(cab);
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);

        Cab assignedCab = driverService.getAssignedCab(driverIdNumber);

        assertThat(assignedCab).isEqualTo(cab);
    }

    @Test
    void testGetAssignedCab_DriverNotFound() {
        String driverIdNumber = "123456789";
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(null);

        Cab assignedCab = driverService.getAssignedCab(driverIdNumber);

        assertThat(assignedCab).isNull();
    }

    @Test
    void testRemoveAssignedCab_Success() {
        String driverIdNumber = "123456789";
        Driver driver = new Driver(driverIdNumber, "John Doe", "johndoe@example.com", "1234567890");
        driver.setCab(new Cab("ABC123", "Sedan", "Black"));

        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(driver);
        when(driverRepository.save(driver)).thenReturn(driver);

        boolean removed = driverService.removeAssignedCab(driverIdNumber);

        assertThat(removed).isTrue();
        assertThat(driver.getCab()).isNull();
    }

    @Test
    void testRemoveAssignedCab_DriverNotFound() {
        String driverIdNumber = "123456789";
        when(driverRepository.findByDriverIdNumber(driverIdNumber)).thenReturn(null);

        boolean removed = driverService.removeAssignedCab(driverIdNumber);

        assertThat(removed).isFalse();
    }
}
