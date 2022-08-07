"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function getArrayExample() {
    const arrayExample = [];
    for (let i = 0; i < 100; i++) {
        arrayExample.push({
            name: faker_1.faker.name.firstName(),
            surname: faker_1.faker.name.lastName(),
            address: {
                streetAddress: faker_1.faker.address.streetAddress(),
                number: faker_1.faker.address.buildingNumber(),
                neighborhood: faker_1.faker.address.secondaryAddress(),
            },
        });
    }
    arrayExample.push({
        name: "Aldair",
        surname: "Santos",
        address: {
            streetAddress: "Rua X",
            number: "1248",
            neighborhood: "Castelo",
        },
    });
    for (let i = 0; i < 1000; i++) {
        arrayExample.push({
            name: faker_1.faker.name.firstName(),
            surname: faker_1.faker.name.lastName(),
            address: {
                streetAddress: faker_1.faker.address.streetAddress(),
                number: faker_1.faker.address.buildingNumber(),
                neighborhood: faker_1.faker.address.secondaryAddress(),
            },
        });
    }
    arrayExample.push({
        name: "André",
        surname: "Nascimento",
        address: {
            streetAddress: "Rua Y",
            number: "1400",
            neighborhood: "Palmeiras",
        },
    });
    return arrayExample;
}
function findStudentByBinaryTree(data, name, actualDepth, studentFounded) {
    const maxDepth = 4;
    const arrayLength = data.length;
    const actualDepthInside = actualDepth !== null && actualDepth !== void 0 ? actualDepth : 0;
    if (studentFounded) {
        return studentFounded;
    }
    if (arrayLength > 3 && actualDepthInside <= maxDepth) {
        const middlePosition = Math.ceil(arrayLength / 2);
        const leftBranch = data.slice(0, middlePosition - 1);
        const rightBranch = data.slice(middlePosition, arrayLength - 1);
        const findLeft = findStudentByBinaryTree(leftBranch, name, actualDepthInside + 1, studentFounded);
        if (findLeft) {
            studentFounded = findLeft;
            return studentFounded;
        }
        const findRight = findStudentByBinaryTree(rightBranch, name, actualDepthInside + 1, studentFounded);
        if (findRight) {
            studentFounded = findRight;
            return studentFounded;
        }
    }
    for (let i = 0; i < arrayLength; i++) {
        if (data[i].name === name) {
            studentFounded = { position: i, student: data[i] };
            return studentFounded;
        }
    }
    return studentFounded;
}
function main() {
    const students = getArrayExample();
    const student = findStudentByBinaryTree(students, "Aldair");
    console.log(student);
}
if (require.main === module) {
    main();
}
