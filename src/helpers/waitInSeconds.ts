export default function waitInSeconds(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
