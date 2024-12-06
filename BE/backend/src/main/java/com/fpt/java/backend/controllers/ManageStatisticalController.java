package com.fpt.java.backend.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.dto.StatisticalDTO;
import com.fpt.java.backend.repository.ProductJPA;
import com.fpt.java.backend.repository.StatisticalJPA;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.resp.StatisticalResponse;
import com.fpt.java.backend.service.StatisticalService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class ManageStatisticalController {
  @Autowired
  ProductJPA g_productJPA;

  @Autowired
  StatisticalJPA g_statisticalJPA;

  @Autowired
  StatisticalService g_StatisticalService;

  @GetMapping({ "/admin/api/statistical-revenue", "/admin/api/statistical-sold-product",
      "/admin/api/statistical-failure-orders", "/admin/api/statistical-success-orders" })
  @Transactional(readOnly = true)
  public ResponseEntity<ResponseData> getStatisticalProductData(@RequestParam(required = false) String startDate,
      @RequestParam(required = false) String endDate, HttpServletRequest req) {
    System.out.println("____________________________________________________________________");
    System.out.println("Call API Statistical");
    String startDateString = "";
    String endDateString = "";

    String year = String.valueOf(LocalDate.now().getYear());

    startDateString = year + "-1 " + "-1";
    endDateString = year + "-12" + "-28";

    if (startDate != null && endDate != null) {
      startDateString = startDate;
      endDateString = endDate;
      System.out.println(startDateString);
      System.out.println(endDateString);

    } else if (startDate != null) {
      startDateString = startDate;
    } else if (endDate != null) {
      endDateString = endDate;
    }
    // "/admin/api/statistical-sold-product",
    // "/admin/api/statistical-failure-orders",
    // "/admin/api/statistical-success-orders"

    String URI = req.getRequestURI();
    String message = "";
    StatisticalResponse response;
    switch (URI) {
      case "/admin/api/statistical-revenue":
        List<StatisticalDTO> revenueList = g_StatisticalService.getAllRevenue(startDateString, endDateString);
        if (revenueList.isEmpty()) {
          message = "No revenue found";
        }
        response = new StatisticalResponse(revenueList);
        break;

      case "/admin/api/statistical-sold-product":
        List<StatisticalDTO> soldProductsList = g_StatisticalService.getSoldProducts(startDateString, endDateString);
        if (soldProductsList.isEmpty()) {
          message = "No sold products found";
        }
        response = new StatisticalResponse(soldProductsList);
        break;

      case "/admin/api/statistical-failure-orders":
        List<StatisticalDTO> failureOrdersList = g_StatisticalService.getOrders(startDateString, endDateString, false);
        if (failureOrdersList.isEmpty()) {
          message = "No failure orders found";
        }
        response = new StatisticalResponse(failureOrdersList);
        break;

      case "/admin/api/statistical-success-orders":
        List<StatisticalDTO> successOrdersList = g_StatisticalService.getOrders(startDateString, endDateString, true);
        if (successOrdersList.isEmpty()) {
          message = "No success orders found";
        }
        response = new StatisticalResponse(successOrdersList);
        break;

      default:
        List<StatisticalDTO> error = new ArrayList<>();
        response = new StatisticalResponse(error);
        message = "No data found";
        break;
    }

    return ResponseEntity.ok(new ResponseData(true, message, response));
  }

}
