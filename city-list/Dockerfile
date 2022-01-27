FROM gradle:jdk11 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle --no-daemon build

FROM openjdk:11.0-jdk-slim
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/city-list-1.0.0.jar /app/city-list-1.0.0.jar
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "/app/city-list-1.0.0.jar"]