import BirthdayWishForm from "./components/BirthdayWishForm/BirthdayWishForm";

export default function Home() {
  return (
    <div
      className="flex min-h-screen w-screen justify-center p-10"
      style={{ backgroundColor: "#2A235D" }}
    >
      <BirthdayWishForm />
    </div>
  );
}
