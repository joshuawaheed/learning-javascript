import { getJwtToken } from '../utils/helpers';
import { loginUser, registerUser } from './authController';
import bycrypt from 'bcryptjs';
import User from '../models/users';

jest.mock("../utils/helpers", () => ({
    getJwtToken: jest.fn(() => "jwt_token")
}));

const mockReq = () => {
    return {
        body: {
            name: "Test user",
            email: "test@gmail.com",
            password: "123456"
        }
    };
};

const mockRes = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };
};

const userRegister = {
    _id: "5aa92bd34d74467ba175a912e0045903",
    name: "Test user",
    email: "test@gmail.com",
    password: "hashedPassword"
};

const userLogin = {
    email: "test@gmail.com",
    password: "123456"
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe("Register User", () => {
    it("should register user", async () => {
        
        jest.spyOn(bycrypt, "hash").mockResolvedValueOnce("hashedPassword");
        jest.spyOn(User, "create").mockResolvedValueOnce(userRegister);

        const req = mockReq();
        const res = mockRes();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(bycrypt.hash).toHaveBeenCalledWith("123456", 10);

        expect(User.create).toHaveBeenCalledWith({
            name: "Test user",
            email: "test@gmail.com",
            password: "hashedPassword"
        });

    });

    it("should throw validation error", async () => {
        
        const req = mockReq().body = { body: {} };
        const res = mockRes();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Please enter all values"
        });
    
    });

    it("should throw deplicate email entered error", async () => {

        jest.spyOn(bycrypt, "hash").mockResolvedValueOnce("hashedPassword");
        jest.spyOn(User, "create").mockRejectedValueOnce({ code: 11000 });

        const req = mockReq();
        const res = mockRes();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Duplicate email"
        });
        
    });
});

describe("Login user", () => {

    it("should throw missing email or password error", async () => {

        const req = mockReq().body = { body: {} };
        const res = mockRes();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Please enter email & Password"
        });

    });

    it("should throw invalid email error", async () => {

        jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(null)
        }));

        const req = mockReq().body = { body: userLogin };
        const res = mockRes();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid Email or Password"
        });

    });

    it("should throw invalid password error", async () => {

        jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(userLogin)
        }));

        jest.spyOn(bycrypt, "compare").mockResolvedValueOnce(false);

        const req = mockReq();
        const res = mockRes();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid Email or Password"
        });

    });

    it("should return status code ok with jwt token", async () => {

        jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
            select: jest.fn().mockResolvedValueOnce(userLogin)
        }));

        jest.spyOn(bycrypt, "compare").mockResolvedValueOnce(true);

        const req = mockReq();
        const res = mockRes();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: "jwt_token"
        });

    });

});