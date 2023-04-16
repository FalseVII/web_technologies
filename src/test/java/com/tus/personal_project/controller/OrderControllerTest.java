package com.tus.personal_project.controller;

import com.tus.personal_project.data.Order;
import com.tus.personal_project.doa.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class OrderControllerTest {

    @Autowired
    private OrderRepository orderRepository;

    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        orderService = new OrderService();
    }

    @Test
    public void testCreateOrder() {
        Order order = new Order("username", "case", "gpu", "cpu", "cooling");
        orderService.createOrder(order.getUsername(), order.getCase_name(), order.getGpu_name(), order.getCpu_name(), order.getCooling_name());
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Order order = new Order("username", "case", "gpu", "cpu", "cooling");
        order.setId(id);
        when(orderRepository.findById(id)).thenReturn(Optional.of(order));

        Order foundOrder = orderService.findById(id);
        verify(orderRepository, times(1)).findById(id);
    }

    @Test
    public void testFindByUsername(){
        Long id = 1L;
        Order order = new Order("username", "case", "gpu", "cpu", "cooling");
        order.setId(id);
        Order foundOrder = (Order) orderService.findByUsername("username");
        verify(orderRepository, times(1)).findByUsername("username");
    }


}