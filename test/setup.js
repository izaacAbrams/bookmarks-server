require("dotenv").config();
const { expect } = require("chai");
const supertest = require("supertest");
process.env.NODE.ENV = "test";

global.expect = expect;
global.supertest = supertest;
