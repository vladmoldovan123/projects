package ro.tuc.ds2020.services;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.UserEntity;
import ro.tuc.ds2020.repositories.UserRepository;

@Service
public class AuthenticateService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticateService.class);
    private final UserRepository userRepository;

    @Autowired
    public AuthenticateService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public UserDTO loginUser(String username,String password){
        UserEntity userEntity = userRepository.findByUsername(username);
        if(userEntity.getPassword().equals(password))
            return UserBuilder.toUserDTO(userEntity);
        else
            return null;
    }
}
