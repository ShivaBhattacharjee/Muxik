import axios from "axios";
import EndPoints from "./EndPoints";

const SAVAN_BASE_URL = "https://saavn.me";

const api = axios.create({ baseURL: SAVAN_BASE_URL });

class SaavanService {
  static getHomeData() {
    const language = ["hindi", "english", "Bhojpuri"].join(",");
    return api.get(EndPoints.modules, { params: { language } });
  }
}

export default SaavanService;
