package com.versavolt.cabmanagement.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="driverinfo")
public class Driver {

    //OneToOne mapping with cascade type all
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "cab_registration_number")//joining given column
    private Cab cab;

    @Id//setting column as primary key
    @Column(name = "driverIdNumber")//custom column name
    private String driverIdNumber;
    private String DriverName;
    private String DriverEmail;
    private String DriverPhoneNumber;

    //constructors
    public Driver() {
    }

    public Driver(String driverName, String driverIdNumber, String driverEmail, String driverPhoneNumber) {
        this.driverIdNumber = driverIdNumber;
        DriverName = driverName;
        DriverEmail = driverEmail;
        DriverPhoneNumber = driverPhoneNumber;
    }

    //All CRUD operation getter and setter for values
    public String getDriverIdNumber() {
        return driverIdNumber;
    }

    public void setDriverIdNumber(String driverIdNumber) {
        this.driverIdNumber = driverIdNumber;
    }

    public String getDriverName() {
        return DriverName;
    }

    public void setDriverName(String DriverName) {
        this.DriverName = DriverName;
    }
    public String getDriverEmail() {
        return DriverEmail;
    }

    public void setDriverEmail(String DriverEmail) {
        this.DriverEmail = DriverEmail;
    }

    public String getDriverPhoneNumber() {
        return DriverPhoneNumber;
    }

    public void setDriverPhoneNumber(String driverPhoneNumber) {
        DriverPhoneNumber = driverPhoneNumber;
    }

    //Statement 3
    public void setCab(Cab cab) {
        this.cab = cab;
    }

    public Cab getCab() {
        return cab;
    }

}
