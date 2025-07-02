
const entryPoint = "/";

export const paths = {
  homePage: entryPoint,
  noMatch: "*"
};
export const absolutePaths = {
    detail: paths.homePage + ":name",
    getDetail:  (name: string) => paths.homePage + `details/${encodeURIComponent(name)}`
}