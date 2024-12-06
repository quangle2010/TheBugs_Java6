package com.fpt.java.backend.mapper;

import com.fpt.java.backend.dto.StatisticalDTO;
import com.fpt.java.backend.entities.Statistical;

public class StatisticalMapper {

    public static StatisticalDTO toDTO(Statistical statistical) {
        return new StatisticalDTO(
            statistical.getId(),
            statistical.getCreate_at(),
            statistical.getTotal(),
            statistical.getDetails()
        );
        
    }

}
