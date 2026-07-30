FROM eclipse-temurin:21-jre

WORKDIR /app

COPY worker-service/target/*.jar app.jar

COPY database /app/database

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]

