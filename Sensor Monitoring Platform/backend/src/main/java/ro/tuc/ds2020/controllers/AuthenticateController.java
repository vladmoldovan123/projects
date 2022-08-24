package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.UserDetailsDTO;
import ro.tuc.ds2020.services.AuthenticateService;
import ro.tuc.ds2020.util.AuthRequest;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping(value = "/login")
public class AuthenticateController {

    private final AuthenticateService authenticateService;

    @Autowired
    public AuthenticateController(AuthenticateService authenticateService) {
        this.authenticateService = authenticateService;
    }

    @PostMapping()
    public ResponseEntity<UserDetailsDTO> login(@Valid @RequestBody AuthRequest authRequest)
    {
        UserDTO user = authenticateService.loginUser(authRequest.getUsername(),authRequest.getPassword());
        if(user != null)
        {
            UserDetailsDTO userDetailsDTO = new UserDetailsDTO(user.getId(), user.getRole());
            return new ResponseEntity<>(userDetailsDTO, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
