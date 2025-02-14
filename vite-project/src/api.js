import { subjects } from "./data";

export async function getSubjects() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(subjects);
        }, 1000);
    });
}