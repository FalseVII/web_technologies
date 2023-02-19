package com.tus.personal_project.doa;

import com.tus.personal_project.data.Order;
import com.tus.personal_project.dto.OrderDto;
import org.springframework.data.repository.CrudRepository;

interface OrderDao extends CrudRepository<OrderDto, Integer> {
    Order findByUsername(String username);
    Order findByProductId(Long productId);


}
