import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import Product from '../app/models/product.js';

chai.use(chaiHttp);
chai.should();

beforeEach((done) => {
    Product.deleteMany({}).catch(err => {
        throw (err.message);
    });
    done();
});

afterEach((done) => {
    Product.deleteMany({}).catch(err => {
        throw (err.message);
    });
    done();
});

describe("Products", () => {
    let verifyStub;

    beforeEach(() => {
        verifyStub = sinon.stub(jwt, 'verify');
    });

    afterEach(() => {
        verifyStub.restore();
    });

    describe("user can see products list", () => {
        it("should get all products", (done) => {
            const array = [
                { title: "product 1", description: "the first product description" },
                { title: "product 2", description: "the second product description" },
                { title: "product 3", description: "the third product description" },
            ];

            Product.insertMany(array)
                .catch(err => {
                    throw (err.message);
                });

            const token = 'valid_token';
            const decodedToken = { userId: '123' };
            verifyStub.returns(decodedToken);

            chai.request(app)
                .get('/api/products')
                .set('Authorization', token)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');    
                    res.body.data.should.have.length(3);
                    done();
                });
        });
    });
});