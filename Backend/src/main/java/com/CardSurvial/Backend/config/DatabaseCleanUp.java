package com.CardSurvial.Backend.config;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Slf4j
@Configuration
public class DatabaseCleanUp {
    @Autowired
    private DataSource dataSource;

    @Bean
    public DatabaseCleanup databaseCleanup(){
        return new DatabaseCleanup(dataSource);
    }

    public static class DatabaseCleanup{

        private DataSource dataSource;

        public DatabaseCleanup(DataSource dataSource) {
            this.dataSource = dataSource;
        }

        @PreDestroy
        public void dropDatabaseTable(){
            try(Connection connection = dataSource.getConnection()){

                Statement statement = connection.createStatement();
                statement.executeUpdate("DROP TABLE IF EXISTS scores");
                statement.executeUpdate("DROP TABLE IF EXISTS user");

                log.warn("Tables dropped successfully");
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

}
