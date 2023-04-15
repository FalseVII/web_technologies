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

    public void updateStatus(Long id, String status){
        Order order = orderRepository.findById(id).get();
        order.setStatus(status);
        orderRepository.save(order);
    }

    public void updateOrder(Long id, Order order){
        Order order1 = orderRepository.findById(id).get();
        order1.setCase_name(order.getCase_name());
        order1.setCpu_name(order.getCpu_name());
        order1.setGpu_name(order.getGpu_name());
        order1.setCooling_name(order.getCooling_name());
        orderRepository.save(order1);
    }

    public Order findById(Long id){
        return orderRepository.findById(id).get();
    }

    public void deleteOrder(Long id){
        orderRepository.deleteById(id);
    }




}
