package com.versavolt.cabmanagement.service.Impl;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.repository.CabRepository;
import com.versavolt.cabmanagement.repository.DriverRepository;
import com.versavolt.cabmanagement.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class DriverServiceImpl implements DriverService {

    private CabRepository cabRepository;
    private DriverRepository driverRepository;

    @Autowired
    public DriverServiceImpl(CabRepository cabRepository, DriverRepository driverRepository) {
        this.cabRepository = cabRepository;
        this.driverRepository = driverRepository;
    }
    public DriverServiceImpl(DriverRepository driverRepository){
        this.driverRepository = driverRepository;
    }

    //Create a new driver
    @Override
    public String createDriver(Driver driver) {
        try {

            // Check if driver with given driverIdNumber already exists
            if (driverRepository.existsById(driver.getDriverIdNumber())) {
                return "Driver Already Added";
            }
            driverRepository.save(driver);
            return "Driver successfully added";
        } catch (Exception e) {
            return "Error adding driver: " + e.getMessage();
        }
    }

    //Update existing driver
    @Override
    public String updateDriver(Driver driver) {
        try {
            // Check if driver with given driverIdNumber exists
            if (!driverRepository.existsById(driver.getDriverIdNumber())) {
                return "Driver does not exist";
            }
            driverRepository.save(driver);
            return "Driver successfully updated";
        } catch (Exception e) {
            return "Error updating driver: " + e.getMessage();
        }
    }

    //Delete existing cab
    @Override
    public String deleteDriver(String driverIdNumber) {
        try {
            // Check if driver with given driverIdNumber exists
            if (!driverRepository.existsById(driverIdNumber)) {
                return "Driver does not exist";
            }
            driverRepository.deleteById(driverIdNumber);
            return "Driver Successfully Deleted";
        } catch (Exception e) {
            return "Error deleting driver: " + e.getMessage();
        }
    }

    //Get all cabs
    @Override
    public List<Driver> getAllDriver() {
        try {
            return driverRepository.findAll();
        } catch (Exception e) {

            throw new RuntimeException("Error retrieving driver details: " + e.getMessage());
        }
    }

    // Statement 3

    //Assign drivers cab
    public Driver assignCabToDriver(String driverIdNumber, String cabRegistrationNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (driver != null && cab != null) {
                driver.setCab(cab);
                return driverRepository.save(driver);
            }
            return null;
        } catch (Exception e) {

            throw new RuntimeException("Error assigning cab to driver: " + e.getMessage());
        }
    }

    //Update drivers cab
    public Driver updateAssignedCab(String driverIdNumber, String cabRegistrationNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (driver != null && cab != null) {
                driver.setCab(cab);
                return driverRepository.save(driver);
            }
            return null;
        } catch (Exception e) {

            throw new RuntimeException("Error updating assigned cab: " + e.getMessage());
        }
    }

    //Get drivers cab
    public Cab getAssignedCab(String driverIdNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (driver != null) {
                Cab cab = driver.getCab();
                System.out.println("Driver: " + driverIdNumber + ", Cab: " + cab); // Add this line for debugging
                return cab;
            }
            return null;
        } catch (Exception e) {

            throw new RuntimeException("Error retrieving assigned cab: " + e.getMessage());
        }
    }

    //Remove drivers cab
    public boolean removeAssignedCab(String driverIdNumber) {
        try {
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (driver != null) {
                driver.setCab(null);
                driverRepository.save(driver);
                return true;
            }
            return false;
        } catch (Exception e) {

            throw new RuntimeException("Error removing assigned cab: " + e.getMessage());
        }
    }

}
