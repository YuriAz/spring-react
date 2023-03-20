package br.com.api.products.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.products.model.ProductModel;
import br.com.api.products.model.ResponseModel;
import br.com.api.products.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository pr;

	@Autowired
	private ResponseModel rm;

	public Iterable<ProductModel> list() {
		return pr.findAll();
	}

	public ResponseEntity<?> insertAlter(ProductModel pm, String action) {

		if (pm.getName().equals("")) {
			rm.setMessage("Product name is mandatory!");
			return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
		} else if (pm.getBrand().equals("")) {
			rm.setMessage("Brand name is mandatory!");
			return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
		} else {
			if (action.equals("insert")) {
				return new ResponseEntity<ProductModel>(pr.save(pm), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<ProductModel>(pr.save(pm), HttpStatus.OK);
			}
		}
	}

	public ResponseEntity<ResponseModel> remove(long id) {
		pr.deleteById(id);
		rm.setMessage("Product successfully removed!");
		return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
	}
}
