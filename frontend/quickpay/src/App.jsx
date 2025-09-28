import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100 px-2">
      <div className="flex flex-col gap-4 w-[500px] max-w-full items-center p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900">QuickPay</h1>
        <p className="text-center text-gray-600">
          <i>
            Your Number One <span className="font-semibold">Quick Payment</span>{" "}
            App
          </i>
        </p>

        <button
          className="bg-black text-white px-6 py-2 rounded hover:opacity-80 mt-6"
          type="button"
          onClick={() => {
            navigate("/generate");
          }}
        >
          Create Payment Link
        </button>

        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Simple. Fast. Trusted.</p>
          <p>No stress, just instant payments.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
