import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveLoginDetails } from "../../redux/adminslice";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Dispatch to Redux
        dispatch(saveLoginDetails({ admin: data.user }));

        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-svh grid place-items-center bg-[#050b18] p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <h1 className="text-white text-2xl font-semibold tracking-tight">
          Sign in
        </h1>
        <p className="text-white/55 mt-1">Welcome back to WWBN admin panel.</p>

        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <Field
            label="Email"
            type="email"
            placeholder="admin@whatwebuildnext.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Field
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] z-50 cursor-pointer text-grey-500 hover:text-gray-300 transition-colors p-1"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full h-11 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white font-semibold shadow-[0_10px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_15px_30px_rgba(99,102,241,0.3)] transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* <div className="mt-4 text-sm text-white/60 text-center">
          Back to{" "}
          <Link to="/" className="text-indigo-300 hover:text-indigo-200">
            Dashboard
          </Link>
        </div> */}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <div className="text-sm text-white/70">{label}</div>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-indigo-500/50 transition-colors"
      />
    </label>
  );
}
