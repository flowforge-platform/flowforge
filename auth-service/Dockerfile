FROM eclipse-temurin:21-jre

WORKDIR /app

COPY auth-service/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]