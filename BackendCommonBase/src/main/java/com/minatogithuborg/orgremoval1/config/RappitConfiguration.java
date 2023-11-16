package com.minatogithuborg.orgremoval1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:application_context_${spring.profiles.active}.properties")
@Configuration
public class RappitConfiguration {

}
