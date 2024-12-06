package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fpt.java.backend.dto.StatisticalDTO;
import com.fpt.java.backend.entities.Statistical;
import com.fpt.java.backend.mapper.StatisticalMapper;
import com.fpt.java.backend.repository.StatisticalJPA;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StatisticalService {
    
    private final StatisticalJPA g_StatisticalJPA; // Thay đổi thành final để đảm bảo tính bất biến

    public List<StatisticalDTO> getAllRevenue(String startDate, String endDate) {
        try {
            List<Statistical> allRevenue = g_StatisticalJPA.getDailyRevenueByDateRange(startDate, endDate);
            return allRevenue.stream()
                    .map(StatisticalMapper::toDTO)
                    .sorted(Comparator.comparing(StatisticalDTO::getId))
                    .collect(Collectors.toCollection(ArrayList::new)); // Tập hợp vào ArrayList
        } catch (Exception e) {
            List<StatisticalDTO> statisticalDTOs = new ArrayList<>();
            return statisticalDTOs;
        }

    }

    public List<StatisticalDTO> getSoldProducts(String startDate, String endDate) {
        try {
            List<Statistical> soldProducts = g_StatisticalJPA.getTotalProductsSoldByDateRange(startDate, endDate);
            return soldProducts.stream()
                    .map(StatisticalMapper::toDTO)
                    .sorted(Comparator.comparing(StatisticalDTO::getId))
                    .collect(Collectors.toCollection(ArrayList::new)); // Tập hợp vào ArrayList
        } catch (Exception e) {
            List<StatisticalDTO> statisticalDTOs = new ArrayList<>();
            return statisticalDTOs;
        }
    }

    public List<StatisticalDTO> getOrders(String startDate, String endDate, boolean successOrFailure) {
        try {
            List<Statistical> Orders = g_StatisticalJPA.getTotalOrdersByDateRangeAndStatus(startDate, endDate, successOrFailure);
            return Orders.stream()
                    .map(StatisticalMapper::toDTO)
                    .sorted(Comparator.comparing(StatisticalDTO::getId))
                    .collect(Collectors.toCollection(ArrayList::new)); // Tập hợp vào ArrayList
        } catch (Exception e) {
            List<StatisticalDTO> statisticalDTOs = new ArrayList<>();
            return statisticalDTOs;
        }
    }
}