FROM eclipse-temurin:25-jdk-jammy AS java-builder

WORKDIR /app

COPY /backend ./

RUN ./mvnw dependency:copy-dependencies
RUN ./mvnw clean package -Dmaven.test.skip

RUN mkdir -p /output/etc && \
    echo "spring:x:1000:1000:Spring User:/sbin/noLogin" > /output/etc/passwd && \
    echo "spring:1000:1000" > /output/etc/group

FROM eclipse-temurin:21-jre AS deps

WORKDIR /app

COPY --from=java-builder /output/etc/passwd /etc/passwd
COPY --from=java-builder /output/etc/group /etc/group

COPY --from=java-builder /app/target/*.jar app.jar

USER spring

ENTRYPOINT [ "java", "-jar", "app.jar"]

