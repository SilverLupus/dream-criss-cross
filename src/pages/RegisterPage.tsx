import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { registerApi } from "../services/api/auth";
import ErrorComponent from "../components/ErrorComponent";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const emptyClientError = { password: "", confirmPassword: "" };

const RegisterPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [clientError, setClientError] = useState(emptyClientError);

  const navigate = useNavigate();

  const { mutate: registerUser } = useMutation<AxiosResponse, AxiosError, void>({
    mutationFn: () => registerApi(userName, password),
    onSuccess: () => navigate("../login"),
    onError: (error) => setServerError((error.response as AxiosResponse).data?.errors[0]?.message),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      setClientError((prevState) => ({
        ...prevState,
        password: "Password has to be at least 8 characters",
      }));
    }
    if (password !== confirmPassword) {
      setClientError((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords does not match",
      }));
    }

    if (password.length < 8 || password !== confirmPassword) return;

    registerUser();
  };

  useEffect(() => {
    setTimeout(() => {
      setClientError(emptyClientError);
    }, 5000);
  }, [clientError]);

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName" className="block font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  id="userName"
                  name="userName"
                  type="userName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              {serverError && <ErrorComponent error={serverError} />}
            </div>

            <div>
              <label htmlFor="password" className="block font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              {clientError.password && <ErrorComponent error={clientError.password} />}
            </div>

            <div>
              <label htmlFor="password" className="block font-medium leading-6 text-gray-900">
                Repeat password
              </label>
              <div className="mt-2">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="repeat-password"
                  name="repeat-password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
              {clientError.confirmPassword && <ErrorComponent error={clientError.confirmPassword} />}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
