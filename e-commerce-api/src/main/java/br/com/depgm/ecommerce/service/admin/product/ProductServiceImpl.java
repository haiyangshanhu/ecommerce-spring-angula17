package br.com.depgm.ecommerce.service.admin.product;

import br.com.depgm.ecommerce.dtos.ProductDTO;
import br.com.depgm.ecommerce.dtos.ProductRequestDTO;
import br.com.depgm.ecommerce.entity.Category;
import br.com.depgm.ecommerce.entity.Product;
import br.com.depgm.ecommerce.repository.CategoryRepository;
import br.com.depgm.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;


    @Override
    public ProductDTO createProduct(ProductRequestDTO productRequestDTO) throws IOException {
        Product newProduct = new Product();
        newProduct.setName(productRequestDTO.name());
        newProduct.setPrice(productRequestDTO.price());
        newProduct.setDescription(productRequestDTO.description());
        newProduct.setImg(productRequestDTO.img().getBytes());

        Category foundCategory = categoryRepository.findById(productRequestDTO.category_id()).orElseThrow();

        newProduct.setCategory(foundCategory);

        return productRepository.save(newProduct).getProductDTO();

    }

    @Override
    public List<ProductDTO> products() {
        List<Product> getAllProduts = productRepository.findAll();
        return getAllProduts.stream().map(Product::getProductDTO).toList();
    }
}
