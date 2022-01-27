import Api from "./api";
import { map } from "rxjs/operators";

const DataService = {

  fetchList(url) {
    return Api.get(url).pipe(
      map(response => response["data"])
    );
  },

};

export default DataService;
