package com.versavolt.cabmanagement.repository;
import com.versavolt.cabmanagement.model.Cab;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Collections;
import java.util.List;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@DataJpaTest
public class CabRepositoryTest {

    @Autowired
    private CabRepository cabRepository;
    Cab cab;

    //Add data for testing
    @BeforeEach
    void setUp() {
        cab = new Cab("ABC123","Sedan","Black");
        cabRepository.save(cab);
    }

    //Delete data after test
    @AfterEach
    void tearDown() {
        cabRepository.deleteAll();
        cab = null;
    }

    //Test case  SUCCESS
    @Test
    void testfindByCabRegistrationNumber_FOUND(){
        List<Cab> cabList = Collections.singletonList(cabRepository.findByCabRegistrationNumber("ABC123"));
        assertThat(cabList.get(0).getCabRegistrationNumber()).isEqualTo(cab.getCabRegistrationNumber());
        assertThat(cabList.get(0).getCabModel()).isEqualTo(cab.getCabModel());
    }

    //Test case  FAILURE
    @Test
    void testfindByCabRegistrationNumber_NotFOUND() {
        List<Cab> cabList = Collections.singletonList(cabRepository.findByCabRegistrationNumber("XY123r"));
        assertThat(cabList.contains("XY123r")).isFalse();
    }

}
