FROM eclipse-temurin:21-jre

WORKDIR /app

COPY worker-service/target/*.jar app.jar
COPY database/migrations /app/database/migrations

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]