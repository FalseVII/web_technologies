package com.tus.personal_project.controller;

import com.tus.personal_project.data.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;


@RestController
public class OrderController {

    private final OrderService orderService;


    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping("/api/v1/order/create/")
    public ResponseEntity<?> createNewOrder(@RequestBody Order order) {
        if (order.getUsername() == "" || order.getProductId() == null) {
            return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
        }
        orderService.createOrder(order.getUsername(), order.getProductId());
        return new ResponseEntity<>(order, HttpStatus.OK);
    }


    @GetMapping("/api/v1/order/find/{status}")
    public Iterable<Order> findByStatus(@PathVariable("status") String status) {
        return orderService.findByStatus(status);
    }

    @GetMapping("/api/v1/order/find/{username}")
    public Iterable<Order> findByUsername(@PathVariable("username") String status) {
        return orderService.findByUsername(status);
    }


}
