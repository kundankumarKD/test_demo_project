# test_demo_project


curl --location --request POST 'http://localhost:3000/create-organization' \
--header 'Content-Type: application/json' \
--data-raw '{
    "org_name" : "PWC",
    "website": "www.pwc.com",
    "no_of_employee" : 10
}'



curl --location --request POST 'http://localhost:3000/create-contacts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "contacts": [
        {
            "name": "Rahul Kumar",
            "email": "rk123@gmail.com",
            "phone": "8002651165",
            "address": "At:gurugram, haryana",
            "org_id": 2
        },
        {
            "name": "Rahul Kumar",
            "email": "rk123@gmail.com",
            "phone": "8002651165",
            "address": "At:gurugram, haryana",
            "org_id": 2
        },
        {
            "name": "Rahul Kumar",
            "email": "rk123@gmail.com",
            "phone": "8002651165",
            "address": "At:gurugram, haryana",
            "org_id": 2
        }
    ]
}'



curl --location --request POST 'http://localhost:3000/update-contacts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": 1,
    "name": "Rahul Kumar",
    "email": "rk123@gmail.com",
    "phone": "8002651165",
    "address": "At:gurugram, haryana",
    "org_id": 1
}
'



===========================================DATABASE======================

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` text NOT NULL,
  `phone` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `org_id` int NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_name` varchar(100) NOT NULL,
  `website` text NOT NULL,
  `no_of_employee` int NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
