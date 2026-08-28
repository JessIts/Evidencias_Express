import { getStudentsCallback } from "./callbacks.js";
import { getStudentsPromise } from "./promises.js";
import { getStudentsAsync } from "./async-await.js";

async function main(): Promise<void> {

    console.log("=== CALLBACK ===");

    getStudentsCallback((error, data) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(data);
    });

    console.log("=== PROMISE ===");

    getStudentsPromise()
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

    console.log("=== ASYNC/AWAIT ===");

    try {
        const data = await getStudentsAsync();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

main();