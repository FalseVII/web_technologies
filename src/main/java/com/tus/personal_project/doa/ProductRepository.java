package com.tus.personal_project.doa;

import com.tus.personal_project.data.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {


}
