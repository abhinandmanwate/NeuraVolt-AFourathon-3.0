package com.versavolt.cabmanagement.service;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import java.util.List;

public interface DriverService {

    //API CRUD
    public String createDriver(Driver driver);
    public String updateDriver(Driver driver);
    public String deleteDriver(String driverIdNumber);
    public List<Driver> getAllDriver();

    //Statement 3
    Driver assignCabToDriver(String driverIdNumber, String cabRegistrationNumber);
    Driver updateAssignedCab(String driverIdNumber, String cabRegistrationNumber);
    Cab getAssignedCab(String driverIdNumber);
    boolean removeAssignedCab(String driverIdNumber);

}


