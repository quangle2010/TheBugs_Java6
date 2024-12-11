package com.fpt.java.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.ConfirmOrderBean;
import com.fpt.java.backend.beans.OrderBean;
import com.fpt.java.backend.dto.OrderDTO;
import com.fpt.java.backend.entities.Order;
import com.fpt.java.backend.mapper.OrderMapper;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.OrderService;
import com.fpt.java.backend.utils.JwtUtil;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
public class OrderController {

    private final OrderService orderService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderService orderService, JwtUtil jwtUtil) {
        this.orderService = orderService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/ordered")
    public ResponseEntity<ResponseData> getOrderUser(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);

            return ResponseEntity
                    .ok(new ResponseData(true, "Load thành công hóa đơn", orderService.getOrderUser(username)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/ordered")
    public ResponseEntity<ResponseData> ordered(@RequestBody OrderBean orderBean,
            @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);
            Order order = new Order();
            order.setFullName(orderBean.getFullName());
            order.setPhone(orderBean.getPhone());
            order.setAddress(orderBean.getAddress());
            System.out.println(order.getAddress());
            System.out.println(order.getPhone());

            OrderDTO orderDTO = orderService.ordered(username, order);
            return ResponseEntity.ok(new ResponseData(true, "Đặt hàng thành công", orderDTO));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/ordered/cancel")
    public ResponseEntity<ResponseData> confirmOrderStatus(@RequestBody ConfirmOrderBean confirmOrderBean) {
        try {
            return ResponseEntity.ok(new ResponseData(true, "Hủy đơn thành công",
                    OrderMapper.INSTANCE.toDTO(orderService.save(confirmOrderBean))));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
