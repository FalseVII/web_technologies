package com.tus.personal_project.controller;

import com.tus.personal_project.data.Product;
import com.tus.personal_project.doa.ProductRepository;
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
public class ProductServiceTest {

    @Autowired
    private ProductRepository productRepository;

    private ProductService productService;

    @BeforeEach
    public void setUp() {
        productService = new ProductService();
    }

    @Test
    public void testCreateProduct() {
        Product product = new Product(1L, "name", "description", 100.0, "image");
        productService.createProduct(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getImage());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Product product = new Product(id, "name", "description", 100.0, "image");
        when(productRepository.findById(id)).thenReturn(Optional.of(product));

        Product foundProduct = (Product) productService.findById(id);
        verify(productRepository, times(1)).findById(id);
    }
}