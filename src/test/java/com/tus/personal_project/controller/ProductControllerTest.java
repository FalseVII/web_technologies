package com.tus.personal_project.controller;

import com.tus.personal_project.controller.ProductController;
import com.tus.personal_project.controller.ProductService;
import com.tus.personal_project.data.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product product;
    private List<Product> productList;

    @BeforeEach
    public void setUp() {
        product = new Product(1L, "Product1", "Description1", 100.0, "image1.jpg");
        productList = Arrays.asList(product);
    }

    @Test
    public void testFindById() throws Exception {
        when(productService.findById(1L)).thenReturn(product);

        mockMvc.perform(get("/api/v1/product/find/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("name").value("Product1"))
                .andExpect(jsonPath("description").value("Description1"))
                .andExpect(jsonPath("price").value(100.0))
                .andExpect(jsonPath("image").value("image1.jpg"));
    }

    @Test
    public void testFindAll() throws Exception {
        when(productService.findAll()).thenReturn(productList);

        mockMvc.perform(get("/api/v1/product/find/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Product1"))
                .andExpect(jsonPath("$[0].description").value("Description1"))
                .andExpect(jsonPath("$[0].price").value(100.0))
                .andExpect(jsonPath("$[0].image").value("image1.jpg"));
    }

    // You may also add tests for createNewProduct and deleteProduct methods.

    @Test
    public void testCreateNewProduct() throws Exception {
        mockMvc.perform(post("/api/v1/product/create/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"name\": \"Product1\", \"description\": \"Description1\", \"price\": 100.0, \"image\": \"image1.jpg\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("name").value("Product1"))
                .andExpect(jsonPath("description").value("Description1"))
                .andExpect(jsonPath("price").value(100.0))
                .andExpect(jsonPath("image").value("image1.jpg"));
    }
}