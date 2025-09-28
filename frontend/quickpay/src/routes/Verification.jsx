import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const reference = queryParams.get("reference");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.data.status === "success") {
          toast.success("Payment verified successfully!", { duration: 4000 });
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.error("Payment verification failed. Please try again.", {
            duration: 4000,
          });
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (error) {
        toast.error("Error verifying payment. Please try again.", {
          duration: 4000,
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
        console.error("Error verifying payment:", error);
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100 px-2">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { background: "black", color: "white" } }}
      />
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center w-[400px] max-w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-70 mb-6"></div>

        <h1 className="text-2xl font-bold text-gray-900">
          Verifying Payment...
        </h1>
        <p className="mt-2 text-gray-600 text-center">
          <i>You will be redirected shortly</i>
        </p>
      </div>
    </div>
  );
};

export default Verification;
