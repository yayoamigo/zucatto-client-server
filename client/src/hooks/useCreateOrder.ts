import { useEffect, useRef } from "react";

const useCreateOrder = (callback: () => void, dependencies: any[]) => {
  const hasCreatedOrder = useRef(false);

  useEffect(() => {
    if (!hasCreatedOrder.current) {
      callback();
      hasCreatedOrder.current = true;
    }
  }, dependencies);
};

export default useCreateOrder;
