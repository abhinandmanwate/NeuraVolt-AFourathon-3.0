
# Cab Management Project - Backend Microservice

This repository contains the backend microservice for the Cab Management Project, which provides functionality for managing drivers, cabs, and their associations.


## Prerequisites
Before proceeding with the installation and deployment, ensure that you have the following:

1)An AWS account with EC2 instance access.

2)Inbound rule allowing HTTP traffic (port 8080) to your EC2 instance.

3)Docker installed on your EC2 instance.

## Installation and Deployment
## Option 1: Deploying without Docker Compose

**1.Clone the Repository:**   
Clone this repository to your local machine .

**2.Update the `application.properties` File:**  
Open the application.properties file located in the Spring Boot project and update the database URL to:

```
spring.datasource.url=jdbc:mysql://mysqldb:3306/cabmanagement?useSSL=false&allowPublicKeyRetrieval=true
```
**3.Build the Spring Boot Application` .jar` file:**  
Use GUI or command to build spring boot application that will give you `cabmanagement-0.0.1-SNAPSHOT.jar` file in target folder.

**4.Transfer the `.jar` File to EC2 instance :**  
Use the `scp` command to transfer the generated `.jar` file to your EC2 instance. Replace `<path-to-your-keypair>` with the path to your key pair file and `<ec2-instance-public-ip-or-dns>` with the public IP or DNS of your EC2 instance.
```
scp -i <path-to-your-keypair>.pem target/cabmanagement-0.0.1-SNAPSHOT.jar ubuntu@<ec2-instance-public-ip-or-dns>

```
**5.Pull the `mysql:8` and `openjdk:20` Image in EC2 :**  
Pull the `mysql:8` and   `openjdk:20`Docker image from Docker Hub:

```
docker pull mysql:8
```
```
docker pull openjdk:20
```
**6.Create a Docker Network:**  
Create a Docker network to enable communication between the Spring Boot app and the MySQL container.

```
docker network create springbootapi
```


**7.Run the MySQL Container:**  
 Run the MySQL container within the created network.

```
docker run -d --name mysqldb --network springbootapi -e MYSQL_ROOT_PASSWORD=rootboot mysql:8
```


**9.Access the MySQL Container and Create the Database:**  
Access the MySQL container and create the required database.

```
docker exec -it mysqldb mysql -u root -prootboot
```

Enter the MySQL root password when prompted.

```
CREATE DATABASE cabmanagement;
```


**10.Create a Dockerfile:**  
Create a Dockerfile where your `cabmanagement-0.0.1-SNAPSHOT.jar`
redises  and write following code in it:


```
FROM openjdk:20

COPY target/cabmanagement-0.0.1-SNAPSHOT.jar  cabmanagement.jar

ENTRYPOINT["java","-jar","/cabmanagement.jar"]
```

**11.Build the Docker Image:**  
Once Docker is installed, navigate to the directory where you transferred the `.jar` file and run the following command to build the Docker image:
```
docker build -t cabbackend .
```



**12.Run the Docker Container:**  
After the Docker image is built, run the following command to start the Docker container:

```
docker run -d -p 8080:8080 --network springbootapi --name cabmanagement cabmanagementbackend
```



## Option 2: Deploying with Docker Compos
### Follow these steps to set up and deploy the backend microservice on AWS EC2 using Docker Compose:

**1.Clone the Repository:**  
Clone this repository to your local machine or directly access it from your EC2 instance.

**2.Transfer the Repository:**  
Transfer the repository to your EC2 instance using the scp command or any other preferred method.

**3.SSH into the EC2 Instance:**  
Connect to your EC2 instance using SSH. Replace` <path-to-your-keypair>`with the path to your key pair file and `<ec2-instance-public-ip-or-dns>` with the public IP or DNS of your EC2 instance.

```
ssh -i <path-to-your-keypair>.pem ubuntu@<ec2-instance-public-ip-or-dns>
```
**4.Install Docker and Docker Compose:** Install Docker and Docker Compose on your EC2 instance by following the official installation instructions.

**5.Navigate to the Repository:** Navigate to the repository directory on your EC2 instance.

```
cd cab-management-backend
```
**Update the Environment Variables:**  
Update the environment variables in the `docker-compose.yml` file as per your requirements.

**Run Docker Compose:**  
Run the following command to start the Docker containers
```
docker-compose up -d
```


## Access the Backend Microservice
 
### Open a web browser or any software like postman and enter the following URL to access the backend microservice:
use endpoints cabapi and driverapi refer controller structure in springboot project for successful API communication.
```
http://<ec2-instance-public-ip-or-dns>:8080/cabapi
http://<ec2-instance-public-ip-or-dns>:8080/driverapi
```
## Contact
If you have any questions or suggestions, please feel free to reach out to us.