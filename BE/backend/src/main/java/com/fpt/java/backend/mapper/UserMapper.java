package com.fpt.java.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.fpt.java.backend.dto.UserDTO;
import com.fpt.java.backend.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "password", ignore = true) 
    @Mapping(target = "cart", ignore = true) 
    @Mapping(target = "orders", ignore = true) 
    @Mapping(target = "comments", ignore = true) 
    User toEntity(UserDTO userDTO);

    UserDTO toDTO(User user);
}
