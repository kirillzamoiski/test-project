package com.solbegsoft.citylist.dto;

import com.solbegsoft.citylist.model.City;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityResponse {

    private List<City> content;
    private Long recordCount;

}
