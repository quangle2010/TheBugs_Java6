package com.fpt.java.backend.resp;
import java.util.List;

import com.fpt.java.backend.dto.StatisticalDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticalResponse {
  private List<StatisticalDTO> statistical;
}
