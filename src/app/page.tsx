import BirthdayWishForm from "./components/BirthdayWishForm/BirthdayWishForm";

export default function Home() {
  return (
    <div className="p-10 h-screen" style={{ backgroundColor: "#2B2459" }}>
      {/* <h1 className="text-black">Wassup</h1> */}
      <BirthdayWishForm />
    </div>
  );
}
