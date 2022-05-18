import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMenuTitle } from "../../redux/actions";

import WebPerformance from "./WebPerformance";

export default function WebPerformanceContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateMenuTitle("웹 퍼포먼스 테스트"));
  }, []);

  return (
    <div>
      <WebPerformance />
    </div>
  );
}
