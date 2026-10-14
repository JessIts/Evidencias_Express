import { getStudentsPromise } from "./promises.js";
export async function getStudentsAsync() {
    const data = await getStudentsPromise();
    return data;
}
