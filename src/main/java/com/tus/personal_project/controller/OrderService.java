package com.tus.personal_project.controller;

import com.tus.personal_project.data.Order;
import com.tus.personal_project.doa.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public Order createOrder(String username, String case_name, String gpu_name, String cpu_name, String cooling_name){
        Order order = new Order(username, case_name, gpu_name, cpu_name, cooling_name);
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
