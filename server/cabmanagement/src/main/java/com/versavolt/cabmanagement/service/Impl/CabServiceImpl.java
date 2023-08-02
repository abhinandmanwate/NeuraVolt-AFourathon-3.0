package com.versavolt.cabmanagement.service.Impl;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.repository.CabRepository;
import com.versavolt.cabmanagement.repository.DriverRepository;
import com.versavolt.cabmanagement.service.CabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class CabServiceImpl implements CabService {

    private CabRepository cabRepository;
    private DriverRepository driverRepository;

    @Autowired
    public CabServiceImpl(CabRepository cabRepository, DriverRepository driverRepository) {
        this.cabRepository = cabRepository;
        this.driverRepository = driverRepository;
    }
    public CabServiceImpl(CabRepository cabRepository){
        this.cabRepository = cabRepository;

    }



    //Create a new cab
    @Override
    public String createCab(Cab cab) {
        try {
            // Check if cabRegistrationNumber already exists
            if (cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())) {
                return "Cab already Added";
            }

            cabRepository.save(cab);
            return "Cab successfully added";
        } catch (Exception e) {
            throw new RuntimeException("Failed to add cab: " + e.getMessage());
        }
    }

    //Update existing cab
    @Override
    public String updateCab(Cab cab) {
        try {
            // Check if cabRegistrationNumber exists
            if (!cabRepository.existsByCabRegistrationNumber(cab.getCabRegistrationNumber())) {
                return "Cab does not exist";
            }
            cabRepository.save(cab);
            return "Cab successfully updated";
        } catch (Exception e) {
            throw new RuntimeException("Failed to update cab: " + e.getMessage());
        }
    }


    //Get All cabs
    @Override
    public List<Cab> getAllCab() {
        try {
            return cabRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve cab details: " + e.getMessage());
        }
    }

    //Delete existing cab
    @Override
    public String deleteCab(String cabRegistrationNumber) {
        try {
            // Check if cab with given registration number exists
            if (!cabRepository.existsByCabRegistrationNumber(cabRegistrationNumber)) {
                return "Cab does not exist";
            }
            cabRepository.deleteById(cabRegistrationNumber);
            return "Cab successfully deleted";
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete cab: " + e.getMessage());
        }
    }

    // Statement 3

    //Assign cabs driver
    public Cab assignDriverToCab(String cabRegistrationNumber, String driverIdNumber) {
        try {
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (cab != null && driver != null) {
                cab.setDriver(driver);
                driver.setCab(cab);
                cabRepository.save(cab);
                driverRepository.save(driver);
                return cab;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to assign driver to cab: " + e.getMessage());
        }
    }

    //Update cabs driver
    public Cab updateAssignedDriver(String cabRegistrationNumber, String driverIdNumber) {
        try {
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            Driver driver = driverRepository.findByDriverIdNumber(driverIdNumber);
            if (cab != null && driver != null) {
                cab.getDriver().setCab(null); // Unassign the current driver from the cab
                cab.setDriver(driver);
                driver.setCab(cab);
                cabRepository.save(cab);
                driverRepository.save(driver);
                return cab;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update assigned driver: " + e.getMessage());
        }
    }

    //Get cabs driver
    public Driver getAssignedDriver(String cabRegistrationNumber) {
        try {
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (cab != null) {
                Driver driver = cab.getDriver();
                System.out.println("Cab: " + cabRegistrationNumber + ", Driver: " + driver);
                return driver;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to get assigned driver: " + e.getMessage());
        }
    }

    //Remove cabs driver
    public boolean removeAssignedDriver(String cabRegistrationNumber) {
        try {
            Cab cab = cabRepository.findByCabRegistrationNumber(cabRegistrationNumber);
            if (cab != null) {
                Driver driver = cab.getDriver();
                if (driver != null) {
                    driver.setCab(null);
                    driverRepository.delete(driver);
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Failed to remove assigned driver: " + e.getMessage());
        }
    }
}
