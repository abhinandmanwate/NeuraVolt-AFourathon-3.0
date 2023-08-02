package com.versavolt.cabmanagement.controller;
import com.versavolt.cabmanagement.model.Cab;
import com.versavolt.cabmanagement.model.Driver;
import com.versavolt.cabmanagement.service.CabService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cabapi")
public class CabController {
    CabService cabService;

    public CabController(CabService cabService) {
        this.cabService = cabService;
    }

    @PostMapping// create new cab in database
    public String createCabDetails(@RequestBody Cab cab) {
        try {
            cabService.createCab(cab);
            return "Cab added successfully!";
        } catch (Exception e) {
            return "Error adding cab: " + e.getMessage();
        }
    }

    @GetMapping //get all cabs list
    public List<Cab> getCabDetails() {
        try {
            return cabService.getAllCab();
        } catch (Exception e) {
            // Log the exception or handle it as needed
            throw new RuntimeException("Error retrieving cab details: " + e.getMessage());
        }
    }

    @PutMapping //Update existing cab details
    public String updateCabDetails(@RequestBody Cab cab) {
        try {
            cabService.updateCab(cab);
            return "Cab details updated successfully!";
        } catch (Exception e) {
            return "Error updating cab details: " + e.getMessage();
        }
    }

    @DeleteMapping("{cabRegistrationNumber}") //Delete cab with given ID
    public String deleteCabDetails(@PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            cabService.deleteCab(cabRegistrationNumber);
            return "Cab details deleted successfully!";
        } catch (Exception e) {
            return "Error deleting cab details: " + e.getMessage();
        }
    }

    // Statement 3 code

    //Assign Driver to cab
    @PostMapping("/{cabRegistrationNumber}/driver/{driverIdNumber}")
    public ResponseEntity<String> assignDriverToCab(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber,
            @PathVariable("driverIdNumber") String driverIdNumber) {
        try {//catching exception
            Cab cab = cabService.assignDriverToCab(cabRegistrationNumber, driverIdNumber);
            if (cab != null) {
                return ResponseEntity.ok("Driver assigned to cab successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            //Handling exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning driver to cab: " + e.getMessage());
        }
    }

    //Update Assigned Driver to cab
    @PutMapping("/{cabRegistrationNumber}/driver/{driverIdNumber}")
    public ResponseEntity<String> updateAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber,
            @PathVariable("driverIdNumber") String driverIdNumber) {
        try {
            Cab cab = cabService.updateAssignedDriver(cabRegistrationNumber, driverIdNumber);
            if (cab != null) {
                return ResponseEntity.ok("Assigned driver updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating assigned driver: " + e.getMessage());
        }
    }

    //Get Assigned Driver to cab
    @GetMapping("/{cabRegistrationNumber}/driver")
    public ResponseEntity<Driver> getAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            Driver driver = cabService.getAssignedDriver(cabRegistrationNumber);
            if (driver != null) {
                return ResponseEntity.ok(driver);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Delete given cab with requested cabregistrationnumber
    @DeleteMapping("/{cabRegistrationNumber}/driver")
    public ResponseEntity<String> removeAssignedDriver(
            @PathVariable("cabRegistrationNumber") String cabRegistrationNumber) {
        try {
            boolean removed = cabService.removeAssignedDriver(cabRegistrationNumber);
            if (removed) {
                return ResponseEntity.ok("Assigned driver removed successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing assigned driver: " + e.getMessage());
        }
    }
}