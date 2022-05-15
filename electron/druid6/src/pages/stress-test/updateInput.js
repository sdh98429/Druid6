import { updateStressTestInputs } from "../../redux/actions";
import store from "../../redux/store";

export function updateReduxSTInputs(e) {
  store.dispatch(updateStressTestInputs({ 
    key : e.target.name,
    value : e.target.value 
  }))
}
