import { ChangeEvent, Dispatch, SetStateAction } from "react";
import GlassConatainer from "./GlassContainer";

interface FormInputFieldProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export default function FormInputField({
  inputValue,
  setInputValue,
}: FormInputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <GlassConatainer>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="!outline-none w-128"
        placeholder="Here's the word I think best describes you"
      />
    </GlassConatainer>
  );
}

// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         formgray: {
//           100: "#858585",
//           200: "#939597",
//         },
//       },
//     },
//   },
//   plugins: [],
// };
