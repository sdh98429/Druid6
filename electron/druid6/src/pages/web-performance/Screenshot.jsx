export default function Screenshot({ screenshot }) {
  return (
    <img
      src={`${screenshot}`}
      alt=""
      style={{ width: "100%", height: "30vh" }}
    />
  );
}
