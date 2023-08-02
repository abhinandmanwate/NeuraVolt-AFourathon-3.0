package com.versavolt.cabmanagement.repository;
import com.versavolt.cabmanagement.model.Driver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
public class DriverRepositoryTest {

    @Autowired
    private DriverRepository driverRepository;
    Driver driver;

    @BeforeEach
    void setUp() {
        driver = new Driver("123456789","John Doe",
                "johndoe@example.com","1234567890");

        driverRepository.save(driver);

    }

    @AfterEach
    void tearDown() {
        driver=null;
        driverRepository.deleteAll();

    }

    // Test case - SUCCESS
    @Test
    void testFindByDriverIdNumber_Found() {
        Driver foundDriver = driverRepository.findByDriverIdNumber(driver.getDriverIdNumber());
        assertThat(foundDriver).isNotNull();
        assertThat(foundDriver.getDriverIdNumber()).isEqualTo(driver.getDriverIdNumber());
    }

    // Test case - NOT FOUND
    @Test
    void testFindByDriverIdNumber_NotFound() {
        Driver foundDriver = driverRepository.findByDriverIdNumber("987654");
        assertThat(foundDriver).isNull();
    }



}
