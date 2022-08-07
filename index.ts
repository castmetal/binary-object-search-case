import { faker } from "@faker-js/faker";

type StudentAddress = {
  streetAddress: String;
  number: String;
  neighborhood: String;
};

type Student = {
  name: String;
  surname: String;
  address: StudentAddress;
};

type FindObject = {
  position: number;
  depths: number;
  student: Student;
};

function getArrayExampleO1(): Student[] {
  const arrayExample: Student[] = [];

  for (let i = 0; i < 1000; i++) {
    arrayExample.push({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      address: {
        streetAddress: faker.address.streetAddress(),
        number: faker.address.buildingNumber(),
        neighborhood: faker.address.secondaryAddress(),
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
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      address: {
        streetAddress: faker.address.streetAddress(),
        number: faker.address.buildingNumber(),
        neighborhood: faker.address.secondaryAddress(),
      },
    });
  }

  return arrayExample;
}

function getArrayExampleOLogN(): Student[] {
  const arrayExample: Student[] = [];

  for (let i = 0; i < 100; i++) {
    arrayExample.push({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      address: {
        streetAddress: faker.address.streetAddress(),
        number: faker.address.buildingNumber(),
        neighborhood: faker.address.secondaryAddress(),
      },
    });
  }

  arrayExample.push({
    name: "André",
    surname: "Nascimento",
    address: {
      streetAddress: "Rua Y",
      number: "14000",
      neighborhood: "Avaí",
    },
  });

  for (let i = 0; i < 1000; i++) {
    arrayExample.push({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      address: {
        streetAddress: faker.address.streetAddress(),
        number: faker.address.buildingNumber(),
        neighborhood: faker.address.secondaryAddress(),
      },
    });
  }

  return arrayExample;
}

async function findStudentByBinarySearch(
  data: Student[],
  name: string,
  actualDepth?: number,
  studentFounded?: FindObject,
  originalStartPosition?: number
): Promise<FindObject | undefined> {
  const maxDepth = 4;
  const arrayLength = data.length;
  const actualDepthInside = actualDepth ?? 0;

  if (studentFounded) {
    return studentFounded;
  }

  if (arrayLength > 3 && actualDepthInside <= maxDepth) {
    const middlePosition = Math.ceil(arrayLength / 2);
    const startPosition = originalStartPosition ?? 0;

    const originalLeftPosition = startPosition;
    const leftBranch = data.slice(0, middlePosition - 1);

    const originalRightPosition = startPosition + middlePosition;
    const rightBranch = data.slice(middlePosition, arrayLength - 1);

    const findStudent = await Promise.all([
      await findStudentByBinarySearch(
        leftBranch,
        name,
        actualDepthInside + 1,
        studentFounded,
        originalLeftPosition
      ),
      await findStudentByBinarySearch(
        rightBranch,
        name,
        actualDepthInside + 1,
        studentFounded,
        originalRightPosition
      ),
    ]);

    for (let i = 0; i < findStudent.length; i++) {
      if (findStudent[i]) {
        studentFounded = findStudent[i];
        return studentFounded;
      }
    }
  }

  const initialPosition = originalStartPosition ?? 0;

  for (let i = 0; i < arrayLength; i++) {
    if (data[i].name === name) {
      studentFounded = {
        position: i + initialPosition,
        student: data[i],
        depths: actualDepthInside,
      };

      return studentFounded;
    }
  }

  return studentFounded;
}

async function main() {
  const studentsArray1 = getArrayExampleO1();

  const student1 = await findStudentByBinarySearch(studentsArray1, "Aldair");

  console.log("Result1: ", student1);

  const studentsArray2 = getArrayExampleOLogN();

  const student2 = await findStudentByBinarySearch(studentsArray2, "André");

  console.log("Result2: ", student2);
}

if (require.main === module) {
  main();
}
