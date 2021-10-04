import http from "./http-common";

class TestDataService {
  postFile(file:any) {
    return http.post("/file", file);
  }

  fileDownload(fileName:string) {
    return http.get("/file/" + fileName, { responseType: 'blob' });
  }
}

export default new TestDataService();