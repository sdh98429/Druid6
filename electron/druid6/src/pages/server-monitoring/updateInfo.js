import { updateServerInfo } from "../../redux/actions";
import store from "../../redux/store";

export function updateReduxInfo(info) {
  store.dispatch(updateServerInfo( 
    info
  ))
}
