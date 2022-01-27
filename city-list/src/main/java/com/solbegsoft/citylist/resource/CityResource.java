package com.solbegsoft.citylist.resource;

import com.solbegsoft.citylist.dto.CityResponse;
import com.solbegsoft.citylist.model.City;
import com.solbegsoft.citylist.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cities")
@CrossOrigin
public class CityResource {

    private final CityService service;

    @GetMapping
    private ResponseEntity<List<City>> findAll() {
        return ok(service.findAll());
    }

    @GetMapping("/{id}")
    private ResponseEntity<City> findById(@PathVariable final Long id) {
        return ok(service.findByIdOrThrowException(id));
    }

    @GetMapping("/search")
    private ResponseEntity<City> findCityByName(@RequestParam(name = "name") final String name) {
        return ok(service.findCityByName(name));
    }

    @PutMapping("/{id}")
    private ResponseEntity<City> updateCityNameOrPhoto(@PathVariable final Long id,
                                                       @RequestParam(name = "name", required = false) final String name,
                                                       @RequestParam(name = "photo", required = false) final String photo) {
        return ok(service.update(id, name, photo));
    }

    @GetMapping("/pagination")
    private CityResponse findAllPagination(@RequestParam(name = "pageNumber", required = false) final Integer pageNumber,
                                                       @RequestParam(name = "pageSize", required = false) final Integer pageSize) {
        Page<City> cities = service.findAllPagination(pageNumber, pageSize);
        return new CityResponse(cities.getContent(), cities.getTotalElements());
    }
}
