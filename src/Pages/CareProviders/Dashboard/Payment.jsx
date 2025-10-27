import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import CurrencyNaira from "../../../../public/NiCurrency.svg";
function Payment() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-white font-sfpro">
      <Sidebar active="Setting" />
      <div className="flex-1 font-sfpro px-4 md:px-8 py-8 md:ml-64">
        <div className="mb-8 flex items-center">
          <button
            className="mr-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">Payment</h2>
        </div>
        <div className="max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Payment Card */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="bg-[#40a4c5] text-white p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="text-lg font-semibold">Full Payment</div>
                  <div className="text-sm text-white/90 mt-2">
                    one-time charge payment gateway channel
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-3xl font-bold flex items-center">
                    <img
                      src={CurrencyNaira}
                      alt="Naira"
                      className="w-5 h-5 inline-block mr-2"
                    />
                    <span>1,500.00</span>
                  </div>
                  <div className="text-sm text-white/80 flex items-center">
                    <img
                      src={CurrencyNaira}
                      alt="Naira"
                      className="w-4 h-4 inline-block mr-2"
                    />
                    <span>12/mo</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#daecf7] text-[#73b7df] py-3 rounded-md font-semibold opacity-90">
                    Make Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Installment Deduction Card */}
            <div className="rounded-lg overflow-hidden shadow-sm border border-[#73b7df]">
              <div className="bg-white p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Installment Deduction
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Deducted from two (2) care service payout
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-3xl font-bold text-gray-800 flex items-center">
                    <img
                      src={CurrencyNaira}
                      alt="Naira"
                      className="w-5 h-5 inline-block mr-2"
                    />
                    <span>1,500.00</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <img
                      src={CurrencyNaira}
                      alt="Naira"
                      className="w-4 h-4 inline-block mr-2"
                    />
                    <span>12/mo</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#daecf7] text-[#6cb3dd] py-3 rounded-md font-semibold border border-[#e6f4fb]">
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
