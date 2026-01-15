package com.realestate.listing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;
import java.util.Properties;

@EnableDiscoveryClient
@EnableFeignClients //  AJOUTÉ Pour IA: Active Feign
@SpringBootApplication
public class ListingServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(ListingServiceApplication.class, args);
	}


}