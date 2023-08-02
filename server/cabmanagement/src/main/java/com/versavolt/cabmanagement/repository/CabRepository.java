package com.versavolt.cabmanagement.repository;
import com.versavolt.cabmanagement.model.Cab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabRepository extends JpaRepository<Cab,String> {

    //Extra essential custom methods.
    Cab findByCabRegistrationNumber(String cabRegistrationNumber);
    boolean existsByCabRegistrationNumber(String cabRegistrationNumber);


}
