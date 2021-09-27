import http, {formData} from "./http-common";

class TestDataService {
  getAll() {
    return http.get("/home");
  }

  postFile(file:any) {
    return http.post("/home", file);
  }
}

export default new TestDataService();