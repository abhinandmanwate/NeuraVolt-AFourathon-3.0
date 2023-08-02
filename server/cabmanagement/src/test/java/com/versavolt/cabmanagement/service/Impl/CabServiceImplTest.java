package com.versavolt.cabmanagement.service.Impl;

import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.repository.CabRepository;
import com.versavolt.cabmanagement.repository.DriverRepository;
import com.versavolt.cabmanagement.service.CabService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CabServiceImplTest {

    @Mock
    private CabRepository cabRepository;
    @Mock
    private DriverRepository driverRepository;

    private CabService cabService;
    private Cab cab;
    private Driver driver;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cabService = new CabServiceImpl(cabRepository, driverRepository);
        cab = new Cab("ABC123", "Sedan", "Black");
        driver = new Driver("123456789", "John Doe", "johndoe@example.com", "1234567890");
    }

    @AfterEach
    void tearDown() {
        cab = null;
        driver = null;
    }

    @Test
    void testCreateCab_Success() {
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(false);
        String result = cabService.createCab(cab);
        assertThat(result).isEqualTo("Cab successfully added");
        verify(cabRepository).save(cab);
    }

    @Test
    void testCreateCab_CabAlreadyExists() {
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(true);
        String result = cabService.createCab(cab);
        assertThat(result).isEqualTo("Cab already Added");
        verify(cabRepository, never()).save(any(Cab.class));
    }

    @Test
    void testUpdateCab_Success() {
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(true);
        String result = cabService.updateCab(cab);
        assertThat(result).isEqualTo("Cab successfully updated");
        verify(cabRepository).save(cab);
    }

    @Test
    void testUpdateCab_CabDoesNotExist() {
        when(cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(false);
        String result = cabService.updateCab(cab);
        assertThat(result).isEqualTo("Cab does not exist");
        verify(cabRepository, never()).save(any(Cab.class));
    }

    @Test
    void testGetAllCab_Success() {
        List<Cab> cabs = new ArrayList<>();
        cabs.add(new Cab("ABC123", "Sedan", "Black"));
        cabs.add(new Cab("DEF456", "SUV", "White"));
        when(cabRepository.findAll()).thenReturn(cabs);
        List<Cab> result = cabService.getAllCab();
        assertThat(result).hasSize(2);
        assertThat(result).containsExactlyElementsOf(cabs);
    }

    @Test
    void testGetAllCab_ExceptionThrown() {
        when(cabRepository.findAll()).thenThrow(new RuntimeException("Failed to retrieve cab details"));
        assertThatThrownBy(() -> cabService.getAllCab())
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Failed to retrieve cab details");
    }

    @Test
    void testDeleteCab_Success() {
        String cabRegistrationNumber = "ABC123";
        when(cabRepository.existsByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(true);
        String result = cabService.deleteCab(cabRegistrationNumber);
        assertThat(result).isEqualTo("Cab successfully deleted");
        verify(cabRepository).deleteById(cabRegistrationNumber);
    }

    @Test
    void testDeleteCab_CabDoesNotExist() {
        String cabRegistrationNumber = "ABC123";
        when(cabRepository.existsByCabRegistrationNumber(cabRegistrationNumber)).thenReturn(false);
        String result = cabService.deleteCab(cabRegistrationNumber);
        assertThat(result).isEqualTo("Cab does not exist");
        verify(cabRepository, never()).deleteById(anyString());
    }

    @Test
    void testAssignDriverToCab_Success() {
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(cab);
        when(driverRepository.findByDriverIdNumber(driver.getDriverIdNumber())).thenReturn(driver);
        Cab result = cabService.assignDriverToCab(cab.getCabRegistrationNumber(), driver.getDriverIdNumber());
        assertThat(result).isEqualTo(cab);
        assertThat(cab.getDriver()).isEqualTo(driver);
        assertThat(driver.getCab()).isEqualTo(cab);
        verify(cabRepository).save(cab);
        verify(driverRepository).save(driver);
    }

    @Test
    void testAssignDriverToCab_CabOrDriverNotFound() {
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(null);
        when(driverRepository.findByDriverIdNumber(driver.getDriverIdNumber())).thenReturn(null);
        Cab result = cabService.assignDriverToCab(cab.getCabRegistrationNumber(), driver.getDriverIdNumber());
        assertThat(result).isNull();
        verify(cabRepository, never()).save(any(Cab.class));
        verify(driverRepository, never()).save(any(Driver.class));
    }

    @Test
    void testUpdateAssignedDriver_Success() {
        cab.setDriver(new Driver());
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(cab);
        when(driverRepository.findByDriverIdNumber(driver.getDriverIdNumber())).thenReturn(driver);
        Cab result = cabService.updateAssignedDriver(cab.getCabRegistrationNumber(), driver.getDriverIdNumber());
        assertThat(result).isEqualTo(cab);
        assertThat(cab.getDriver()).isEqualTo(driver);
        assertThat(driver.getCab()).isEqualTo(cab);
        verify(cabRepository).save(cab);
        verify(driverRepository).save(driver);
    }

    @Test
    void testUpdateAssignedDriver_CabOrDriverNotFound() {
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(null);
        when(driverRepository.findByDriverIdNumber(driver.getDriverIdNumber())).thenReturn(null);
        Cab result = cabService.updateAssignedDriver(cab.getCabRegistrationNumber(), driver.getDriverIdNumber());
        assertThat(result).isNull();
        verify(cabRepository, never()).save(any(Cab.class));
        verify(driverRepository, never()).save(any(Driver.class));
    }

    @Test
    void testGetAssignedDriver_Success() {
        cab.setDriver(driver);
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(cab);
        Driver result = cabService.getAssignedDriver(cab.getCabRegistrationNumber());
        assertThat(result).isEqualTo(driver);
    }

    @Test
    void testGetAssignedDriver_CabNotFound() {
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(null);
        Driver result = cabService.getAssignedDriver(cab.getCabRegistrationNumber());
        assertThat(result).isNull();
    }

    @Test
    void testRemoveAssignedDriver_CabOrDriverNotFound() {
        when(cabRepository.findByCabRegistrationNumber(cab.getCabRegistrationNumber())).thenReturn(null);
        boolean result = cabService.removeAssignedDriver(cab.getCabRegistrationNumber());
        assertThat(result).isFalse();
        verify(driverRepository, never()).delete(any(Driver.class));
    }
}
