package com.fpt.java.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fpt.java.backend.dto.ProductDTO;
import com.fpt.java.backend.entities.Image;
import com.fpt.java.backend.entities.Product;
import com.fpt.java.backend.repository.ImageJPA;
import com.fpt.java.backend.repository.ProductJPA;
import com.fpt.java.backend.mapper.ProductMapper;
import com.fpt.java.backend.beans.*;

@Service
public class ProductService {
    private final ProductJPA productJPA;
    private final ProductMapper productMapper;
    private final ImageJPA imageJPA;

    public ArrayList<ProductDTO> getAllProduct() {
        ArrayList<Product> products = (ArrayList<Product>) productJPA.findAll();
        return products.stream()
                .map(productMapper::toDTO)
                .sorted(Comparator.comparing(ProductDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public ArrayList<ProductDTO> gettAllProductActiveAndCategoryActive() {
        ArrayList<Product> products = (ArrayList<Product>) productJPA.findAllByProductActiveAndCategoryActive();
        return products.stream()
                .map(productMapper::toDTO)
                .sorted(Comparator.comparing(ProductDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public ProductService(ProductJPA productJPA, ProductMapper productMapper, ImageJPA imageJPA) {
        this.productJPA = productJPA;
        this.productMapper = productMapper;
        this.imageJPA = imageJPA;
    }

    public boolean validateImages(ProductBean productBean) {
        return productBean.getImages() != null && productBean.getImages().stream().anyMatch(file -> !file.isEmpty());
    }

    public Product processProduct(Product product, List<MultipartFile> images) {
        Product savedProduct = productJPA.save(product);
        if (images != null && !images.isEmpty()) {
            Path imagePath = Paths.get("images/");
            try {
                if (!Files.exists(imagePath)) {
                    Files.createDirectories(imagePath);
                }

                for (MultipartFile image : images) {
                    String imageName = System.currentTimeMillis() + ".jpg";
                    Path filePath = Paths.get(imagePath.toString(), imageName);
                    Files.write(filePath, image.getBytes());
                    Image productImage = new Image();
                    productImage.setProduct(savedProduct);
                    productImage.setName(imageName);
                    imageJPA.save(productImage);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return savedProduct;
    }

    public Product delete(Integer id) {
        Optional<Product> optProduct = productJPA.findById(id);
        if (!optProduct.isPresent()) {
            throw new IllegalArgumentException("Sản phẩm không tồn tại.");
        }
        optProduct.get().setActive(false);
        return productJPA.save(optProduct.get());
    }

    public ProductDTO findById(Integer id) {
        Optional<Product> optProduct = productJPA.findById(id);
        if (!optProduct.isPresent()) {
            throw new IllegalArgumentException("Sản phẩm không tồn tại.");
        }
        return productMapper.toDTO(productJPA.save(optProduct.get()));
    }

    public ProductDTO getTop1() {
        return productMapper.toDTO(productJPA.getMaxIdProduct());
    }

    public ArrayList<ProductDTO> findTop5() {
        ArrayList<Product> products = productJPA.findTop5ExcludingMaxId();
        return products.stream()
                .map(productMapper::toDTO)
                .sorted(Comparator.comparing(ProductDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

}
