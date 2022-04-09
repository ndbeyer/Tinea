import user, { type UserData } from "./userTestData";
import userRole, { type UserRoleData } from "./userRoleTestData";

type TestData = {
  user: UserData;
  user_role: UserRoleData;
};

const testData: TestData = {
  user,
  user_role: userRole,
};

export default testData;
