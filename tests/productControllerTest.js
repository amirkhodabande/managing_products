import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import Product from '../app/models/product.js';

chai.use(chaiHttp);
chai.should();

describe("Products", () => {
    let verifyStub;

    beforeEach(async () => {
        await Product.deleteMany({}).catch(err => {
            throw (err.message);
        });

        verifyStub = sinon.stub(jwt, 'verify');
    });

    afterEach(async () => {
        await Product.deleteMany({}).catch(err => {
            throw (err.message);
        });

        verifyStub.restore();
    });

    it("should get all products", async () => {
        const array = [
            { title: "product 1", description: "the first product description" },
            { title: "product 2", description: "the second product description" },
            { title: "product 3", description: "the third product description" },
        ];

        await Product.insertMany(array);

        const token = 'valid_token';
        const decodedToken = { userId: '123' };
        verifyStub.returns(decodedToken);

        const res = await chai.request(app)
            .get('/api/products')
            .set('Authorization', token);

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.length(3);
    });

    it("should create a product", async () => {
        const token = 'valid_token';
        const decodedToken = { userId: '123' };
        verifyStub.returns(decodedToken);

        const res = await chai.request(app)
            .post('/api/products')
            .set('Authorization', token)
            .send({ title: 'product title', description: 'product description' });


        let productsCount = await Product.count();

        res.should.have.status(201);
        productsCount.should.be.equal(1);
    });

    it("should see a product", async () => {
        const token = 'valid_token';
        const decodedToken = { userId: '123' };
        verifyStub.returns(decodedToken);

        let product = await Product.create({
            title: 'product title',
            description: 'product description'
        });

        const res = await chai.request(app)
            .get('/api/products/' + product._id)
            .set('Authorization', token);

        res.should.have.status(200);
        res.body.success.should.be.equal(true);
        res.body.data.title.should.be.equal(product.title);
    });

    it("should update a product", async () => {
        const token = 'valid_token';
        const decodedToken = { userId: '123' };
        verifyStub.returns(decodedToken);

        let product = await Product.create({
            title: 'product title',
            description: 'product description'
        });

        const res = await chai.request(app)
            .put('/api/products/' + product._id)
            .set('Authorization', token)
            .send({ title: 'updated title', description: 'updated description' });

        product = await Product.findById(product._id);

        res.should.have.status(200);
        res.body.success.should.be.equal(true);
        product.title.should.be.equal('updated title');
        product.description.should.be.equal('updated description');
    });
});