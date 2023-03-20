package br.com.api.products.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.api.products.model.ProductModel;

public interface ProductRepository extends CrudRepository<ProductModel, Long> {
}
