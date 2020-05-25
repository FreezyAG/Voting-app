const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require ('proxyquire');

const { makeMockModels } = require ('sequelize-test-helpers');

const UserModel = makeMockModels({
    User: {
        findOne: sinon.stub(),
    }
});

const AuthController = proxyquire('../src/controllers/auth', {
    '../models/user': UserModel
});

// const fakeUser = { update: sinon.stub() }

describe('authController', () => {

    const resetStubs = () => {
        UserModel.User.findOne.resetHistory()
    //     fakeUser.update.resetHistory()
    };

    const req = {
        body: {
            email: 'test99@test.com',
            password: 'tester'
        },
    };

    context('user does not exist', () => {
        before(async () => {
            // UserModel.User.findOne.resolves(undefined);
            UserModel.User.findOne.throws();
        });

        it('should throw an error with code 500 if accessing the database fails', async function () {
            result = await AuthController.login(req, {}, () => {})
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);        
        });

        after (resetStubs);
    });
});