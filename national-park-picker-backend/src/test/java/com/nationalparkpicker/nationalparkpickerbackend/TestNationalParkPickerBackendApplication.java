package com.nationalparkpicker.nationalparkpickerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
public class TestNationalParkPickerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(NationalParkPickerBackendApplication::main).with(TestNationalParkPickerBackendApplication.class).run(args);
	}

}
