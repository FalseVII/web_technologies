package com.tus.personal_project.controller;

import com.tus.personal_project.data.Order;
import com.tus.personal_project.doa.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.Optional;

@Component
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public Order createOrder(String username, Long productId){
        Order order = new Order(username, productId, "pending");
        orderRepository.save(order);
        return order;
    }

    public Iterable<Order> findByStatus(String status){
        return orderRepository.findAllByStatus(status);
    }

    public Iterable<Order> findByUsername(String username){
        return orderRepository.findAllByUsername(username);
    }


}
