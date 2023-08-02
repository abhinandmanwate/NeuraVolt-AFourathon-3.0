package com.versavolt.cabmanagement.service;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import java.util.List;

public interface CabService {

    //API CRUD
    public String createCab(Cab cab);
    public String updateCab(Cab cab);
    public String deleteCab(String cabRegistrationNumber);
    public List<Cab> getAllCab();

    //Statement 3
    Cab assignDriverToCab(String cabRegistrationNumber, String driverIdNumber);
    Cab updateAssignedDriver(String cabRegistrationNumber, String driverIdNumber);
    Driver getAssignedDriver(String cabRegistrationNumber);
    boolean removeAssignedDriver(String cabRegistrationNumber);


}
