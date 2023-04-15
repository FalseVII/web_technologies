package com.tus.personal_project.jwt.service;

import java.util.ArrayList;


import com.tus.personal_project.jwt.config.UserDao;
import com.tus.personal_project.jwt.controller.UserDTO;


import com.tus.personal_project.jwt.model.DAOUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.server.ResponseStatusException;

@Service
public class JwtUserDetailsService implements UserDetailsService
{

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		DAOUser user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
		}



	public DAOUser save(UserDTO user) {
		DAOUser newUser = new DAOUser();
		newUser.setType(user.getType());
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		System.out.println("WOOOOO SAAAVE!!");
		return userDao.save(newUser);
	}
	public String findTypeByUsername(String username) {
		DAOUser user = userDao.findByUsername(username);
		String user_name = user.getType();
		return user_name;
	}
	public Iterable<DAOUser> findAllUsers() {
		return userDao.findAll();
	}

	public DAOUser findByUsername(String name) {
		DAOUser user;
		try {
			user = userDao.findByUsername(name);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
		}
		return user;
	}

	
	
}	