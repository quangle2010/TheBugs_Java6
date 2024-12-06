package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fpt.java.backend.entities.Product;
import com.fpt.java.backend.repository.CategoryJPA;
import com.fpt.java.backend.mapper.ProductMapper;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.ProductService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/admin/api/products")
public class ManageProductController {

    private final ProductService productService;
    private final CategoryJPA categoryJPA;

    public ManageProductController(ProductService productService ,
            CategoryJPA categoryJPA) {
        this.productService = productService;
        this.categoryJPA = categoryJPA;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAll() {
        try {
            return ResponseEntity.ok(new ResponseData(true, "Tải danh sách loại sản phẩm thành công",
                    productService.getAllProduct()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseData> saveProduct(
            @RequestParam(value = "id", required = false) Integer id,
            @RequestParam("name") String name,
            @RequestParam("flavor") String flavor,
            @RequestParam("ingredients") String ingredients,
            @RequestParam("descriptions") String descriptions,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") Double price,
            @RequestParam("active") Boolean active,
            @RequestParam("categoryId") Integer categoryId,
            @RequestPart("images") List<MultipartFile> images) {
        Product product = new Product();
        if (id != null) {
            product.setId(id);
        }
        product.setName(name);
        product.setFlavor(flavor);
        product.setIngredients(ingredients);
        product.setDescriptions(descriptions);
        product.setQuantity(quantity);
        product.setPrice(price);
        product.setActive(active);
        product.setCategory(categoryJPA.findById(categoryId).get());
        Product savedProduct = productService.processProduct(product, images);
        if (savedProduct != null) {
            return ResponseEntity.ok(new ResponseData(true, "Lưu thành công",
                    ProductMapper.INSTANCE.toDTO(savedProduct)));

        }

        return ResponseEntity.status(401).body(new ResponseData(false, "Lỗi khi save", null));
    }

    @PostMapping("/delete")
    public ResponseEntity<ResponseData> delete(@RequestParam Integer id) {
        try {
            Product deletedpProduct = productService.delete(id);
            return ResponseEntity
                    .ok(new ResponseData(true, "Đã xóa thành công danh mục", ProductMapper.INSTANCE.toDTO(deletedpProduct)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
