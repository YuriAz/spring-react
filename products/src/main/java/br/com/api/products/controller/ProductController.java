package br.com.api.products.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.products.model.ProductModel;
import br.com.api.products.model.ResponseModel;
import br.com.api.products.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private ProductService ps;

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<ResponseModel> remove(@PathVariable long id) {
		return ps.remove(id);
	}

	@PutMapping("/alterate")
	public ResponseEntity<?> alter(@RequestBody ProductModel pm) {
		return ps.insertAlter(pm, "alterate");
	}

	@PostMapping("/insert")
	public ResponseEntity<?> insert(@RequestBody ProductModel pm) {
		return ps.insertAlter(pm, "insert");
	}

	@GetMapping("/list")
	public Iterable<ProductModel> list() {
		return ps.list();
	}

	@GetMapping
	public String route() {
		return "Products API running!";
	}
}
