FROM java:8-alpine
MAINTAINER Your Name <you@example.com>

ADD target/uberjar/failproof-server.jar /failproof-server/app.jar

EXPOSE 3000

CMD ["java", "-jar", "/failproof-server/app.jar"]
