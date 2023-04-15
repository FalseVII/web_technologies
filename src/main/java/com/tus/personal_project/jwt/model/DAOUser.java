package com.tus.personal_project.jwt.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tus.personal_project.jwt.config.UserDao;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



import java.util.Optional;



@Entity
@Table(name = "user")
public class DAOUser implements UserDao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column( nullable = false)
    @JsonIgnore
    private String password;

    @Column( nullable = false)
    @JsonIgnore
    private String type;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


	@Override
	public DAOUser findByUsername(String username) {
		return null;
	}

	@Override
	public DAOUser findTypeByUsername(String username) {
		return null;
	}

	@Override
	public <S extends DAOUser> S save(S s) {
		return null;
	}

	@Override
	public <S extends DAOUser> Iterable<S> saveAll(Iterable<S> iterable) {
		return null;
	}

	@Override
	public Optional<DAOUser> findById(Integer integer) {
		return Optional.empty();
	}

	@Override
	public boolean existsById(Integer integer) {
		return false;
	}

	@Override
	public Iterable<DAOUser> findAll() {
		return null;
	}

	@Override
	public Iterable<DAOUser> findAllById(Iterable<Integer> iterable) {
		return null;
	}

	@Override
	public long count() {
		return 0;
	}

	@Override
	public void deleteById(Integer integer) {

	}

	@Override
	public void delete(DAOUser daoUser) {

	}


	@Override
	public void deleteAll(Iterable<? extends DAOUser> iterable) {

	}

	@Override
	public void deleteAll() {

	}
}