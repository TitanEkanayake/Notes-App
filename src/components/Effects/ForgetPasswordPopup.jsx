// ForgetPasswordPopup.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, resetPassword } from "../../redux/actions/UserActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPasswordPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const { loading, error } = useSelector((state) => state.user);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({ email })).then((res) => {
      if (res && res.status == "200") {
        toast.success(" A Token has sent to your main Please check !");
        setTimeout(() => setStep(2), 1000);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleResetPassword = () => {
    dispatch(resetPassword({ email, token, newPassword })).then((res) => {
      if (res && res.status == "200") {
        toast.success("Password has been reset successfully");
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <button
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded "
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <ToastContainer />
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg py-2 px-3 mb-4"
            />
            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter reset token"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border rounded-lg py-2 px-3 mb-4"
            />
            <input
              type="password"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg py-2 px-3 mb-4"
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPopup;
