import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";

const LinkGeneration = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentLink("");
    setLoading(true);
    console.log(email, amount);
    const url = "https://api.paystack.co/transaction/initialize";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
      },

      body: JSON.stringify({
        email: email,
        amount: amount * 100,
        callback_url: "https://quickpay-alpha.vercel.app/verify",
        channels: ["bank"],
        metadata: {
          custom_filters: {
            recurring: true,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        toast.success("Payment link generated successfully", {
          duration: 4000,
        });
        setPaymentLink(data.data.authorization_url);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error generating payment link", { duration: 4000 });
        console.error("Error:", err);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100 px-2">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { background: "black", color: "white" } }}
      />
      <form
        action="#"
        onSubmit={handleSubmit}
        className="flex gap-6 flex-col w-[400px] p-6 bg-white rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Generate payment Link
        </h2>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter customer email"
            className="w-full p-3 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="amount">
          Enter Amount <i>(min 100 NGN:)</i>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full p-3 border border-gray-300 rounded"
            value={amount}
            min={100}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
          type="submit"
        >
          {loading ? "Processing..." : "Generate Link "}
        </button>
        {paymentLink && (
          <div className="my-5 border p-2 border-dashed border-gray-300 flex flex-row justify-between items-center">
            <p className="text-sm">
              <i>Generated Link: </i>{" "}
              <a
                className="text-black decoration-0"
                href={paymentLink}
                target="blank"
              >
                {paymentLink}
              </a>
            </p>
            <IoCopyOutline
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(paymentLink);
                toast("Link copied to clipboard");
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default LinkGeneration;
