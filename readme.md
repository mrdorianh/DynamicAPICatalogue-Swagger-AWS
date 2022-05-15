# Dynamic Swagger Website
by [Dorian Hryniewicki](mrdorianh@gmail.com)

## Description
This repository gives you a starting point to create a dynamic website with Swagger documentation. The website is hosted on AWS S3 and the Swagger documentation is generated from a Lambda function. The Lambda function is triggered by an API Gateway endpoint. The Lambda function is using a Lambda Layer to share code between multiple Lambda functions as needed and allow inline editing in the AWS console (since node_modules usually over extend the inline editing package size restriction).

## Stack: 
- AWS (Lambda, S3, API Gateway)
- Swagger
- Node.js
- CI/CD (Serverless Framework)

## How to use

### 1. Configure Environmental Variables in the AWS Console SSM Parameter Store
- Create and populate new parameters in the AWS SSM Parameter Store with the following names:
  - /dev/vpc_sg // The security group of your VPC
  - /dev/vpc_sub_1 // The first subnet of your VPC
  - /dev/vpc_sub_2 // The second subnet of your VPC
  - /dev/api_key // The API key for your API Gateway access via SDK for dynamic API extraction
  - /dev/api_secret // The API Secret for your API Gateway access via SDK for dynamic API extraction


### 2. Create an AWS S3 bucket and enable it as a website

- Create a new S3 bucket
- Add the following CORS configuration to the S3 bucket:
  - Allowed Origins: *
  - Allowed Methods: GET
  - Allowed Headers: *
  - Expose Headers: *
  - Max Age Seconds: 3000
- Add the following bucket policy to the S3 bucket:
  - {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::BUCKET_NAME/*"
            }
        ]
    }

### 3. Deploy the Lambda Layer(s)

- Install the Serverless Framework
- Install the dependencies of the layer
  - cd `layers/{myLayer}/nodejs` && `npm install --omit=dev`
- Deploy the layer: `cd ../.. && serverless deploy`

### 4. Deploy the example API Service and swagger API

- Install the Serverless Framework
- Install the dependencies of the example API
  - cd `api/example-api/` && `npm install --omit=dev`
- Deploy the api service: `serverless deploy`
- Install the dependencies of the swagger API
  - `cd api/swagger-api/` && `npm install --omit=dev`
- Deploy the swagger API: `serverless deploy`

### 5. Configure and Deploy the website
- change the base url of line #4 in swagger-initializer.js to the url of your swagger endpoint deployed in step 
- Clone the repository
- Push the web repository into to your s3 bucket. (e.g. `aws s3 sync ./Swagger-UI_S3-site s3://BUCKET_NAME`)

### 6. Enjoy

- Open the website in your browser with the url of your S3 bucket (e.g. `https://BUCKET_NAME.s3.amazonaws.com/index.html`)
- You can see the Swagger documentation in the browser as well as a dropdown to select any of the APIs deployed to AWS in the top right corner. The dropdown is populated by the API Gateway endpoint that is triggered by the Lambda function and returns the most up to date specifications deployed.