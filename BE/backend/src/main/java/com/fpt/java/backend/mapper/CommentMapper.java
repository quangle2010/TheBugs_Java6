package com.fpt.java.backend.mapper;

import com.fpt.java.backend.dto.CommentDTO;
import com.fpt.java.backend.entities.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "author")
    CommentDTO toDTO(Comment comment);

    @Mapping(target = "product", ignore = true) // Set manually in service
    @Mapping(target = "user", ignore = true) // Set manually in service
    Comment toEntity(CommentDTO commentDTO);
}
