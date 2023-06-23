import React, { useState } from "react";
import { MdVisibility } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const icon = visible ? (
    <MdVisibility onClick={() => setVisibility((visible) => !visible)} />
  ) : (
    <AiFillEyeInvisible onClick={() => setVisibility((visible) => !visible)} />
  );

  const inputType = visible ? "text" : "password";

  return [inputType, icon];
};

export default usePasswordToggle;
