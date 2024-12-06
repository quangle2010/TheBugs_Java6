package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.ConfirmOrderBean;
import com.fpt.java.backend.mapper.OrderMapper;
import com.fpt.java.backend.resp.OrderResponse;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.OrderService;
import com.fpt.java.backend.service.OrderStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ManageOrderController {

  private final  OrderService orderService;

  private final OrderStatusService orderStatusService;

  public ManageOrderController(OrderService orderService, OrderStatusService orderStatusService) {
    this.orderService = orderService;
    this.orderStatusService = orderStatusService;
  }

  @GetMapping("/admin/api/ordered/list")
  public ResponseEntity<ResponseData> getAllOrdered() {
    try {
      OrderResponse orderResponse = new OrderResponse(orderService.getAllOrder(),
          orderStatusService.getAllOrderStatus());
      return ResponseEntity.ok(new ResponseData(true, "Load danh sách loại sản phẩm thành công", orderResponse));
    } catch (Exception e) {
      return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
    }
  }

  @PostMapping("/admin/api/ordered/save")
  public ResponseEntity<ResponseData> confirmOrderStatus(@RequestBody ConfirmOrderBean confirmOrderBean) {
    try {
      return ResponseEntity.ok(new ResponseData(true, "Cập nhật trạng thái thành công",
          OrderMapper.INSTANCE.toDTO(orderService.save(confirmOrderBean))));
    } catch (Exception e) {
      return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
    }
  }

}
