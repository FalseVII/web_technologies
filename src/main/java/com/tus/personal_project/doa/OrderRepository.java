package com.tus.personal_project.doa;

import com.tus.personal_project.data.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUsername(String username);

    @Query("SELECT o FROM Order o WHERE o.status = ?1")
    Iterable<Order> findAllByStatus(String status);

    @Query("SELECT o FROM Order o WHERE o.username = ?1")
    Iterable<Order> findAllByUsername(String username);




}
