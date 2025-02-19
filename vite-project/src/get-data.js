export default async function getData() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const request = await fetch('/public/data.json');
    const data = await request.json()
    return data.data
}