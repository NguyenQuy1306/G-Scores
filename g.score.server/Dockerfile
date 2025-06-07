# syntax=docker/dockerfile:1
FROM eclipse-temurin:23
WORKDIR /app

COPY target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]