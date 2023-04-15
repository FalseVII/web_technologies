package com.tus.personal_project.controller;

import com.tus.personal_project.data.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;


@RestController
public class OrderController {

    @Autowired
    private final OrderService orderService;



    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping("/api/v1/order/create/")
    public ResponseEntity<?> createNewOrder(@RequestBody Order order) {
        if (order.getUsername() == "" || order.getCooling_name()== "" || order.getCpu_name()== "" || order.getCase_name()== "" || order.getGpu_name()== "") {
            return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
        }
        orderService.createOrder(order.getUsername(), order.getCase_name(), order.getGpu_name(), order.getCpu_name(), order.getCooling_name());
        return new ResponseEntity<>(order, HttpStatus.OK);
    }


    @GetMapping("/api/v1/order/find/status/{status}")
    public Iterable<Order> findByStatus(@PathVariable("status") String status) {
        return orderService.findByStatus(status);
    }

    @GetMapping("/api/v1/order/find/username/{username}")
    public Iterable<Order> findByUsername(@PathVariable("username") String username) {
        return orderService.findByUsername(username);
    }

    @PutMapping("/api/v1/order/update/status/{id}/{status}")
    public void updateStatus(@PathVariable("id") Long id, @PathVariable("status") String status) {
        orderService.updateStatus(id, status);
    }

    @PutMapping("/api/v1/order/update/{id}")
    public void updateOrder(@PathVariable("id") Long id, @RequestBody Order order) {
        orderService.updateOrder(id, order);
    }

    @GetMapping("/api/v1/order/find/{id}")
    public Order findById(@PathVariable("id") Long id) {
        return orderService.findById(id);
    }

    @DeleteMapping("/api/v1/order/delete/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        orderService.deleteOrder(id);
    }


}
