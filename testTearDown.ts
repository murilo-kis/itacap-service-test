import {closeAll} from "./src/db";

const tearDownTests = async () => {
    afterAll(async () => {
        // await closeAll();
    });
};

export default tearDownTests;