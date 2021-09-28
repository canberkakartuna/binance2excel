import http from "./http-common";

class TestDataService {
  postFile(file:any) {
    return http.post("/file", file);
  }
}

export default new TestDataService();