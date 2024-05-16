"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const exceptions_service_1 = require("./exceptions.service");
describe('ExceptionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [exceptions_service_1.ExceptionsService],
        }).compile();
        service = module.get(exceptions_service_1.ExceptionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=exceptions.service.spec.js.map