package com.tus.personal_project.controller;


import com.tus.personal_project.data.Product;
import com.tus.personal_project.doa.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> findAll(){
        return productRepository.findAll();
    }


    public Object findById(Long id) {
        return productRepository.findById(id);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void createProduct(Long id, String name, String description, Double price, String image) {
        Product product = new Product(id, name, description, price, image);
        productRepository.save(product);
    }
}
