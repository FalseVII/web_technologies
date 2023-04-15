package com.tus.personal_project.jwt.controller;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import com.tus.personal_project.jwt.config.JwtTokenUtil;
import com.tus.personal_project.jwt.config.UserDao;
import com.tus.personal_project.jwt.model.DAOUser;
import com.tus.personal_project.jwt.model.JwtRequest;
import com.tus.personal_project.jwt.model.JwtResponse;
import com.tus.personal_project.jwt.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	private UserDao userDao;



	@PostMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = jwtInMemoryUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws RuntimeException {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new DisabledException("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException("INVALID_CREDENTIALS", e);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws RuntimeException {
		final String PW_PATTERN =
				"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
		final Pattern pattern = Pattern.compile(PW_PATTERN);

			Matcher matcher = pattern.matcher(user.getPassword());
			if(!matcher.matches()) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must contain at least one digit, one lower case letter, one upper case letter, one special character, and must be between 8 and 20 characters long");
			}
			return ResponseEntity.ok(userDetailsService.save(user));
		}


	
	
	@PostMapping( "/users/type/{username}")
	public String findTypeByUsername(@PathVariable String username){
		DAOUser user = userDetailsService.findByUsername(username);
		return user.getType();
	}


	@RequestMapping("/users/type/{name}")
	public ResponseEntity<String> findByUsername(@PathVariable(value = "name") String name) {
		DAOUser user_type;
		try {
			user_type = userDao.findTypeByUsername(name);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
		}
		return ResponseEntity.ok(user_type.getType());
	}


}
