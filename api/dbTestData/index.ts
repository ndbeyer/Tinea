import user, { UserData } from './userTestData';
import pharmaceutical, { PharmaceuticalData } from './pharmaceuticalData';

type TestData = {
	user: UserData;
	pharmaceutical: PharmaceuticalData;
};

const testData: TestData = {
	user,
	pharmaceutical,
};

export default testData;
