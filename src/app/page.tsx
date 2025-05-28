import BirthdayWishForm from "./components/BirthdayWishForm/BirthdayWishForm";
import WordCloud from "./components/WordCloud/WordCloud";

export default function Home() {
  return (
    <div
      className="flex min-h-screen w-screen justify-center p-10"
      style={{ backgroundColor: "#2A235D" }}
    >
      {/* <BirthdayWishForm /> */}
      <WordCloud />
    </div>
  );
}
