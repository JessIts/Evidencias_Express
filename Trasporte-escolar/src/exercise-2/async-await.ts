import { getStudentsPromise } from "./promises.js";

export async function getStudentsAsync(): Promise<string> {
    const data = await getStudentsPromise();
    return data;
}