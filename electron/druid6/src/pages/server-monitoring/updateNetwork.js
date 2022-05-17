import { updateNetworkInfo } from "../../redux/actions";
import store from "../../redux/store";

export function updateReduxNetwork(traffic) {
  store.dispatch(updateNetworkInfo( 
    traffic
  ))
}
