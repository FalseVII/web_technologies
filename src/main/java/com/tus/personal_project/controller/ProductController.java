package com.tus.personal_project.controller;

import com.tus.personal_project.data.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/api/v1/product/create/")
    public ResponseEntity<?> createNewProduct(@RequestBody Product product) {
        if (product.getName() == "" || product.getDescription() == "" || product.getPrice() == 0 || product.getImage() == "") {
            return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
        }
        productService.createProduct(product.getId(),product.getName(), product.getDescription(), product.getPrice(), product.getImage());
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/api/v1/product/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping("/api/v1/product/find/all")
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @DeleteMapping("/api/v1/product/delete/{id}")
    public void deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
    }
}
