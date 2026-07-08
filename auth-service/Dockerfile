FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/*.jar app.jar

COPY database/migrations /app/database/migrations

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]