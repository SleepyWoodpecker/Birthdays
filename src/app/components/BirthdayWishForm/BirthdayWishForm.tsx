"use client";

import { useState } from "react";
import FormInputField from "./InputField";

export default function BirthdayWishForm() {
  const [oneWordDescription, setOneWordDescription] = useState("");

  // flow of form:
  // Dear XYZ (should be a title field that can be changed if you have a nickname for them)
  // Here's one word I think best describes you:
  //

  return (
    <div>
      <form>
        <FormInputField
          inputValue={oneWordDescription}
          setInputValue={setOneWordDescription}
        ></FormInputField>
      </form>
    </div>
  );
}
