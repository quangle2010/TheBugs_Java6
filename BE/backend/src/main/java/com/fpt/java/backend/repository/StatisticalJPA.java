package com.fpt.java.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fpt.java.backend.entities.Statistical;

@Repository
public interface StatisticalJPA extends JpaRepository<Statistical, Long> {

    @Transactional(readOnly = true)
    @Procedure(name = "GetTotalOrdersByDateRangeAndStatus")
    List<Statistical> getTotalOrdersByDateRangeAndStatus(String startDate, String endDate, boolean isSuccess);

    @Transactional(readOnly = true)
    @Procedure(name = "GetDailyRevenueByDateRange")
    List<Statistical> getDailyRevenueByDateRange(String startDate, String endDate);

    @Transactional(readOnly = true)
    @Procedure(name = "GetTotalProductsSoldByDateRange")
    List<Statistical> getTotalProductsSoldByDateRange(String startDate, String endDate);
}
