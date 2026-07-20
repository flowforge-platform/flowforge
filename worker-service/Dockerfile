FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=docker

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]

