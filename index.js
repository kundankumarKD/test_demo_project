const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const PORT = 3000
const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const mysql2 = require('mysql2');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
app.use(bodyparser.json());



// // Swagger set up
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'My API Documentation',
//             version: '1.0.0',
//             description: 'A simple Express API with Swagger',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3000',
//             },
//         ],
//     }
// };

// const options = {
//     swaggerOptions,
//     apis: ['./index.js'], // <--- point to your own file (index.js)
// };

// const swaggerSpec = swaggerJSDoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const conn = new Sequelize('test_demo_project', 'root', 'password', {
    dialect: 'mysql',
    logging: true,
})

const organization = conn.define("organization", ({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    org_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    website: {
        type: sequelize.STRING,
        allowNull: false
    },
    no_of_employee: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}))


const users = conn.define("user", ({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    address: {
        type: sequelize.STRING,
        allowNull: false
    },
    org_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
}))

app.post('/create-organization', async (req, res) => {
    try {
        console.log(req.body)
        const { org_name, website, no_of_employee } = req.body;
        if (!org_name || !website || !no_of_employee) {
            res.status(400).send({ error: 'All fields are required' });
        }
        let createOrganization = await organization.create({ org_name, website, no_of_employee })
        console.log(createOrganization)
        res.send({ message: 'Organization created successfully' })
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: 'All fields are required' });
    }
})

app.post('/create-contacts', async (req, res) => {
    try {
        const { contacts } = req.body
        await users.bulkCreate(contacts)
        res.send({ message: 'Organization created successfully' })
    } catch (error) {
        res.status(400).send({ error: 'All fields are required' });
        console.error(error)
    }
})

app.post('/update-contacts', async (req, res) => {
    try {
        const { org_id, user_id, name, email, phone, adress } = req.body
        let getUser = await users.findOne({ where: { id: user_id, org_id: org_id } })
        if (!getUser) {
            res.status(404).send({ error: 'User not found' });
        }
        getUser = getUser?.dataValues
        if (getUser) delete getUser.id
        await users.create(getUser)
        res.send({ message: 'User created successfully' })
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: 'All fields are required' });
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})
