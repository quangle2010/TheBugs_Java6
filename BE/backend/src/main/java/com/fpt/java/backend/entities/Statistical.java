package com.fpt.java.backend.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class Statistical {
  @Id
  private long id;

	private Date create_at;

	private long total;

	private String details;
	
}
