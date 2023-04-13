package com.tus.personal_project.data;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GenerationType;


@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;


    @Column(name = "case_name", nullable = false)
    private String case_name;

    @Column(name = "gpu", nullable = false)
    private String gpu_name;

    @Column(name = "cpu", nullable = false)
    private String cpu_name;

    @Column(name = "cooling", nullable = false)
    private String cooling_name;

    @Column(name = "status", nullable = false)
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCase_name() {
        return case_name;
    }

    public void setCase_name(String case_name) {
        this.case_name = case_name;
    }

    public String getGpu_name() {
        return gpu_name;
    }

    public void setGpu_name(String gpu_name) {
        this.gpu_name = gpu_name;
    }

    public String getCpu_name() {
        return cpu_name;
    }

    public void setCpu_name(String cpu_name) {
        this.cpu_name = cpu_name;
    }

    public String getCooling_name() {
        return cooling_name;
    }

    public void setCooling_name(String cooling_name) {
        this.cooling_name = cooling_name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Order() {
    }

    public Order(String username, String case_name, String gpu_name, String cpu_name, String cooling_name) {
        this.username = username;
        this.case_name = case_name;
        this.gpu_name = gpu_name;
        this.cpu_name = cpu_name;
        this.cooling_name = cooling_name;
        this.status = "pending";
    }


}
